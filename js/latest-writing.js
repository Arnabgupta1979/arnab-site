(() => {
  const container = document.getElementById('latest-articles');
  if (!container) return;
  const publication = 'https://arnabgupta9.substack.com';
  const endpoint = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(publication + '/feed');
  const textFromHTML = value => new DOMParser().parseFromString(value || '', 'text/html').body.textContent.replace(/\s+/g, ' ').trim();
  const isArticle = value => { try { const u = new URL(value); return u.protocol === 'https:' && u.hostname === 'arnabgupta9.substack.com' && u.pathname.startsWith('/p/'); } catch { return false; } };
  const safeImage = value => { try { const u = new URL(value); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } };
  const make = (tag, cls, value) => { const node = document.createElement(tag); if (cls) node.className = cls; if (value) node.textContent = value; return node; };
  const fallback = () => { container.replaceChildren(); const p = make('p','article-status','The latest articles could not be loaded just now. '); const a = make('a','','Read them on Substack ↗'); a.href = publication; p.append(a); container.append(p); };
  fetch(endpoint, {cache:'no-store'}).then(r => {if (!r.ok) throw Error('Feed unavailable'); return r.json();}).then(data => {
    if (data.status !== 'ok' || !Array.isArray(data.items)) throw Error('Invalid feed');
    const posts = data.items.filter(item => isArticle(item.link)).slice(0,3);
    if (!posts.length) throw Error('No posts');
    container.replaceChildren();
    for (const post of posts) {
      const link = make('a','article-card'); link.href = post.link; link.target = '_blank'; link.rel = 'noopener noreferrer';
      const doc = new DOMParser().parseFromString(post.content || post.description || '', 'text/html');
      const imgUrl = safeImage(post.thumbnail || post.enclosure?.link || doc.querySelector('img')?.getAttribute('src'));
      if (imgUrl) { const img = make('img','article-image'); img.src = imgUrl; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); link.append(img); }
      const body = make('div','article-body'); const date = new Date(post.pubDate); if (!Number.isNaN(date.valueOf())) body.append(make('span','article-date',new Intl.DateTimeFormat('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'}).format(date)));
      body.append(make('h3','',textFromHTML(post.title)));
      const summary = textFromHTML(post.description || post.content); if (summary) body.append(make('p','',summary.length > 160 ? summary.slice(0,157).trimEnd() + '…' : summary));
      body.append(make('span','article-arrow','Read article ↗')); link.append(body); container.append(link);
    }
  }).catch(fallback);
})();