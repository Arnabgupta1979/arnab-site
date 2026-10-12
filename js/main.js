'use strict';
// Content remains readable without JavaScript or animation APIs.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const played = new WeakSet();
  const active = new Map();
  let observer;
  function configure() {
    observer?.disconnect();
    if (preference.matches) {
      active.forEach(animation => animation.cancel());
      active.clear();
      return;
    }
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        observer.unobserve(element);
        if (played.has(element) || typeof element.animate !== 'function') return;
        played.add(element);
        const animation = element.animate([
          { opacity: 0, transform: 'translateY(12px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 620, easing: 'cubic-bezier(.22,.61,.36,1)' });
        active.set(element, animation);
        animation.onfinish = () => active.delete(element);
        animation.oncancel = () => active.delete(element);
      });
    }, { threshold: .08 });
    document.querySelectorAll('.fade-up').forEach(element => {
      if (!played.has(element)) observer.observe(element);
    });
  }
  document.addEventListener('focusin', event => {
    active.forEach((animation, element) => {
      if (element.contains(event.target)) animation.cancel();
    });
  });
  preference.addEventListener?.('change', configure);
  configure();
  document.querySelectorAll('.filter-bar').forEach(bar => {
    const buttons = [...bar.querySelectorAll('.filter-btn')];
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.classList.contains('active'))));
    bar.addEventListener('click', event => {
      const button = event.target.closest('.filter-btn');
      if (!button || !bar.contains(button)) return;
      buttons.forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
      document.querySelectorAll('.pub-item').forEach(item => {
        item.hidden = button.dataset.filter !== 'all' && item.dataset.type !== button.dataset.filter;
      });
    });
  });
})();
