(function () {
  'use strict';
  const header = document.querySelector('.topline');
  const nav = header && header.querySelector('.topnav');
  if (!nav) return;

  nav.id = nav.id || 'transplant-navigation';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.textContent = 'Menu';
  toggle.setAttribute('aria-controls', nav.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
  header.insertBefore(toggle, nav);
  header.classList.add('has-mobile-navigation');

  const mobile = window.matchMedia('(max-width: 950px)');
  function close() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
  }
  toggle.addEventListener('click', function () {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) close();
  });
  mobile.addEventListener('change', close);
}());
