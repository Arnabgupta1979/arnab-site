'use strict';
// Shared navigation is present in the HTML; JavaScript adds mobile interaction.
(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.getElementById('navigation');
  if (!menu || !navigation) return;
  function closeMenu() {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  }
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation.classList.contains('open')) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
  const wide = window.matchMedia('(min-width: 901px)');
  wide.addEventListener?.('change', () => { if (wide.matches) closeMenu(); });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
