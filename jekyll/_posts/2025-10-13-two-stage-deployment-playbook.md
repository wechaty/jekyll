---
title: "Vibe Coding to Production: The Case for a Two-Stage Pipeline"
excerpt: "Purpose: Present PreAngel’s current best-practice two-stage deployment model — powered by GitHub Actions, Cloud Run, Artifact Registry, and Workload Identity Federation (WIF). This version reflects our final, production-proven approach: direct access, fully declarative, and keyless."
categories: guide
author: huan
tags:
  - deployment
  - firebase
  - cloudrun
  - github-actions
  - workload-identity-federation
  - iam
image: /assets/2025/10-two-stage-deployment-playbook/two-stage-deployment-playbook.webp
---

> PreAngel’s philosophy has always been clear: simplicity and truth live in the repo. Every configuration should be declarative, versioned, and automated — never hidden in a console.

Over time, we distilled our deployment pipeline down to its purest form:

Two stages. One repo. Zero secrets.

This is the PreAngel Way — powered by GitHub Actions, Google Cloud Run, Artifact Registry, and Workload Identity Federation (WIF).

---

## 1) The Final Model — Two Stages, One Truth

| Stage       | Description                                                                                                                       | Source        | Target                         |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------|
| Development | Every commit to main builds, pushes an image to Artifact Registry, and deploys to `myapp-dev` with 100% traffic.                  | Push to main  | Cloud Run → `myapp-dev`         |
| Production  | Every Git tag (e.g., `v1.4.2`) reuses the exact same image from Artifact Registry and deploys to `myapp` with `--no-traffic`.     | Push tag `v*` | Cloud Run → `myapp` (no traffic) |

This achieves full CI/CD simplicity:

- Dev = automatic → instant iteration.
- Prod = deliberate → controlled stability.
- Both powered by the same artifact and pipeline logic.

Rule: Build once. Reuse the same image everywhere.

---

## 2) Core Architecture

| Component                 | Role                                                                                                            |
|--------------------------|-----------------------------------------------------------------------------------------------------------------|
| GitHub Actions           | The single CI/CD engine. Two workflows, both fully versioned in the repo.                                       |
| Artifact Registry        | Stores all container images by commit SHA. Example: `us-central1-docker.pkg.dev/preangel/myrepo/myapp:<SHA>`.   |
| Cloud Run (Dev)          | Auto-deploys on each commit; routes 100% traffic to the newest revision.                                        |
| Cloud Run (Prod)         | Receives tagged images with `--no-traffic`, then manually promoted when stable.                                 |
| Workload Identity Federation (WIF) | Connects GitHub OIDC to GCP IAM. No JSON key, no secrets, fully keyless.                                   |

---

## 3) Workload Identity Federation — Keyless, Direct Access

Workload Identity Federation (WIF) lets GitHub authenticate to GCP without using a service account key.

How it works:

1) GitHub Actions requests an OIDC token for each workflow run.
2) Google’s Security Token Service exchanges it for a short-lived access token.
3) GCP IAM grants permissions directly to that OIDC identity.

Why it’s best practice for PreAngel:

- Keyless & secure: Eliminates JSON keys entirely.
- Short-lived: Credentials expire automatically.
- Direct IAM access: Grants roles directly to the identity — fewer layers, faster audits.
- Attribute-based: Scopes can match exact repos, branches, or tags.
- Zero hidden state: All roles and mappings live in declarative scripts.

---

## 4) IAM Setup for Direct Access

Create a Workload Identity Pool and Provider, then grant access directly to your GitHub repository identity:

