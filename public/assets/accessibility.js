(() => {
  const focusable = (root) => [...root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter((element) => element.offsetParent !== null);

  const main = document.querySelector('main');
  if (main) {
    main.id ||= 'main-content';
    document.querySelector('.zk-skip-link')?.setAttribute('href', `#${main.id}`);
  }

  document.querySelectorAll('.zk-menu a[href]').forEach((link) => {
    if (new URL(link.href, location.origin).pathname === location.pathname) link.setAttribute('aria-current', 'page');
  });

  document.querySelectorAll('#resource-search, .insight-search input').forEach((input) => input.classList.add('zk-visible-focus'));
  document.querySelectorAll('#resource-empty, .insight-results').forEach((result) => result.setAttribute('aria-live', 'polite'));
  document.querySelectorAll('img:not([alt])').forEach((image) => image.setAttribute('alt', ''));
  document.querySelectorAll('.sp85-path-card button').forEach((button) => button.addEventListener('click', () => {
    const card = button.closest('.sp85-path-card');
    const open = !card.classList.contains('is-active');
    card.classList.toggle('is-active', open);
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'See less −' : 'See what you own +';
  }));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const drop = document.activeElement?.closest?.('.zk-drop');
      if (drop) {
        event.preventDefault();
        document.activeElement.blur();
        drop.querySelector(':scope > a')?.focus();
      }
    }
    const modal = document.querySelector('[aria-modal="true"]')?.closest('[aria-hidden="false"], .zk-consent-modal.show');
    if (!modal || event.key !== 'Tab') return;
    const items = focusable(modal);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  new MutationObserver((records) => records.forEach(({ target }) => {
    if (!(target instanceof Element)) return;
    const isOpen = target.matches('[aria-hidden="false"], .zk-consent-modal.show');
    if (!isOpen) return;
    const dialog = target.matches('[role="dialog"]') ? target : target.querySelector('[role="dialog"]');
    focusable(dialog || target)[0]?.focus();
  })).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['aria-hidden', 'class'] });
})();
