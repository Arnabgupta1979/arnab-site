# Arnab Gupta — Research, Books & Ideas

Unified static personal website for arnabgupta.nl. The existing portfolio and the approved books design now share navigation, Helvetica-style typography, indigo/white/teal colours, rounded buttons and restrained motion.

## Structure

- `index.html`: professional introduction, selected expertise and three-book preview.
- `pages/about.html`, `research.html`, `projects.html`, `writing.html`, `contact.html`: original portfolio addresses, with the shared design.
- `books/index.html`: all three books, country-specific Amazon destinations, original covers, excerpts, reading guide, purchasing FAQ and author portrait.
- `pages/books.html`: compatibility link to the bookshelf.
- `css/style.css`: portfolio layout. `css/books.css`: approved book-section design. `css/unified.css`: shared navigation, typography and refinements.
- `js/components.js`: mobile navigation, keyboard handling and current copyright year.
- `js/main.js`: progressive entrance animation and research category filter.
- `js/books.js`: excerpts, Amazon country selection and optional retailer links.
- `js/shop-config.js`: public Lulu/Payhip URLs only.
- `assets/books/`: optimised supplied portraits, covers and botanical imagery.
- `CNAME`: existing arnabgupta.nl domain; retained unchanged.
- `.nojekyll`: publish the static files directly without Jekyll processing.

## GitHub Pages

Keep the existing Pages configuration: deploy from the `main` branch, repository root. No installation or build step is required. The repository contains the finished website. After the changes reach main and Pages publishes them, the existing domain serves the merged design.

## Editing

Edit text in its HTML page and commit. Change shared appearance in `css/unified.css`. Add images to `assets/` and use relative paths. Navigation/footer HTML is intentionally included in each page so links remain usable without JavaScript; change the matching navigation links in all seven main pages when adding a new section.

The site is a personal portfolio with external retailer links. Lulu and direct digital sales stay inactive until genuine, tested public checkout URLs are supplied in `js/shop-config.js`. The repository contains no paid ebook downloads, payment credentials or functioning direct checkout. Before offering digital books outside Amazon, confirm KDP Select eligibility.

## Validation and content

Local page and asset links, cross-page anchors, unique IDs and JavaScript syntax are checked. Shared navigation includes keyboard handling, and entrance animations honour reduced-motion preferences. Content is visible without animation APIs. The previously inert publication `#` links are now plain headings; no DOI or article destination has been invented. Original research/project statements are retained and have not undergone an independent publication or biography audit.

Uncurried is now marked published, its description mentions practical recipes, and the biography's obsolete 'three books in progress' wording has been replaced.

Cloudflare setup and domain changes are deferred. This update does not alter DNS or buy services.
