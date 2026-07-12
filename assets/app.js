/* Scrollytelling gradient + reveal-on-scroll */
(function () {
  var scrolly = document.getElementById('gradient');
  if (scrolly) {
    var steps = scrolly.querySelectorAll('.step');
    var bands = scrolly.querySelectorAll('.band');
    var labels = scrolly.querySelectorAll('.lbl');
    function activate(name) {
      bands.forEach(function (b) { b.classList.toggle('on', b.id === 'band-' + name); });
      labels.forEach(function (l) {
        var on = l.getAttribute('data-b') === name;
        l.setAttribute('opacity', on ? '1' : '.4');
        l.style.fontWeight = on ? '700' : '600';
      });
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) activate(e.target.getAttribute('data-band'));
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (s) { obs.observe(s); });
    activate('rainforest');
  }

  // reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach(function (r) { ro.observe(r); });
  }
})();
