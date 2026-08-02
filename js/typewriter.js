// --- TYPEWRITER ---
(function() {
  var words = [
    'Computer Engineering student',
    'Linux Environments Enthusiast',
    'Interested in Cybersecurity'
  ];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var textEl = document.getElementById('typewriterText');
  var typeSpeed = 60;
  var deleteSpeed = 30;
  var pauseDuration = 2000;

  function tick() {
    var current = words[wordIndex];
    if (!current) return;

    if (!isDeleting) {
      textEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        setTimeout(function() { isDeleting = true; tick(); }, pauseDuration);
        return;
      }
    } else {
      textEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    var speed = isDeleting ? deleteSpeed : typeSpeed;
    setTimeout(tick, speed);
  }

  tick();
})();