```bash
PROJECT_ID=preangel
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')
POOL_ID=github-pool
OWNER=PreAngel
REPO=myrepo

# Create WIF pool & provider
gcloud iam workload-identity-pools create $POOL_ID \
  --project=$PROJECT_ID --location=global --display-name="GitHub Pool"

gcloud iam workload-identity-pools providers create-oidc github-provider \
  --project=$PROJECT_ID --location=global --workload-identity-pool=$POOL_ID \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref"

# Bind IAM roles directly to the repo’s OIDC identity
REPO_MEMBER="principalSet://iam.googleapis.com/projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL_ID}/attribute.repository/${OWNER}/${REPO}"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="$REPO_MEMBER" --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="$REPO_MEMBER" --role="roles/artifactregistry.writer"
```

Now this GitHub repository can deploy to Cloud Run and push to Artifact Registry without any service account.

---

## 5) Repository Variables

| Variable  | Example                                                                                                  | Purpose                          |
|-----------|----------------------------------------------------------------------------------------------------------|----------------------------------|
| PROJECT_ID | `preangel`                                                                                               | GCP project ID                   |
| REGION     | `us-central1`                                                                                            | Deployment region                |
| AR_REPO    | `myrepo`                                                                                                 | Artifact Registry repo name      |
| GCP_WIP    | `projects/123456789/locations/global/workloadIdentityPools/github-pool/providers/github-provider`        | WIF Provider resource path       |

These are configured as GitHub Variables — not secrets.

---

## 6) The Two Workflows — Fully Declarative

### ① `.github/workflows/dev.yml`

Builds, pushes, and deploys automatically on every commit to main.

```yaml
name: dev-deploy
on:
  push:
    branches: [ main ]

jobs:
  deploy-dev:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    env:
      REGION: ${{ vars.REGION }}
      PROJECT_ID: ${{ vars.PROJECT_ID }}
      AR_REPO: ${{ vars.AR_REPO }}
      IMAGE: ${{ vars.REGION }}-docker.pkg.dev/${{ vars.PROJECT_ID }}/${{ vars.AR_REPO }}/myapp:${{ github.sha }}

    steps:
      - uses: actions/checkout@v4

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ vars.GCP_WIP }}
          token_format: 'access_token'
          create_credentials_file: true

      - uses: google-github-actions/setup-gcloud@v2

      - name: Build & Push Image
        run: |
          gcloud auth configure-docker $REGION-docker.pkg.dev --quiet
          docker build -t "$IMAGE" .
          docker push "$IMAGE"

      - name: Deploy to Dev
        run: |
          gcloud run deploy myapp-dev \
            --region $REGION \
            --image "$IMAGE" \
            --allow-unauthenticated \
            --revision-suffix=${{ github.sha }} \
            --condition=None
          gcloud run services update-traffic myapp-dev \
            --region $REGION \
            --to-latest \
            --condition=None
```

### ② `.github/workflows/release.yml`

Uses the same image from Artifact Registry to deploy tagged releases to Prod.

```yaml
name: prod-deploy
on:
  push:
    tags: [ 'v*' ]

jobs:
  deploy-prod:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write
    env:
      REGION: ${{ vars.REGION }}
      PROJECT_ID: ${{ vars.PROJECT_ID }}
      AR_REPO: ${{ vars.AR_REPO }}
      IMAGE_TAG: ${{ vars.REGION }}-docker.pkg.dev/${{ vars.PROJECT_ID }}/${{ vars.AR_REPO }}/myapp:${{ github.sha }}

    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }

      - uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ vars.GCP_WIP }}
          token_format: 'access_token'
          create_credentials_file: true

      - uses: google-github-actions/setup-gcloud@v2

      - name: Wait for Image
        run: |
          for i in {1..30}; do
            if gcloud artifacts docker images describe "$IMAGE_TAG" >/dev/null 2>&1; then break; fi
            sleep 10;
          done

      - name: Resolve Digest
        id: digest
        run: |
          DIGEST=$(gcloud artifacts docker images describe "$IMAGE_TAG" --format='value(image_summary.digest)')
          echo "digest=$DIGEST" >> $GITHUB_OUTPUT

      - name: Deploy to Prod (No Traffic)
        run: |
          REF="$REGION-docker.pkg.dev/$PROJECT_ID/$AR_REPO/myapp@${{ steps.digest.outputs.digest }}"
          gcloud run deploy myapp \
            --region $REGION \
            --image "$REF" \
            --no-traffic \
            --revision-suffix=${{ github.ref_name }}-${{ github.sha }} \
            --allow-unauthenticated \
            --condition=None
```

