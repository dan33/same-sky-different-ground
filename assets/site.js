/* Shared site behaviour: offline support, current-page nav marking,
   contact-address assembly (kept out of the static HTML to deter scrapers). */
(function () {
  // Offline: register the service worker where the platform allows it.
  if ('serviceWorker' in navigator &&
      (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    navigator.serviceWorker.register('sw.js').catch(function () { /* offline support is progressive */ });
  }

  // Mark the current page in the header nav and mobile menu.
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a, .mnav .sheet a').forEach(function (a) {
    if (a.getAttribute('href') === here) a.setAttribute('aria-current', 'page');
  });

  // Close the mobile menu when a link inside it is chosen or when tapping outside.
  var menu = document.querySelector('.mnav');
  if (menu) {
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) menu.removeAttribute('open'); });
    document.addEventListener('click', function (e) { if (!menu.contains(e.target)) menu.removeAttribute('open'); });
  }

  // Contact links: assemble the address at click-time from data attributes.
  document.querySelectorAll('a[data-u][data-d]').forEach(function (a) {
    a.addEventListener('click', function () {
      var addr = a.getAttribute('data-u') + '@' + a.getAttribute('data-d');
      var subj = a.getAttribute('data-s');
      a.href = 'mailto:' + addr + (subj ? '?subject=' + encodeURIComponent(subj) : '');
    });
  });
})();
