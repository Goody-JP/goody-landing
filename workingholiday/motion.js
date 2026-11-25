(() => {
  'use strict';

  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const root = document.documentElement;
  const groups = [
    '.introduction > h2, .introduction > .cafe-photo, .introduction > p, .postcard',
    '.recommended > h2, .audience-list > li',
    '.comparison > h2, .comparison > .cost-card',
    '.process > h2, .steps > li',
    '.program-benefits > h2, .merit-list > li, .harbour-photo',
    '.line-button',
  ];
  const targets = groups.flatMap(selector => [...document.querySelectorAll(selector)]);
  let observer;

  function reveal(element) {
    element.classList.add('is-revealed');
    observer?.unobserve(element);
  }

  function configureMotion() {
    observer?.disconnect();
    root.classList.remove('motion-ready');
    targets.forEach(element => {
      element.classList.remove('reveal-pending', 'is-revealed');
      element.style.removeProperty('--reveal-delay');
    });

    // Without JS, observer support, or permission for motion, everything stays visible.
    if (preference.matches || !('IntersectionObserver' in window)) return;

    observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) reveal(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });

    groups.forEach(selector => {
      document.querySelectorAll(selector).forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 65}ms`);
        element.classList.add('reveal-pending');
        // Never hide material already visible, including restored scroll positions.
        if (element.getBoundingClientRect().top < window.innerHeight - 24) {
          reveal(element);
        } else {
          observer.observe(element);
        }
      });
    });
    root.classList.add('motion-ready');
  }

  document.addEventListener('focusin', event => {
    const target = event.target.closest('.reveal-pending');
    if (target) reveal(target);
  });

  // Print and find-in-page/fragment navigation must never strand hidden content.
  window.addEventListener('beforeprint', () => targets.forEach(reveal));
  window.addEventListener('hashchange', () => {
    let destination;
    try { destination = document.getElementById(decodeURIComponent(location.hash.slice(1))); }
    catch { return; }
    destination?.querySelectorAll('.reveal-pending').forEach(reveal);
    if (destination?.classList.contains('reveal-pending')) reveal(destination);
  });
  preference.addEventListener('change', configureMotion);
  configureMotion();
})();