Manual rollout when verified:

```bash
gcloud run services update-traffic myapp --region us-central1 --to-latest --condition=None
```

---

## 7) Why This Is the Best Practice for Us

| Principle               | Reason                                                                                 |
|-------------------------|----------------------------------------------------------------------------------------|
| Single Source of Truth  | All workflows, configs, and permissions live in Git — never in the UI.                |
| Direct Access via WIF   | No service account, no keys — just short-lived credentials tied to our repo identity. |
| Artifact Reuse          | The same image tested in Dev is promoted to Prod. Guaranteed consistency.             |
| Two Stages Only         | Fewer moving parts → faster deploys → fewer errors.                                   |
| Manual Traffic Promotion| Adds human verification at the most critical moment: production.                      |
| Declarative Everything  | Each workflow file fully describes how and why it runs.                                |

✅ The result: secure, minimal, transparent, and automation-ready — the best practice for PreAngel’s AI-native product stack.

---

## 8) Conclusion — The PreAngel Way

PreAngel’s two-stage pipeline represents the ideal harmony between automation and human judgment:

- Dev runs continuously and fearlessly.
- Prod deploys intentionally and safely.
- IAM is keyless and direct.
- Every configuration is visible, versioned, and reproducible.

Build once. Test once. Deploy deliberately.

---

## Appendix A — Background and Rationale (from earlier write-up, updated to Dev/Prod)

We started like most teams — with five or six deployment environments: `dev`, `qa`, `preview`, `staging`, `preprod`, `prod`. Each served a purpose, but over time they became confusing, inconsistent, and expensive:

- Code drifted between stages.
- Builds weren’t reproducible.
- Deployments slowed down because approvals piled up.

We asked a radical question: What’s the minimum number of stages that guarantees speed and safety?

### A1. Why We Simplified — From Many Stages to Two

After analyzing dozens of pipelines (Firebase, Vercel, AWS, GitHub Actions, Google Cloud Deploy), we found that two stages — Development and Production — are enough when you use Cloud Run’s built‑in rollout and rollback capabilities.

This led to the new model (now finalized in v4):

- `main` → auto‑deploys to Dev (continuous integration & validation).
- A Git tag → promotes to Prod (controlled rollout with manual traffic).

### A2. The Questions We Asked Ourselves

| Question                                 | Our Finding                                                                                                  |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Why not more stages?                     | Each extra environment creates cost, delay, and drift. Two are enough when rollout control is strong.        |
| Why not merge dev + prod?                | Dev must remain a fast, iterative environment; Prod remains stable and audited.                              |
| Why use Git tags for promotion?          | Tags are immutable, human‑auditable, and integrate naturally with GitHub releases.                           |
| Why not just copy dev to production?     | Cloud Run doesn’t clone environments; it shifts traffic between revisions — a safer, more elegant model.     |
| How does rollback work?                  | Cloud Run reroutes traffic to the previous revision instantly. No redeploys, no downtime.                    |
| Can we preview before rollout?           | Yes. Deploy a revision with 0% traffic and access via its direct URL.                                        |
| What about frontend & backend sync?      | If the frontend is on Firebase App Hosting, coordinate via tags; otherwise keep APIs backward‑compatible.    |
| Do we lose flexibility with two stages?  | No — Cloud Run traffic splitting brings flexibility back.                                                    |

### A3. The Insight — Cloud Run Changed the Rules

In traditional CI/CD systems:

- Promotion = copy lower env → Prod.
- Rollback = redeploy old build.

In Cloud Run:

