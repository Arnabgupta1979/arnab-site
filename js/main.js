/* ============================================================
   MAIN.JS — Shared utilities: fade-up, research filter, counters
   ============================================================ */

/* ── Fade-up on scroll ── */
function initFadeUps() {
  const els = document.querySelectorAll('.fade-up:not(.vis)');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('vis'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initFadeUps);

/* ── Research publication filter ── */
document.addEventListener('click', e => {
  if (!e.target.classList.contains('filter-btn')) return;
  const bar = e.target.closest('.filter-bar');
  bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  e.target.classList.add('active');
  const f = e.target.dataset.filter;
  document.querySelectorAll('.pub-item').forEach(item => {
    item.style.display = (f === 'all' || item.dataset.type === f) ? '' : 'none';
  });
});

/* ── Counter animation (home page stats) ── */
function animateCounter(el) {
  const target = +el.dataset.target;
  const suffix = el.dataset.suffix || '';
  let cur = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur + suffix;
    if (cur >= target) clearInterval(timer);
  }, 35);
}
document.querySelectorAll('[data-counter]').forEach(animateCounter);
