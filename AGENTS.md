Your name is Friday BOT, you are the Ambassador of Wechaty.

- Use Deno/TypeScript for coding instead of Python and Shell Script as possible as you can.

## Agent Guide: Creating a Blog Post

This guide outlines the strict rules and conventions for adding a new blog post to the Wechaty Jekyll repository.

## 1. File Naming Convention

- **Directory**: `jekyll/_posts/`
- **Format**: `YYYY-MM-DD-slug-slug-slug.md`
- **Rules**:
  - Must start with the date.
  - Must contain at least **three** slugs separated by hyphens (e.g., `my-new-post` is 3 slugs).
  - Must use only lowercase letters, numbers, and hyphens.
  - Must end with `.md`.
  - **CRITICAL**: The `slug-slug-slug` part MUST be identical to the asset folder name.

## 2. Asset Organization

- **Directory**: `jekyll/assets/YYYY/MM-slug-slug-slug/`
- **Rules**:
  - The folder path MUST match the post's date and slugs EXACTLY.
  - Example:
    - Post: `2025-11-25-my-awesome-feature.md`
    - Asset Folder: `jekyll/assets/2025/11-my-awesome-feature/`
  - **Allowed Extensions**: `.webp`, `.pdf`, `.zip`, `.svg`.
  - **Note**: `.png` and `.jpg` are NOT explicitly whitelisted in the linter rules seen (`.file-name-linter.json`), though they might work if not linted against. However, existing posts use `.webp` heavily. **Prefer `.webp`**.

## 3. Front Matter Requirements

Every post must have the following YAML front matter:

```yaml
---
title: "post_title"
excerpt: "post_excerpt" # make it a strong hook, max 160 characters
categories: "category_name"  # replace by best category name from existing categories
author: "author_name" # MUST match a filename in jekyll/_contributors/ (e.g. huan.md)
tags:
  - tag1
  - tag2
image: /assets/YYYY/MM-slug-slug-slug/post-teaser-image.webp
---
```

- **Critical**: The `image` key is **MANDATORY**. It must point to a valid image file in your asset folder.
- **Teaser**: The `image` is used as the teaser.
- **Author**: The `author` field MUST match a filename in `jekyll/_contributors/` (without the `.md` extension).
  - Example: If `jekyll/_contributors/huan.md` exists, use `author: huan`.
  - If the author does not exist, you must create a new contributor file in `jekyll/_contributors/` first.
- **Mermaid**: If the post contains a mermaid code block, you MUST include `mermaid: true`.
- **Math**: If the post contains LaTeX equations (e.g., `$$`), you MUST include `mathjax: true`.

## 4. Markdown Linting Rules

Adhere to the following rules from `.markdownlint.json`:

- **No Trailing Punctuation**: Headers should not end with `.,;:!`.
- **No Hard Tabs**: Use spaces for indentation.
- **No Trailing Spaces**: Remove trailing whitespace.
- **First Header**: The first header should be an H1 (but front matter title usually handles this, so start content with H2 or text).

## 5. Content Guidelines

- Use standard Markdown.
- Links to assets should be absolute paths starting with `/assets/...`.
- Example image embed: `![Alt Text](/assets/2025/11-my-awesome-feature/image.webp)`

## 6. Verification

After creating the post and assets, run the following to verify compliance:

```bash
npm test
```

This will run:

- `lint:fn`: Checks file naming conventions.
- `test:unit`: Runs specific specs like `asset-file-location.spec.ts` and `front-matter-image.spec.ts`.

## Workflow for Agents

1. **Plan**: Define the title, slug, and gather assets.
2. **Create Asset Folder**: `mkdir -p jekyll/assets/YYYY/MM-slug-slug-slug`
3. **Add Assets**: Place images (convert to WebP if possible) in the folder.
4. **Create Post**: Write the markdown file in `jekyll/_posts/`.
5. **Verify**: Run `npm test`.

## 7. Embedding YouTube Videos

To embed a YouTube video, use the `iframe.html` include with the video URL.

```liquid
{% include iframe.html src="https://www.youtube.com/watch?v=VIDEO_ID" %}
```

- **Supported URLs**: Standard YouTube watch URLs (`youtube.com/watch?v=...`) and short URLs (`youtu.be/...`).
- **Style**: This include ensures the video is responsive and maintains the correct aspect ratio.