- Each deploy creates an immutable revision.
- Promotion = traffic migration.
- Rollback = re‑routing.

| Legacy Thinking      | Cloud Run Reality                     |
| -------------------- | ------------------------------------- |
| Copy lower env to Prod | Shift traffic to new Prod revision    |
| Rollback = Re‑deploy | Rollback = Redirect traffic instantly |
| Multi‑env drift      | Revisions are immutable snapshots     |

### A4. The Model — Two‑Stage, Google‑Native Deployment

- Stage 1 (Dev): `main` deploys automatically via GitHub Actions → Artifact Registry → Cloud Run (Dev).
- Stage 2 (Prod): Reuse the same container image digest; deploy a new Prod revision with 0% traffic, then promote.

### A5. The Reasoning — Analytics That Justify the Choice

| Challenge         | Our Approach                                       | Benefit                       |
| ----------------- | -------------------------------------------------- | ----------------------------- |
| Build drift       | Build once in Dev, reuse same artifact in Prod     | Consistency & reproducibility |
| Downtime risk     | Gradual rollout + instant rollback                 | Continuous availability       |
| Complex pipeline  | 2 clear stages + tag promotion                     | Simplicity + speed            |
| Low observability | Cloud Run Revisions + Cloud Monitoring             | Transparent release history   |
| Approval fatigue  | Git tag = single promotion signal                  | Clarity + accountability      |

### A6. Best Practices — Cloud Run (+ optional Firebase App Hosting)

#### Cloud Run

- Every deploy = immutable revision.
- Supports traffic splitting for canary or gradual rollout.
- Rollback = redirect traffic to any previous revision.
- Supports tagging of revisions for `candidate`, `active`, `stable`.
- Auto‑scales per request; great for cost efficiency.

#### Optional: Firebase App Hosting

- If your frontend is on Firebase App Hosting, use it for build history and UI‑level rollouts.
- Coordinate frontend and backend via Git tags; keep APIs backward‑compatible during rollout windows.

#### Together

- GitHub Actions manages builds for backends; Firebase can manage frontend builds.
- Cloud Run handles backend revisions, rollouts, and scaling.
- Shared observability via Cloud Monitoring.

### A7. The New Mental Model — Traffic, Not Copies

```text
main branch → GitHub Actions → Artifact Registry → Cloud Run (Dev)
     │                               │
     │                               └─ validated image digest
     │
   Git tag (v1.4.2) ───────────────→ Cloud Run (Prod)
                                      │
                               New revision @ 0% traffic
                                      │
                              5% → 25% → 100% rollout
                                      │
                              rollback ← metrics breach
```

- Promotion = Traffic Migration
- Rollback = Traffic Redirect
- Artifact = Immutable Revision

### A8. Policies to Enforce

| Policy                | Description                                    |
| --------------------- | ---------------------------------------------- |
| Branch rule           | `main` auto‑deploys to Dev.                    |
| Promotion rule        | Only signed Git tags can trigger Prod rollout. |
| Artifact immutability | Same container digest in Dev & Prod.           |
| Default rollout       | Start ≤ 5%, expand if SLOs green.              |
| Rollback rule         | Auto‑rollback if error rate > threshold.       |
| Audit trail           | GitHub + Cloud Run track all releases.         |

### A9. Why It’s Easy to Operate

Even engineers new to DevOps can reason about this:

1. Code on `main` → auto in Dev.
2. Validate.
3. Tag when ready.
4. Cloud Run migrates traffic → monitors → finalizes.
5. Rollback instantly if needed.

### A10. Quick Recap — Build Once, Promote by Traffic

This 2‑Stage model achieves the trifecta:

- Speed: Continuous deployment to Dev keeps momentum high.
- Safety: Gradual rollout + instant rollback prevent outages.
- Simplicity: Two stages, one promotion signal.

✅ Build once. Test once. Promote by shifting traffic — not by redeploying.
