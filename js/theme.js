// --- THEME TOGGLE ---
(function() {
  var theme = localStorage.getItem('theme');
  var isLight = theme === 'light';
  var html = document.documentElement;

  function setTheme(light) {
    html.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
    var sunIcon = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
    var moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
    var icons = document.querySelectorAll('#themeIcon');
    icons.forEach(function(icon) {
      icon.innerHTML = light ? moonIcon : sunIcon;
    });
  }

  var initialSun = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  var initialMoon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
  document.getElementById('themeIcon').innerHTML = isLight ? initialMoon : initialSun;

  document.getElementById('themeBtn').addEventListener('click', function() {
    setTheme(!html.classList.contains('light'));
  });
})();
