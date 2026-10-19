// --- SPLASH SCREEN ---
(function() {
  var splash = document.getElementById('splash');
  var done = false;

  function finish() {
    if (done) return;
    done = true;
    document.body.classList.add('is-loaded', 'is-ready');
    document.body.style.overflow = '';
    if (splash) splash.classList.add('hidden');
    document.dispatchEvent(new CustomEvent('splash:done'));
  }

  if (!splash) {
    finish();
    return;
  }

  document.body.style.overflow = 'hidden';

  var cmdLine = document.getElementById('cmdLine');
  var output = document.getElementById('termOutput');
  var cursor = document.getElementById('cursor');

  var fullCmd = 'curl portfolio:8080';
  var fullOutput = '> Loading...';
  var i = 0;

  function typeCmd() {
    if (i < fullCmd.length) {
      cmdLine.textContent += fullCmd[i];
      i++;
      setTimeout(typeCmd, 50 + Math.random() * 40);
    } else {
      cursor.style.display = 'none';
      typeOutput(0);
    }
  }

  var j = 0;
  function typeOutput() {
    if (j < fullOutput.length) {
      var ch = fullOutput[j];
      if (ch === '\n') {
        output.innerHTML += '<br>';
      } else {
        output.innerHTML += ch;
      }
      j++;
      setTimeout(typeOutput, 30 + Math.random() * 20);
    } else {
      setTimeout(finish, 900);
    }
  }

  setTimeout(typeCmd, 500);

  // Red de seguridad: nunca dejar la página bloqueada
  setTimeout(finish, 4000);
})();
