## Translation Requirements (High-Level)

Use this as the minimal, high-level brief for converting posts. It captures only translation-related requirements derived from your prompts and decisions.

- only convert posts that are in Chinese or mixed Chinese/English.
	- after a blog post has been translated, mark the original post as `hidden: true` in the front matter to hide it from the main blog listing.
	- Names in English posts: put Chinese names in parentheses immediately after English transliterations, e.g., `Qinghua Duan (段清华)`.
	- Front matter
		- update `excerpt` in front matter yaml to a good summarizing
		- suggested tags if there are any good ones.
- Dual posts (no mixed languages):
  - Create a separate English file with `-en` suffix (e.g., `YYYY-MM-DD-slug-en.md`).
  - Add cross-language links at the end of both posts as blockquotes:
    - `> Chinese version: /YYYY/MM/DD/slug/`
    - `> 英文版: /YYYY/MM/DD/slug-en/`
- After edits: run `npm test` to ensure lint/tests pass.
