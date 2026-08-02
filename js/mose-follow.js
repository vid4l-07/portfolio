(function() {
  var root = document.documentElement;

  document.addEventListener('mousemove', function(e) {
    root.style.setProperty('--mouse-x', e.clientX + 'px');
    root.style.setProperty('--mouse-y', e.clientY + 'px');
  });
})();
