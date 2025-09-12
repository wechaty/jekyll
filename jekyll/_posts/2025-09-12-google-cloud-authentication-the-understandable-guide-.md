---
title: "Google Cloud Authentication — The Divio-Style Field Guide for Senior Full‑Stack Devs"
author: huan
categories: docs
meta: "A single-page, Divio-structured, developer-first explanation of Google Cloud authentication: identities, credentials vs tokens, ADC, OAuth 2.0, API keys, service account keys, impersonation, Workload Identity Federation, and concrete recipes for local + prod."
tags:
  - google-cloud
  - documentation
  - tutorial
  - authentication
image: /assets/2025/09-google-cloud-authentication-the-understandable-guide/adc-auth.webp
---

<!-- markdownlint-disable -->

  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    /* Body defaults mirroring Tailwind classes on <body> */
    body{background-color:rgb(248 250 252);color:rgb(15 23 42);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    html{scroll-behavior:smooth}
    .prose h2,.prose h3{scroll-margin-top:6rem}
    .kbd{border:1px solid rgb(229 231 235);border-bottom-width:2px;border-radius:.375rem;padding:.125rem .375rem;font-size:.875rem;background:linear-gradient(180deg,white,rgba(243,244,246,.8))}
    .card{border:1px solid rgb(229 231 235);border-radius:1rem;background:white;box-shadow:0 10px 20px rgba(2,6,23,.06)}
    .tag{display:inline-flex;align-items:center;gap:.375rem;padding:.25rem .5rem;border-radius:9999px;font-size:.75rem;background:rgb(243 244 246)}
    .grid-auto{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
    .callout{background:linear-gradient(180deg,rgba(219,234,254,.5),rgba(219,234,254,.15));border:1px solid rgb(191 219 254)}
    .muted{color:rgb(100 116 139)}
    .code{font-feature-settings:"calt" 0,"liga" 0}
  </style>
  <!-- Header / Nav -->
  <header class="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white font-semibold">GC</span>
        <div>
          <div class="font-semibold">Google Cloud Authentication</div>
          <div class="text-sm text-slate-500">Divio‑style field guide</div>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-5 text-sm">
        <a href="#map" class="hover:text-slate-700">Map</a>
        <a href="#tutorials" class="hover:text-slate-700">Tutorials</a>
        <a href="#how-to" class="hover:text-slate-700">How‑to Guides</a>
        <a href="#explanation" class="hover:text-slate-700">Explanation</a>
        <a href="#reference" class="hover:text-slate-700">Reference</a>
        <a href="#confusions" class="hover:text-slate-700">Common Confusions</a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="bg-gradient-to-b from-white to-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      <div class="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-3xl md:text-4xl font-extrabold leading-tight">Google Cloud Authentication — the <span class="text-slate-600">understandable</span> guide</h1>
          <p class="mt-4 text-lg text-slate-600">A single page that untangles identities, credentials, tokens, ADC, OAuth 2.0, API keys, service accounts, impersonation, and Workload Identity Federation — organised with the <span class="font-semibold">Divio documentation system</span>: Tutorials, How‑to, Explanation, and Reference.</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span class="tag">Audience: Senior full‑stack dev</span>
            <span class="tag">Goal: clarity & correct defaults</span>
            <span class="tag">Scope: Google Cloud + Google APIs</span>
          </div>
        </div>
        <div class="card p-6">
          <h2 class="font-semibold">Core mental model</h2>
          <ol class="mt-3 space-y-2 text-slate-700 text-sm">
            <li><span class="font-semibold">Identity</span> ⇒ <span class="text-slate-600">who you are</span> (user or service account).</li>
            <li><span class="font-semibold">Credential</span> ⇒ <span class="text-slate-600">how you prove identity</span> (key file, device login, metadata server, federation).</li>
            <li><span class="font-semibold">Token</span> ⇒ <span class="text-slate-600">short‑lived proof</span> minted from credentials (access token, ID token, etc.).</li>
            <li><span class="font-semibold">Authorization</span> ⇒ <span class="text-slate-600">what you can do</span> (IAM roles & policies).</li>
            <li><span class="font-semibold">ADC</span> ⇒ <span class="text-slate-600">automatic way libraries find credentials</span> across dev & prod.</li>
          </ol>
          <p class="mt-4 text-sm muted">If you remember only one thing: <span class="font-semibold">don’t ship key files</span>; prefer attached identities (metadata server), <span class="font-semibold">impersonation</span> and <span class="font-semibold">Workload Identity Federation</span> for anything outside Google Cloud.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Map -->
  <section id="map" class="py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">🗺️ The Landscape at a Glance</h2>
      <p class="mt-2 text-slate-600">Use this map to navigate to the right quadrant quickly.</p>
      <div class="mt-6 grid gap-4 grid-auto">
        <div class="card p-5">
          <h3 class="font-semibold">Identities</h3>
          <p class="text-sm text-slate-600 mt-2">Human <span class="kbd">user@</span> vs <span class="kbd">service‑account@</span>. Services run as service accounts.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">Credentials → Tokens</h3>
          <p class="text-sm text-slate-600 mt-2">Credentials generate short‑lived tokens (access/ID). Tokens expire; rotate automatically in client libs.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">ADC (Default)</h3>
          <p class="text-sm text-slate-600 mt-2">Libraries auto‑discover credentials for you locally & in prod. Prefer this unless you have a reason not to.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">Production on Google Cloud</h3>
          <p class="text-sm text-slate-600 mt-2">Attach a service account to Cloud Run/GKE/GCE → metadata server → tokens. No key files.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">Outside Google Cloud</h3>
          <p class="text-sm text-slate-600 mt-2">Use <span class="font-semibold">Workload Identity Federation</span> (AWS/Azure/on‑prem OIDC/SAML) → short‑lived tokens. Avoid long‑lived JSON keys.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">End‑user sign‑in</h3>
          <p class="text-sm text-slate-600 mt-2">Use OAuth 2.0 / OpenID Connect to sign in users. Your backend still needs its own service identity.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">API keys</h3>
          <p class="text-sm text-slate-600 mt-2">Only identify the calling project; for select public APIs. Not an authorization mechanism for Google Cloud resources.</p>
        </div>
        <div class="card p-5">
          <h3 class="font-semibold">Impersonation</h3>
          <p class="text-sm text-slate-600 mt-2">Act as a target service account without distributing its key. Great for least‑privilege, auditable hops.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Tutorials -->
  <section id="tutorials" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">📚 Tutorials (learning‑oriented)</h2>
      <p class="mt-2 text-slate-600">Follow these end‑to‑end lessons to get hands‑on quickly. Repeatable, minimal, correct.</p>

      <!-- Tutorial 1 -->
      <article class="card p-6 mt-6">
        <h3 class="text-xl font-semibold">T1. Local dev with Application Default Credentials (no key files)</h3>
        <p class="mt-2 text-slate-600">Goal: call a Google Cloud API from your laptop using your user sign‑in and let libraries fetch/refresh tokens automatically.</p>
        <ol class="list-decimal ml-5 mt-4 space-y-3 text-slate-800">
          <li>Install the Google Cloud CLI (<span class="kbd">gcloud</span>).</li>
          <li>Run <code class="code bg-slate-100 px-2 py-1 rounded">gcloud auth application-default login</code> and complete the browser flow. This seeds local <em>Application Default Credentials</em> for client libraries.</li>
          <li>Write code using a Cloud Client Library (e.g., Storage). Don’t pass tokens; the library uses ADC automatically.</li>
          <li>(Optional) Inspect a token: <code class="code bg-slate-100 px-2 py-1 rounded">gcloud auth application-default print-access-token</code>. Tokens are short‑lived.</li>
        </ol>
        <pre class="mt-4 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm code"><code>// Node.js example
import {Storage} from '@google-cloud/storage';
const storage = new Storage(); // uses ADC
const [buckets] = await storage.getBuckets();
console.log(buckets.map(b=>b.name));</code></pre>
        <p class="mt-3 text-sm muted">Works for most Google APIs; when you deploy, keep the same code — prod credentials are discovered automatically.</p>
      </article>

      <!-- Tutorial 2 -->
      <article class="card p-6 mt-6">
        <h3 class="text-xl font-semibold">T2. Production on Cloud Run with an attached service account (no keys)</h3>
        <p class="mt-2 text-slate-600">Goal: deploy to Cloud Run so the runtime’s <em>metadata server</em> issues tokens for your service account; libraries still use ADC.</p>
        <ol class="list-decimal ml-5 mt-4 space-y-3 text-slate-800">
          <li>Create a least‑privilege service account (e.g., <span class="kbd">svc-myapp@</span>) and grant only required IAM roles.</li>
          <li>Deploy and set <span class="kbd">Service account</span> for the service. Cloud Run attaches that identity to your container.</li>
          <li>Your code remains unchanged (uses ADC). At runtime, the library calls the metadata server to mint/refresh tokens.</li>
          <li>For cross‑service calls, prefer <strong>service account impersonation</strong> rather than distributing keys.</li>
        </ol>
        <pre class="mt-4 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm code"><code># Example deploy
 gcloud run deploy myapi \
   --image=gcr.io/PROJECT/myapi:latest \
   --service-account=svc-myapp@PROJECT.iam.gserviceaccount.com \
   --region=us-central1
</code></pre>
        <p class="mt-3 text-sm muted">Same pattern on GKE and GCE: attach a service account → metadata server → short‑lived tokens. No JSON key files.</p>
      </article>

      <!-- Tutorial 3 -->
      <article class="card p-6 mt-6">
        <h3 class="text-xl font-semibold">T3. Access Google Cloud from AWS without key files (Workload Identity Federation)</h3>
        <p class="mt-2 text-slate-600">Goal: let an AWS workload obtain short‑lived Google tokens using its AWS identity — no Google key distribution.</p>
        <ol class="list-decimal ml-5 mt-4 space-y-3 text-slate-800">
          <li>Configure a Google <em>Workload Identity Pool</em> & provider (trust AWS IAM). Map AWS claims (like account/role) to Google attributes.</li>
          <li>Create a Google service account and grant it roles. Permit your pool to <em>impersonate</em> that service account.</li>
          <li>In the AWS workload, use Google’s external credentials JSON (or the auth library’s WIF support) to exchange AWS STS creds → Google tokens.</li>
          <li>Use client libraries with ADC — they read the external credentials file and handle token exchange automatically.</li>
        </ol>
        <p class="mt-3 text-sm muted">Result: least‑privilege, short‑lived tokens; no long‑lived JSON keys to leak or rotate.</p>
      </article>

      <!-- Tutorial 4 -->
      <article class="card p-6 mt-6">
        <h3 class="text-xl font-semibold">T4. Calling a private Cloud Run service from a browser app</h3>
        <p class="mt-2 text-slate-600">Goal: authenticate end‑users in the frontend, then send a request with an <em>ID token</em> that your Cloud Run service verifies.</p>
        <ol class="list-decimal ml-5 mt-4 space-y-3 text-slate-800">
          <li>Use an identity provider (e.g., Google, Identity Platform, or another OpenID Connect IdP) to sign in the user.</li>
          <li>Obtain an <span class="font-semibold">ID token</span> with the correct <span class="kbd">audience</span> (the Cloud Run URL or a custom audience).</li>
          <li>Send it as <span class="kbd">Authorization: Bearer &lt;id_token&gt;</span>. Your service middleware verifies signature, issuer, audience, and expiry.</li>
          <li>For backend→backend calls, continue to use <em>access tokens</em> from your service account identity.</li>
        </ol>
      </article>
    </div>
  </section>

  <!-- How-to Guides -->
  <section id="how-to" class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">🛠️ How‑to Guides (goal‑oriented recipes)</h2>

      <div class="grid gap-6 md:grid-cols-2 mt-6">
        <!-- Decision helper -->
        <article class="card p-6">
          <h3 class="font-semibold">H1. Choose the right method (decision helper)</h3>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>• <strong>Running on Google Cloud?</strong> Attach a service account → use ADC (metadata server). <em>Best default.</em></li>
            <li>• <strong>Running outside Google Cloud?</strong> Prefer <em>Workload Identity Federation</em>. Avoid JSON key files.</li>
            <li>• <strong>CLI / local dev?</strong> <span class="kbd">gcloud auth application-default login</span>.</li>
            <li>• <strong>End‑user sign‑in?</strong> OAuth 2.0 / OIDC flows to obtain user tokens (plus a backend service identity for Google APIs).</li>
            <li>• <strong>Public/untrusted clients needing simple access?</strong> Only if the API supports it, use <em>API keys</em> with tight restrictions.</li>
          </ul>
        </article>

        <!-- ID token -->
        <article class="card p-6">
          <h3 class="font-semibold">H2. Get an ID token for Cloud Run/Functions</h3>
          <ol class="mt-3 space-y-2 text-slate-700 list-decimal ml-5">
            <li>From metadata server (in Cloud Run/GCE/GKE): request an ID token for the target audience.</li>
            <li>From your dev machine: <code class="code bg-slate-100 px-2 py-1 rounded">gcloud auth print-identity-token --audiences=YOUR_AUDIENCE</code></li>
            <li>Via impersonation: use Service Account Credentials API to mint an ID token for the target SA.</li>
          </ol>
        </article>

        <!-- Impersonation -->
        <article class="card p-6">
          <h3 class="font-semibold">H3. Impersonate a service account (no keys)</h3>
          <p class="text-slate-700 mt-2">Let users or services act <em>as</em> a target service account with auditability.</p>
          <pre class="mt-3 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm code"><code># CLI example
 gcloud auth print-access-token \
   --impersonate-service-account=svc-target@PROJECT.iam.gserviceaccount.com

# ADC for local code (Node.js)
process.env.GOOGLE_IMPERSONATE_SERVICE_ACCOUNT = 'svc-target@PROJECT.iam.gserviceaccount.com';
// Libraries now mint short‑lived tokens by impersonating the target SA
</code></pre>
          <p class="mt-3 text-sm muted">Grant the caller <span class="kbd">roles/iam.serviceAccountTokenCreator</span> on the target service account; then apply least‑privilege roles to the target SA.</p>
        </article>

        <!-- API keys safely -->
        <article class="card p-6">
          <h3 class="font-semibold">H4. Use API keys safely (only where supported)</h3>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>• Restrict by API, HTTP referrer, IP, and (if supported) Android/iOS app signature.</li>
            <li>• Rotate keys and monitor usage; treat keys as secrets even though they don’t grant IAM permissions.</li>
            <li>• Prefer OAuth 2.0 or service identities for Google Cloud resources that require IAM authorization.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Explanation -->
  <section id="explanation" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">🧠 Explanation (understanding‑oriented)</h2>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E1. Identities, credentials, and tokens</h3>
        <p class="mt-2 text-slate-700">An <strong>identity</strong> is a principal: a human user or a service account. A <strong>credential</strong> is any mechanism that can obtain tokens for that identity: a user login session cached by <span class="kbd">gcloud</span>, a service account key file, a metadata server on a Google runtime, or a federated identity from AWS/Azure/Okta. A <strong>token</strong> is a short‑lived artifact minted <em>from</em> those credentials: usually an OAuth 2.0 <em>access token</em> for Google APIs, or an OpenID Connect <em>ID token</em> for audience‑checked calls (e.g., Cloud Run).</p>
        <div class="callout rounded-xl p-4 mt-4">
          <div class="font-semibold">⚑ Clarification: “Tokens are not credentials.”</div>
          <p class="text-slate-700 mt-2">Credentials prove identity to Google and let you <em>obtain</em> tokens. Tokens are the minted proofs you actually send with API calls and they expire quickly. You usually shouldn’t mint or refresh them by hand — let client libraries do it.</p>
        </div>
      </article>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E2. Application Default Credentials (ADC)</h3>
        <p class="mt-2 text-slate-700">ADC is a discovery strategy built into Google auth libraries. In dev, it checks your local environment (env vars, well‑known files created by <span class="kbd">gcloud auth application-default login</span>). In prod on Google Cloud, it consults the metadata server for the attached service account. ADC can also read <em>external credentials</em> files used for federation. This is why your code doesn’t change between laptop and production.</p>
      </article>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E3. OAuth 2.0 vs API keys vs service accounts</h3>
        <ul class="mt-2 space-y-2 text-slate-700">
          <li><strong>OAuth 2.0 / OpenID Connect</strong>: for end‑user sign‑in and delegated access. Your app requests tokens with explicit scopes and (optionally) refreshes them. Use this for user data and sign‑in flows.</li>
          <li><strong>Service accounts</strong>: non‑human identities for workloads. On Google Cloud, attach them to runtimes and let the metadata server mint tokens. Outside Google Cloud, use <em>Workload Identity Federation</em> or, if you must, a key file (not recommended).</li>
          <li><strong>API keys</strong>: identify the calling project for certain public APIs. They do <em>not</em> convey IAM permissions and are not a general auth method for Google Cloud resources.</li>
        </ul>
      </article>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E4. Workload Identity Federation (WIF)</h3>
        <p class="mt-2 text-slate-700">WIF lets external workloads (AWS/Azure/on‑prem) exchange their native identity for short‑lived Google tokens, mapped to a Google service account that holds IAM roles. This removes long‑lived Google key files from your supply chain and centralises trust in your provider or IdP.</p>
      </article>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E5. Service account impersonation</h3>
        <p class="mt-2 text-slate-700">Impersonation lets a caller mint short‑lived tokens to act as a target service account (with audit trails). It’s ideal for CI/CD and for letting a narrow identity temporarily gain the target’s permissions without sharing keys.</p>
      </article>

      <article class="mt-6 card p-6">
        <h3 class="text-xl font-semibold">E6. Access tokens vs ID tokens</h3>
        <ul class="mt-2 space-y-2 text-slate-700">
          <li><strong>Access token</strong>: bearer token for Google APIs (authorised by scopes + IAM).</li>
          <li><strong>ID token</strong>: proves the <em>caller’s identity to a specific audience</em> (e.g., your Cloud Run URL). Your service verifies its audience/issuer/expiry before trusting it.</li>
          <li><strong>Rule of thumb</strong>: backend→Google API ⇒ access token; browser→your backend ⇒ ID token.</li>
        </ul>
      </article>
    </div>
  </section>

  <!-- Reference -->
  <section id="reference" class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">📖 Reference (information‑oriented)</h2>

      <div class="grid gap-6 md:grid-cols-2 mt-6">
        <article class="card p-6">
          <h3 class="font-semibold">R1. ADC lookup (high level)</h3>
          <ol class="mt-3 space-y-2 text-slate-700 list-decimal ml-5">
            <li><strong>Env var</strong>: <span class="kbd">GOOGLE_APPLICATION_CREDENTIALS</span> pointing to a credential file.</li>
            <li><strong>Well‑known user location</strong>: credentials seeded by <span class="kbd">gcloud auth application-default login</span>.</li>
            <li><strong>Metadata server</strong>: when running on Cloud Run/GKE/GCE with an attached service account.</li>
            <li><strong>External credentials</strong>: federation config files for WIF.</li>
          </ol>
        </article>

        <article class="card p-6">
          <h3 class="font-semibold">R2. Token types (selected)</h3>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li><span class="kbd">Access token</span> — OAuth 2.0 token to call Google APIs.</li>
            <li><span class="kbd">ID token</span> — OpenID Connect JWT for audience‑checked requests (e.g., Cloud Run).</li>
            <li><span class="kbd">Self‑signed JWT</span> — service account assertion used by libraries to obtain access tokens (or in some cases to call endpoints directly).</li>
          </ul>
        </article>

        <article class="card p-6">
          <h3 class="font-semibold">R3. Handy CLI</h3>
          <pre class="mt-3 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm code"><code># User ADC login (local dev)
 gcloud auth application-default login

# Print short‑lived access token for current ADC
 gcloud auth application-default print-access-token

# ID token for a specific audience (Cloud Run URL or custom)
 gcloud auth print-identity-token --audiences=https://&lt;service-url&gt;

# Use impersonation in CLI
 gcloud auth print-access-token \
   --impersonate-service-account=svc@PROJECT.iam.gserviceaccount.com
</code></pre>
        </article>

        <article class="card p-6">
          <h3 class="font-semibold">R4. Security recommendations</h3>
          <ul class="mt-3 space-y-2 text-slate-700">
            <li>Prefer attached identities (metadata server) on Google Cloud; avoid distributing JSON key files.</li>
            <li>Use Workload Identity Federation for external workloads.</li>
            <li>Use impersonation for CI/CD and human break‑glass flows; audit who minted tokens.</li>
            <li>Give the <em>target</em> service account least‑privilege roles; grant callers only <span class="kbd">TokenCreator</span> for impersonation.</li>
            <li>If you must use API keys, restrict them aggressively and monitor usage.</li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <!-- Common confusions -->
  <section id="confusions" class="py-12 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-bold">🧩 Common confusions & straight answers</h2>
      <div class="mt-6 grid gap-6 md:grid-cols-2">
        <article class="card p-6">
          <h3 class="font-semibold">“Tokens are not credentials.” Huh?</h3>
          <p class="mt-2 text-slate-700">Credentials are how you authenticate (user login, key, metadata server, federation). Tokens are what you <em>use</em> after you authenticate. Tokens expire; credentials persist (or are renewable) and can mint new tokens.</p>
        </article>
        <article class="card p-6">
          <h3 class="font-semibold">ADC vs <span class="kbd">gcloud auth login</span> vs <span class="kbd">gcloud auth application-default login</span></h3>
          <p class="mt-2 text-slate-700"><span class="kbd">gcloud auth login</span> authenticates the CLI itself. <span class="kbd">gcloud auth application-default login</span> seeds <em>ADC</em> for your <em>code</em> and client libraries. In production, you won’t run either — runtimes use the metadata server via ADC.</p>
        </article>
        <article class="card p-6">
          <h3 class="font-semibold">API keys vs OAuth 2.0 / service accounts</h3>
          <p class="mt-2 text-slate-700">API keys identify the calling <em>project</em> for certain public APIs; they don’t carry IAM permissions. For Google Cloud resources that enforce IAM, use user OAuth or (more commonly) service accounts with ADC.</p>
        </article>
        <article class="card p-6">
          <h3 class="font-semibold">When do I need an <em>ID token</em>?</h3>
          <p class="mt-2 text-slate-700">When your service wants to verify the caller’s identity and intended audience (e.g., a SPA calling Cloud Run). For backend→Google API calls, you normally use an <em>access token</em> instead.</p>
        </article>
        <article class="card p-6">
          <h3 class="font-semibold">Keys vs Federation vs Impersonation</h3>
          <p class="mt-2 text-slate-700">Long‑lived key files are risky and hard to rotate. Prefer <strong>federation</strong> outside Google Cloud and <strong>impersonation</strong> between identities. Both yield short‑lived, auditable tokens with least privilege.</p>
        </article>
        <article class="card p-6">
          <h3 class="font-semibold">Libraries vs manual REST calls</h3>
          <p class="mt-2 text-slate-700">Client libraries handle ADC and token refresh for you. If you use raw REST, you’ll obtain/refresh tokens yourself — fine for tooling, but error‑prone for apps.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-sm text-slate-500">Structured with the Divio system: Tutorials · How‑to · Explanation · Reference.</div>
      <div class="mt-2 text-sm text-slate-500">Copy‑paste into your docs; keep links to your team’s concrete API examples and IAM role catalog.</div>
    </div>
  </footer>
