---
layout: page
title: Search
permalink: /search/
search: false
sitemap: false
---

<h1>Search</h1>
<input id="q" type="search" placeholder="Search…" class="form-control mb-3" />
<ul id="results"></ul>

<script defer src="https://unpkg.com/lunr/lunr.js"></script>
<script>
(async function () {
  const res = await fetch('{{ "/search.json" | relative_url }}');
  const data = await res.json();
  const idx = lunr(function () {
    this.ref('url');
    this.field('title', { boost: 10 });
    this.field('excerpt');
    this.field('tags');
    this.field('categories');
    data.docs.forEach(doc => this.add(doc));
  });
  const q = document.getElementById('q');
  const out = document.getElementById('results');
  q.addEventListener('input', () => {
    const term = q.value.trim();
    const hits = term ? idx.search(term) : [];
    out.innerHTML = hits.map(h => {
      const doc = data.docs.find(d => d.url === h.ref);
      if (!doc) return '';
      return `<li><a href="${doc.url}">${doc.title}</a><br><small>${doc.excerpt}</small></li>`;
    }).join('');
  });
})();
</script>
