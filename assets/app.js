/* Google Analytics 4 (G-Y7LH4PH5QB, поток «siberian.uk», решение Влада 13.10 — карточка B-46).
   Здесь, а не в HTML: app.js грузит каждая страница, а HTML трогать нельзя — волны статей
   (lendings/waves/apply.mjs) сверяют md5 страниц. Метрика стоит в HTML отдельно и от этого блока
   не зависит. Без cookie-баннера; сигналы Google и рекламная персонализация выключены.
   page_location — без query, кроме utm_*; один page_view на страницу (штатный, от config).
   На localhost и с диска не поднимаем — проверки не капают в боевую статистику. */
(function () {
  var id = 'G-Y7LH4PH5QB';
  var host = location.hostname;
  if (location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(host)) return;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  /* gtag.js разбирает только объект arguments, не массив */
  window.gtag = function () { window.dataLayer.push(arguments); };
  var utm = [];
  var q = location.search.replace(/^\?/, '').split('&');
  for (var i = 0; i < q.length; i++) if (/^utm_[^=]*=/.test(q[i])) utm.push(q[i]);
  window.gtag('js', new Date());
  window.gtag('config', id, {
    page_location: location.protocol + '//' + location.host + location.pathname + (utm.length ? '?' + utm.join('&') : ''),
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
  document.getElementsByTagName('head')[0].appendChild(s);
})();

/* Карточки «всплывают» в ленте, когда доходят до экрана. Браузер без
   IntersectionObserver (старый телефон, встроенный браузер приложения) получает
   всё сразу. Если скрипты выключены совсем, видимость возвращает <noscript>
   в <head> каждой страницы. */
(function () {
  var items = [].slice.call(document.querySelectorAll('.float'));

  function land(node) { node.classList ? node.classList.add('landed') : (node.className += ' landed'); }

  if (typeof IntersectionObserver === 'undefined') {
    items.forEach(land);
    return;
  }

  var watcher = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      land(e.target);
      watcher.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

  items.forEach(function (node) { watcher.observe(node); });
})();
