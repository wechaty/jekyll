# Translation Requirements (High-Level)

Use this as the minimal, high-level brief for converting posts. It captures only translation-related requirements derived from your prompts and decisions.

- only convert posts that are in Chinese or mixed Chinese/English.
- Dual posts (no mixed languages):
	- Create a separate English file with `-en` suffix (e.g., `YYYY-MM-DD-slug-en.md`).
	- Add cross-language links at the end of both posts as blockquotes:
		- `> Chinese version: /YYYY/MM/DD/slug/`
		- `> English version: /YYYY/MM/DD/slug-en/`
- Names in English posts: put Chinese names in parentheses immediately after English transliterations, e.g., `Qinghua Duan (段清华)`.
- Front matter: set descript by summarizing if it is absence. add suggested tags if there any good ones can be added.
- After edits: run `npm test` to ensure lint/tests pass.
