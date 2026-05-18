# Arnab Gupta — Personal Professional Website

## Folder Structure

```
arnab-gupta-site/
│
├── index.html              ← Home page
│
├── pages/
│   ├── about.html          ← Biography & career timeline
│   ├── research.html       ← Publications & scholarly output
│   ├── projects.html       ← Digital tools & field programmes
│   ├── writing.html        ← Essays & long-form writing
│   └── contact.html        ← Contact & collaboration
│
├── css/
│   └── style.css           ← Global design system & all styles
│
├── js/
│   ├── components.js       ← Shared nav & footer (auto-injected)
│   └── main.js             ← Animations, filters, counters
│
└── README.md               ← This file
```

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `arnab-gupta-site`)
2. Upload all files maintaining the folder structure above
3. Go to **Settings → Pages**
4. Under **Source**, select `Deploy from a branch`
5. Choose `main` branch, `/ (root)` folder → Save
6. Your site will be live at `https://yourusername.github.io/arnab-gupta-site/`

## Custom Domain (optional)

To use a custom domain (e.g. `arnabgupta.com`):
1. Add a file named `CNAME` in the root with your domain on one line:
   ```
   arnabgupta.com
   ```
2. Point your domain's DNS to GitHub Pages:
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or CNAME: `yourusername.github.io`

## Design System

- **Fonts:** Playfair Display (headings) + Outfit (body) + JetBrains Mono (labels/code)
- **Palette:** Forest green (`#0f2419`) · Amber (`#c47c2a`) · Cream (`#f7f2e9`)
- **Nav & footer:** Auto-injected by `js/components.js` — edit once, updates everywhere
- **Animations:** Intersection Observer fade-ups, no dependencies

## Updating Content

- **New publication:** Add a `.pub-item` block in `pages/research.html`
- **New project:** Add a `.proj-card` block in `pages/projects.html`
- **New essay:** Add a `.writing-item` block in `pages/writing.html`
- **Nav/footer links:** Edit `js/components.js` — changes apply to all pages
