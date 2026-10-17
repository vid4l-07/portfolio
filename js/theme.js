// --- THEME TOGGLE ---
(function() {
  var theme = localStorage.getItem('theme');
  var isLight = theme === 'light';
  var html = document.documentElement;

  function setTheme(light) {
    html.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
    var useEl = document.getElementById('themeIconUse');
    if (useEl) {
      useEl.setAttribute('href', light ? '#moon' : '#sun');
    }
  }

  var useElInitial = document.getElementById('themeIconUse');
  if (useElInitial) {
    useElInitial.setAttribute('href', isLight ? '#moon' : '#sun');
  }

  document.getElementById('themeBtn').addEventListener('click', function() {
    setTheme(!html.classList.contains('light'));
  });
})();
