// --- HEADER SCROLL ---
(function() {
  var header = document.getElementById('header');
  var ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        header.classList.toggle('scrolled', window.scrollY > 40);
        ticking = false;
      });
      ticking = true;
    }
  });
})();

// --- ACTIVE NAV LINK ---
(function() {
  var sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  function updateActive() {
    var bestId = null;
    var bestRatio = 0;

    sections.forEach(function(section) {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var visible = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0));
      var ratio = visible / (rect.height || 1);

      if (ratio > bestRatio) {
        bestRatio = ratio;
        bestId = section.id;
      }
    });

    document.querySelectorAll(".nav-link.active").forEach(function(el) {
      el.classList.remove("active");
    });

    if (bestId) {
      document.querySelectorAll('.nav-link[href="#' + bestId + '"]').forEach(function(el) {
        el.classList.add("active");
      });
    }
  }

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
})();
