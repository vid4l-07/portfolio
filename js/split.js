// --- SPLIT TEXT ---
// Envuelve el texto de los headings en una máscara con interior,
// para poder animarlo con translate dentro de overflow:hidden.
(function() {
  function wrap(el) {
    if (!el || el.dataset.splitDone) return;
    var inner = document.createElement('span');
    inner.className = 'split-inner';
    inner.textContent = el.textContent;
    el.textContent = '';
    el.appendChild(inner);
    el.dataset.splitDone = '1';
  }

  document.querySelectorAll('[data-split]').forEach(function(el) {
    el.classList.add('split-line');
    wrap(el);
  });

  document.querySelectorAll('[data-split-line]').forEach(wrap);
})();
