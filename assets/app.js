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
