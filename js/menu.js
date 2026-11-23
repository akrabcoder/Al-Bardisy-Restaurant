/* Al Bardisi - dynamic menu (reads data/menu.json) */
(function () {
  'use strict';
  var grid = document.getElementById('menuGrid');
  if (!grid) return;

  var data = null, filter = 'all';
  var tabs = document.createElement('div');
  tabs.className = 'menu-tabs';
  grid.parentNode.insertBefore(tabs, grid);

  var css = document.createElement('style');
  css.textContent =
    '.menu-tabs{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-bottom:28px}' +
    '.menu-tab{font:inherit;cursor:pointer;padding:8px 20px;border-radius:999px;border:1px solid var(--gold,#C9A227);background:transparent;color:var(--gold,#C9A227)}' +
    '.menu-tab.active{background:var(--gold,#C9A227);color:#1A1310;font-weight:700}' +
    '.menu-price{display:inline-block;margin-top:10px;font-weight:800;color:var(--gold,#C9A227)}';
  document.head.appendChild(css);

  function lang() { return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'ar'; }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function pick(o, l, k) { return (o[l] && o[l][k]) || (o.ar && o.ar[k]) || ''; }

  function render() {
    if (!data) return;
    var l = lang();
    var cats = data.categories.filter(function (c) {
      return data.items.some(function (i) { return i.cat === c.id; });
    });
    if (filter !== 'all' && !cats.some(function (c) { return c.id === filter; })) filter = 'all';

    if (cats.length > 1) {
      var h = '<button class="menu-tab' + (filter === 'all' ? ' active' : '') + '" data-c="all">' + (l === 'en' ? 'All' : 'الكل') + '</button>';
      cats.forEach(function (c) {
        h += '<button class="menu-tab' + (filter === c.id ? ' active' : '') + '" data-c="' + esc(c.id) + '">' + esc(c[l] || c.ar) + '</button>';
      });
      tabs.innerHTML = h;
      tabs.style.display = '';
    } else {
      tabs.style.display = 'none';
    }

    grid.innerHTML = data.items
      .filter(function (i) { return filter === 'all' || i.cat === filter; })
      .map(function (i) {
        var name = pick(i, l, 'name');
        var price = (i.price !== null && i.price !== '' && i.price !== undefined)
          ? '<span class="menu-price">' + esc(i.price) + (l === 'en' ? ' EGP' : ' ج.م') + '</span>' : '';
        return '<div class="menu-card reveal active"><div class="menu-card-img">' +
          (i.image ? '<img src="' + esc(i.image) + '" alt="' + esc(name) + '" loading="lazy">' : '') +
          '</div><div class="menu-card-body"><h3>' + esc(name) + '</h3><p>' + esc(pick(i, l, 'desc')) + '</p>' + price + '</div></div>';
      }).join('');
  }

  tabs.addEventListener('click', function (e) {
    var b = e.target.closest('.menu-tab');
    if (!b) return;
    filter = b.getAttribute('data-c');
    render();
  });

  new MutationObserver(render).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

  fetch('data/menu.json?t=' + Date.now())
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { data = d; render(); })
    .catch(function () { /* keep the static menu from index.html */ });
})();
