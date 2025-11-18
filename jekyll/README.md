## Jekyll for wechaty.js.org

Wechaty.js.org is using Jekyll for our three parts:

wechaty.js.org/ | Repo Folder
:--- | :---
[News] | [_posts](_posts/) (with `news` tag)
[Blog] | [_posts](_posts/)
[Contributors] | [_contributors/](_contributors/)

## YAML front matter

1. For news posts (will show in `/news/` URL), add `news` to `tags`
1. For sticky posts, add `sticky` to `tags`

## Use mermaid

````bash
```
title: xxxxx
author: xxxxx
categories: xxxxx
tags:
  - xxxxx
image: /assets/2022/xxxxx/logo.webp
mermaid: true
```
````

## Math notation

MathJax only loads on pages that opt in with a `math: true` front matter flag. This keeps most posts light while still allowing LaTeX wherever needed.

- Add `math: true` alongside your usual metadata whenever the page contains formulas.
- Use `$...$` or `\(...\)` for inline math.
- Use `$$...$$` or `\[...\]` for display math blocks.
- Set `math: false` explicitly if you globally enable math later but want to skip it for a page.


## Serve from local

Run the Jekyll at localhost for blog preview.

### 0 Prerequisites

Follow in the official instruction to install jekyll in your local [jekyll quickstart](https://jekyllrb.com/docs/)

### 1 Use Docker

This is the recommended way for new users to easy getting started

```sh
make docker-serve
```

### 2 Install Jekyll by Hand

You should not use this way except you are a Ruby expert.

```sh
make install
make serve
```

## Links

- [Jekyll Theme minima](https://github.com/jekyll/minima)

## Maintainers

[wechaty/contributors](https://github.com/orgs/wechaty/teams/contributors/members)

# Asset Management (DRY Principle)

All post-specific assets are now stored in their respective English post folders under `/assets/2016/12-<post-name>-en/`. Old asset files have been removed from `/assets/2016/` and empty directories cleaned up. Please reference images using the new folder structure for maintainability and DRY compliance.

Example:

```yaml
image: /assets/2016/12-<post-name>-en/<image-file>.webp
```

For more details, see the migration script or contact the maintainers.
