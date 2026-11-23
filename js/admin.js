/* Al Bardisi - menu admin. Saves to GitHub (data/menu.json + images/menu/*) */
(function () {
  'use strict';

  /* ---- CONFIG: edit these ---- */
  var CFG = {
    owner: 'akrabcoder',
    repo: 'Al-Bardisy-Restaurant',
    branch: 'main',
    password: 'change-me-123'
  };
  /* ---------------------------- */

  var TOKEN_KEY = 'bardisi_gh_token';
  var token = localStorage.getItem(TOKEN_KEY) || '';
  var data = { categories: [], items: [] };
  var sha = null, dirty = false;
  var pending = {};   /* path -> base64 */
  var previews = {};  /* path -> dataURL */

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function enc(s) { return btoa(unescape(encodeURIComponent(s))); }
  function dec(b) { return decodeURIComponent(escape(atob(b.replace(/\n/g, '')))); }
  function show(id) { ['loginBox', 'tokenBox', 'panel'].forEach(function (x) { $(x).hidden = x !== id; }); }
  function msg(t, bad) { var m = $('msg'); m.textContent = t; m.className = bad ? 'bad' : 'ok'; m.hidden = !t; }
  function markDirty() { dirty = true; $('saveBtn').disabled = false; }

  function api(path, method, body) {
    var url = 'https://api.github.com/repos/' + CFG.owner + '/' + CFG.repo + '/contents/' + path;
    if (!method || method === 'GET') url += '?ref=' + CFG.branch + '&t=' + Date.now();
    return fetch(url, {
      method: method || 'GET',
      headers: { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' },
      body: body ? JSON.stringify(body) : undefined
    }).then(function (r) {
      if (!r.ok) { var e = new Error('HTTP ' + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }
  function explain(e) {
    if (e.status === 401 || e.status === 403) return 'التوكن غلط أو منتهي أو مالوش صلاحية كتابة على الريبو.';
    if (e.status === 404) return 'الريبو أو الفرع مش موجود. راجع الإعدادات في أول ملف admin.js.';
    if (e.status === 409 || e.status === 422) return 'حصل تعارض في الحفظ. حدّث الصفحة وجرّب تاني.';
    return 'حصلت مشكلة في الاتصال. جرّب تاني.';
  }

  /* ---- login ---- */
  $('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    if ($('pw').value === CFG.password) {
      sessionStorage.setItem('bardisi_ok', '1');
      start();
    } else { $('loginErr').hidden = false; }
  });
  $('tokenForm').addEventListener('submit', function (e) {
    e.preventDefault();
    token = $('tk').value.trim();
    localStorage.setItem(TOKEN_KEY, token);
    start();
  });
  $('logout').addEventListener('click', function () {
    sessionStorage.removeItem('bardisi_ok');
    localStorage.removeItem(TOKEN_KEY);
    location.reload();
  });

  function start() {
    if (sessionStorage.getItem('bardisi_ok') !== '1') return show('loginBox');
    if (!token) return show('tokenBox');
    show('panel');
    msg('بنحمّل المنيو...');
    api('data/menu.json').then(function (f) {
      sha = f.sha;
      data = JSON.parse(dec(f.content));
      msg('');
      render();
    }).catch(function (e) {
      if (e.status === 404) { sha = null; msg(''); render(); }
      else { msg(explain(e), true); if (e.status === 401) { localStorage.removeItem(TOKEN_KEY); token = ''; } }
    });
  }

  /* ---- render ---- */
  function render() {
    $('cats').innerHTML = data.categories.map(function (c, i) {
      return '<div class="row"><input data-k="cat" data-i="' + i + '" data-l="ar" value="' + esc(c.ar) + '" placeholder="اسم القسم بالعربي">' +
        '<input data-k="cat" data-i="' + i + '" data-l="en" value="' + esc(c.en) + '" placeholder="Category (English)" dir="ltr">' +
        '<button class="ghost" data-del-cat="' + i + '">حذف</button></div>';
    }).join('');

    var opts = data.categories.map(function (c) { return [c.id, c.ar]; });
    $('items').innerHTML = data.items.map(function (it, i) {
      var img = previews[it.image] || it.image;
      var sel = opts.map(function (o) {
        return '<option value="' + esc(o[0]) + '"' + (o[0] === it.cat ? ' selected' : '') + '>' + esc(o[1]) + '</option>';
      }).join('');
      return '<article class="item">' +
        '<div class="pic">' + (img ? '<img src="' + esc(img) + '" alt="">' : '<span>بدون صورة</span>') +
        '<label class="upl">' + (img ? 'غيّر الصورة' : 'ارفع صورة') + '<input type="file" accept="image/*" data-up="' + i + '" hidden></label></div>' +
        '<div class="f">' +
        '<input data-k="it" data-i="' + i + '" data-f="ar.name" value="' + esc(it.ar.name) + '" placeholder="اسم الطبق">' +
        '<input data-k="it" data-i="' + i + '" data-f="en.name" value="' + esc(it.en.name) + '" placeholder="Dish name (English)" dir="ltr">' +
        '<textarea data-k="it" data-i="' + i + '" data-f="ar.desc" placeholder="الوصف">' + esc(it.ar.desc) + '</textarea>' +
        '<textarea data-k="it" data-i="' + i + '" data-f="en.desc" placeholder="Description (English)" dir="ltr">' + esc(it.en.desc) + '</textarea>' +
        '<div class="row"><input type="number" min="0" step="1" data-k="it" data-i="' + i + '" data-f="price" value="' + esc(it.price) + '" placeholder="السعر (جنيه)">' +
        '<select data-k="it" data-i="' + i + '" data-f="cat">' + sel + '</select>' +
        '<button class="ghost" data-del-it="' + i + '">حذف الطبق</button></div></div></article>';
    }).join('') || '<p class="empty">مفيش أطباق. دوس "إضافة طبق" وابدأ.</p>';
  }

  /* ---- edit handlers ---- */
  document.addEventListener('input', function (e) {
    var t = e.target, i = +t.getAttribute('data-i');
    if (t.getAttribute('data-k') === 'cat') { data.categories[i][t.getAttribute('data-l')] = t.value; markDirty(); }
    else if (t.getAttribute('data-k') === 'it') {
      var f = t.getAttribute('data-f'), it = data.items[i];
      if (f === 'price') it.price = t.value === '' ? null : Number(t.value);
      else if (f === 'cat') it.cat = t.value;
      else { var p = f.split('.'); it[p[0]][p[1]] = t.value; }
      markDirty();
    }
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.hasAttribute('data-up') && t.files[0]) {
      var i = +t.getAttribute('data-up');
      resize(t.files[0]).then(function (url) {
        var path = 'images/menu/' + data.items[i].id + '-' + Date.now() + '.jpg';
        pending[path] = url.split(',')[1];
        previews[path] = url;
        data.items[i].image = path;
        markDirty(); render();
      });
    }
  });
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.hasAttribute('data-del-it')) {
      if (confirm('تمسح الطبق ده؟')) { data.items.splice(+t.getAttribute('data-del-it'), 1); markDirty(); render(); }
    }
    if (t.hasAttribute('data-del-cat')) {
      var c = data.categories[+t.getAttribute('data-del-cat')];
      if (data.items.some(function (x) { return x.cat === c.id; })) return msg('انقل الأطباق اللي في القسم ده لقسم تاني الأول.', true);
      data.categories.splice(+t.getAttribute('data-del-cat'), 1); markDirty(); render();
    }
  });
  $('addCat').addEventListener('click', function () {
    data.categories.push({ id: 'c' + Date.now(), ar: '', en: '' }); markDirty(); render();
  });
  $('addItem').addEventListener('click', function () {
    if (!data.categories.length) return msg('ضيف قسم الأول.', true);
    data.items.unshift({ id: 'd' + Date.now(), cat: data.categories[0].id, price: null, image: '', ar: { name: '', desc: '' }, en: { name: '', desc: '' } });
    markDirty(); render();
  });

  function resize(file) {
    return new Promise(function (res) {
      var img = new Image();
      img.onload = function () {
        var s = Math.min(1, 900 / img.width), c = document.createElement('canvas');
        c.width = Math.round(img.width * s); c.height = Math.round(img.height * s);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        res(c.toDataURL('image/jpeg', 0.82));
      };
      img.src = URL.createObjectURL(file);
    });
  }

  /* ---- save ---- */
  $('saveBtn').addEventListener('click', function () {
    var bad = data.items.some(function (i) { return !i.ar.name.trim(); }) ||
              data.categories.some(function (c) { return !c.ar.trim(); });
    if (bad) return msg('كل طبق وكل قسم لازم له اسم بالعربي.', true);
    var btn = $('saveBtn'); btn.disabled = true; msg('بنحفظ وننشر...');
    var used = {}; data.items.forEach(function (i) { used[i.image] = 1; });
    var paths = Object.keys(pending).filter(function (p) { return used[p]; });
    var chain = Promise.resolve();
    paths.forEach(function (p) {
      chain = chain.then(function () {
        return api(p, 'PUT', { message: 'Add menu image', content: pending[p], branch: CFG.branch });
      });
    });
    chain.then(function () {
      return api('data/menu.json', 'PUT', {
        message: 'Update menu', content: enc(JSON.stringify(data, null, 2)),
        sha: sha || undefined, branch: CFG.branch
      });
    }).then(function (r) {
      sha = r.content.sha; pending = {}; dirty = false;
      msg('اتحفظ. التعديل هيظهر للزوار بعد دقيقة أو اتنين.');
    }).catch(function (e) { btn.disabled = false; msg(explain(e), true); });
  });

  window.addEventListener('beforeunload', function (e) { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
  start();
})();
