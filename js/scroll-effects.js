// --- SCROLL REVEAL ---
// IntersectionObserver: añade .is-visible una sola vez por elemento.
(function() {
  var targets = document.querySelectorAll('[data-reveal], [data-split]');

  function showAll() {
    targets.forEach(function(el) {
      el.classList.add('is-visible');
    });
  }

  function observe() {
    if (!('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(function(el) {
      observer.observe(el);
    });
  }

  // El contenido no se revela hasta que el splash termina
  var started = false;
  function start() {
    if (started) return;
    started = true;
    observe();
  }

  var splash = document.getElementById('splash');
  if (splash && !splash.classList.contains('hidden')) {
    document.addEventListener('splash:done', start, { once: true });
    // Red de seguridad por si el splash falla
    setTimeout(start, 4000);
  } else {
    start();
  }
})();

// --- DIVIDER ANIMATIONS ---
(function() {
  var dividers = document.querySelectorAll('.divider-line');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    dividers.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    dividers.forEach(function(el) {
      el.classList.add('revealed');
    });
  }
})();

// --- TIMELINE LINE ANIMATIONS ---
(function() {
  var timelines = document.querySelectorAll('.timeline-line-inner');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    timelines.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    timelines.forEach(function(el) {
      el.classList.add('revealed');
    });
  }
})();
