(() => {
  const getTopOffset = () => {
    const header = document.querySelector('.zk-global-header');
    return (header?.getBoundingClientRect().height || 100) + 16;
  };
  const footerGap = 16;

  const reset = (sidebar) => {
    sidebar.classList.remove('is-fixed-policy-sidebar', 'is-ending-policy-sidebar');
    sidebar.style.removeProperty('--legal-sidebar-left');
    sidebar.style.removeProperty('--legal-sidebar-width');
    sidebar.style.removeProperty('--legal-sidebar-top');
    sidebar.style.removeProperty('--legal-sidebar-height');
    sidebar.style.removeProperty('--legal-sidebar-end-left');
    sidebar.style.removeProperty('--legal-footer-gap');
  };

  const update = (sidebar) => {
    const section = sidebar.closest('.zk-document');
    if (!section || window.innerWidth <= 760) return reset(sidebar);

    const topOffset = getTopOffset();
    const sectionBounds = section.getBoundingClientRect();
    const sidebarHeight = sidebar.getBoundingClientRect().height;
    const shouldFix = sectionBounds.top <= topOffset
      && sectionBounds.bottom > topOffset;

    if (!shouldFix) return reset(sidebar);
    if (sectionBounds.bottom <= topOffset + sidebarHeight + footerGap) {
      if (sidebar.classList.contains('is-ending-policy-sidebar')) return;

      const bounds = sidebar.getBoundingClientRect();
      sidebar.style.setProperty('--legal-sidebar-left', `${bounds.left}px`);
      sidebar.style.setProperty('--legal-sidebar-width', `${bounds.width}px`);
      sidebar.style.setProperty('--legal-sidebar-height', `${bounds.height}px`);
      sidebar.style.setProperty('--legal-sidebar-end-left', `${bounds.left - sectionBounds.left}px`);
      sidebar.style.setProperty('--legal-footer-gap', `${footerGap}px`);
      sidebar.classList.remove('is-fixed-policy-sidebar');
      sidebar.classList.add('is-ending-policy-sidebar');
      return;
    }
    if (sidebar.classList.contains('is-ending-policy-sidebar')) {
      sidebar.classList.remove('is-ending-policy-sidebar');
    }
    if (sidebar.classList.contains('is-fixed-policy-sidebar')) {
      sidebar.style.setProperty('--legal-sidebar-top', `${topOffset}px`);
      return;
    }

    const bounds = sidebar.getBoundingClientRect();
    sidebar.style.setProperty('--legal-sidebar-left', `${bounds.left}px`);
    sidebar.style.setProperty('--legal-sidebar-width', `${bounds.width}px`);
    sidebar.style.setProperty('--legal-sidebar-top', `${topOffset}px`);
    sidebar.style.setProperty('--legal-sidebar-height', `${bounds.height}px`);
    sidebar.style.setProperty('--legal-footer-gap', `${footerGap}px`);
    sidebar.classList.add('is-fixed-policy-sidebar');
  };

  const updateAll = () => document.querySelectorAll('.zk-document-sidebar').forEach(update);
  let frame;
  const scheduleUpdate = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = undefined;
      updateAll();
    });
  };
  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', () => {
    document.querySelectorAll('.zk-document-sidebar').forEach(reset);
    scheduleUpdate();
  });
  updateAll();
})();
