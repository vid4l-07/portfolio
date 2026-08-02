// --- SPLASH SCREEN ---
(function() {
  var splash = document.getElementById('splash');
  if (!splash) return;

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
      setTimeout(function() {
        splash.classList.add('hidden');
        document.body.style.overflow = '';
      }, 900);
    }
  }

  setTimeout(typeCmd, 500);
})();
