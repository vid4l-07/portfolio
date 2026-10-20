// --- SPLASH SCREEN ---
(function() {
  var splash = document.getElementById('splash');
  var splashLoader = document.getElementById('splashLoader');
  var splashSpinner = document.getElementById('splashSpinner');
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var started = false; // el vuelo arrancó
  var landed = false;  // el hero ya está revelado
  var skipped = false;
  var timers = [];

  var spinFrames = ['\u280b', '\u2819', '\u2839', '\u2838', '\u283c', '\u2834', '\u2826', '\u2827', '\u2807', '\u280f'];
  var spinIdx = 0;
  var spinId = null;

  function later(fn, ms) {
    var id = setTimeout(fn, ms);
    timers.push(id);
    return id;
  }

  function clearTimers() {
    for (var i = 0; i < timers.length; i++) clearTimeout(timers[i]);
    timers = [];
  }

  function startTypewriter() {
    if (typeof window.startTypewriter === 'function') window.startTypewriter();
  }

  var scrollKeys = {
    ' ': 1, Spacebar: 1, ArrowUp: 1, ArrowDown: 1, ArrowLeft: 1,
    ArrowRight: 1, PageUp: 1, PageDown: 1, Home: 1, End: 1
  };

  function preventScroll(e) { e.preventDefault(); }

  function onKey(e) {
    if (e.key === 'Escape' || e.key === 'Enter') {
      e.preventDefault();
      skip();
      return;
    }
    if (scrollKeys[e.key]) e.preventDefault();
  }

  function lockScroll() {
    document.body.style.overflow = 'hidden';
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', onKey);
    window.scrollTo(0, 0);
  }

  function startSpin() {
    if (!splashSpinner) return;
    if (spinId) clearInterval(spinId);
    spinIdx = 0;
    splashSpinner.textContent = spinFrames[0];
    spinId = setInterval(function() {
      spinIdx = (spinIdx + 1) % spinFrames.length;
      splashSpinner.textContent = spinFrames[spinIdx];
    }, 80);
  }

  function stopSpin() {
    if (spinId) clearInterval(spinId);
    spinId = null;
    if (splashLoader) splashLoader.classList.add('hidden');
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    window.removeEventListener('wheel', preventScroll, { passive: false });
    window.removeEventListener('touchmove', preventScroll, { passive: false });
    window.removeEventListener('keydown', onKey);
  }

  function land() {
    if (landed) return;
    landed = true;
    clearTimers();
    document.body.style.overflow = '';
    document.body.classList.add('is-loaded', 'is-ready', 'splash-landed');
    void document.body.offsetWidth;
    if (splash) splash.classList.add('hidden');
    unlockScroll();
    startTypewriter();
    document.dispatchEvent(new CustomEvent('splash:done'));
  }

  function textRect(el) {
    if (!el) return null;
    var range = document.createRange();
    range.selectNodeContents(el);
    var r = range.getBoundingClientRect();
    if (!r.width && !r.height && el.getBoundingClientRect) r = el.getBoundingClientRect();
    return r;
  }

  function runFlight() {
    if (started || landed) return;
    started = true;
    clearTimers();
    stopSpin();

    var nameLines = splash.querySelectorAll('.splash-line');
    var heroLines = document.querySelectorAll('.hero-name .split-line');
    var row = document.getElementById('splashPhrases');
    var heroTag = document.querySelector('.hero-tagline');
    var heroType = document.getElementById('typewriterText');

    splash.classList.add('is-in', 'splash-fly');
    void splash.offsetWidth;

    document.body.classList.add('splash-measure');
    void document.body.offsetWidth;

    var pairs = [];
    var n = Math.min(nameLines.length, heroLines.length);
    for (var i = 0; i < n; i++) {
      var line = nameLines[i];
      var src = textRect(line.querySelector('.splash-line-inner'));
      var dst = textRect(heroLines[i].querySelector('.split-inner'));
      if (src && dst && src.width) pairs.push({ line: line, src: src, dst: dst });
    }

    var rowRect = row ? row.getBoundingClientRect() : null;
    var tagRect = heroTag ? heroTag.getBoundingClientRect() : null;

    var firstWidth = 0;
    var firstWord = (window.typewriterWords && window.typewriterWords[0]) || '';
    if (heroType && firstWord) {
      heroType.textContent = firstWord;
      var fr = textRect(heroType);
      firstWidth = fr ? fr.width : 0;
      heroType.textContent = '';
    }

    document.body.classList.remove('splash-measure');
    splash.classList.remove('splash-fly');

    var dur = skipped ? 0.45 : 0.9;
    var ease = 'cubic-bezier(0.7, 0, 0.2, 1)';

    for (var p = 0; p < pairs.length; p++) {
      var pair = pairs[p];
      var box = pair.line.getBoundingClientRect();
      pair.line.style.transformOrigin =
        (pair.src.left - box.left) + 'px ' + (pair.src.top - box.top) + 'px';
      pair.line.style.transition = 'transform ' + dur + 's ' + ease;
      pair.line.style.transform =
        'translate(' + (pair.dst.left - pair.src.left) + 'px,' + (pair.dst.top - pair.src.top) + 'px)' +
        ' scale(' + (pair.dst.width / pair.src.width) + ')';
    }

    if (row && rowRect && tagRect && rowRect.width && firstWidth) {
      row.style.transformOrigin = '0px ' + (rowRect.height / 2) + 'px';
      row.style.transition = 'transform ' + dur + 's ' + ease + ', opacity ' + dur + 's ' + ease;
      row.style.transform =
        'translate(' + (tagRect.left - rowRect.left) + 'px,' +
        ((tagRect.top + tagRect.height / 2) - (rowRect.top + rowRect.height / 2)) + 'px)' +
        ' scaleX(' + (firstWidth / rowRect.width) + ')';
      row.style.opacity = '0';
    }

    startTypewriter();

    later(land, Math.round(dur * 1000) + 80);
    later(function() { if (!landed) land(); }, Math.round(dur * 1000) + 2200);
  }

  function skip() {
    if (landed || started) return;
    skipped = true;
    runFlight();
  }

  if (!splash || reduced) {
    land();
    return;
  }

  lockScroll();

  requestAnimationFrame(function() {
    if (splash) splash.classList.add('is-in');
    startSpin();
  });

  later(runFlight, 4600);
  later(function() { if (!landed) runFlight(); }, 6000);
  later(function() { if (!landed) land(); }, 7200);
})();
