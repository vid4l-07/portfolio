// --- SCROLL REVEAL ---
(function() {
  var revealEls = document.querySelectorAll('.reveal, .reveal-left');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

    revealEls.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function(el) {
      el.classList.add('visible');
    });
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
