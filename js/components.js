/* ============================================================
   SHARED COMPONENTS — nav & footer, injected on every page
   ============================================================ */

(function () {

  /* ── Detect depth (root vs pages/) ── */
  const inPages = window.location.pathname.includes('/pages/');
  const root    = inPages ? '../' : './';
  const pages   = inPages ? './'  : './pages/';

  /* ── NAV ── */
  const NAV = `
  <nav class="nav" id="nav">
    <div class="nav-in">
      <a href="${root}index.html" class="nav-logo">Arnab <em>Gupta</em></a>
      <ul class="nav-links" id="navlinks">
        <li><a href="${root}index.html">Home</a></li>
        <li><a href="${pages}about.html">About</a></li>
        <li><a href="${pages}research.html">Research</a></li>
        <li><a href="${pages}projects.html">Projects</a></li>
        <li><a href="${pages}writing.html">Writing</a></li>
        <li><a href="${pages}contact.html" class="nav-cta">Contact</a></li>
      </ul>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>`;

  /* ── FOOTER ── */
  const FOOTER = `
  <footer>
    <div class="footer-grid">
      <div class="foot-brand">
        <div class="nav-logo">Arnab <em>Gupta</em></div>
        <p>Seed systems researcher, digital innovation advisor, and curious generalist. Based in Wageningen, Netherlands.</p>
      </div>
      <div class="foot-col">
        <h5>Navigate</h5>
        <ul>
          <li><a href="${root}index.html">Home</a></li>
          <li><a href="${pages}about.html">About</a></li>
          <li><a href="${pages}research.html">Research</a></li>
          <li><a href="${pages}projects.html">Projects</a></li>
          <li><a href="${pages}writing.html">Writing</a></li>
          <li><a href="${pages}contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h5>Connect</h5>
        <ul>
          <li><a href="https://www.wur.nl/en/persons/arnab-gupta" target="_blank" rel="noopener">WUR Profile</a></li>
          <li><a href="https://orcid.org/0000-0002-5672-5735" target="_blank" rel="noopener">ORCID</a></li>
          <li><a href="https://www.researchgate.net/profile/Arnab-Gupta-2" target="_blank" rel="noopener">ResearchGate</a></li>
          <li><a href="https://arnabgupta9.substack.com" target="_blank" rel="noopener">Substack</a></li>
          <li><a href="https://linkedin.com/in/arnab-gupta-4198271b" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 Arnab Gupta · Wageningen, Netherlands</span>
      <span>ORCID: 0000-0002-5672-5735</span>
    </div>
  </footer>`;

  /* ── Inject ── */
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV;
  else document.body.insertAdjacentHTML('afterbegin', NAV);

  const footEl = document.getElementById('footer-placeholder');
  if (footEl) footEl.outerHTML = FOOTER;
  else document.body.insertAdjacentHTML('beforeend', FOOTER);

  /* ── Nav scroll shadow ── */
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
  });

  /* ── Hamburger ── */
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('navlinks').classList.toggle('open');
  });

  /* ── Active link highlight ── */
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.href && path.endsWith(a.getAttribute('href').replace(/^\.\.\/|^\.\//,''))) {
      a.classList.add('active');
    }
  });

})();
