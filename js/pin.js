'use strict';
// модуль pin.js

(function () {
  var MAXPINMAP = 5;
  // Находим блок куда будем вставлять пины
  var similarListElement = document.querySelector('.map__pins');
  // Находим блок куда будем вставлять блок с информацией
  var similarCardListElement = document.querySelector('.map');
  var similarNoticeTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

  // Загрузка данных
 var notices = [];
  window.load.load(function (data) {
    notices = data;
    for (var i = 0; i < notices.length; i++) {
      notices[i].id = i;
    }
  }, window.load.errorHandler);

  // Фунция отрисовки одного объявления
  var renderNotice = function (notice) {
    var noticeElement = similarNoticeTemplate.cloneNode(true);
    noticeElement.style = 'left:' + notice.location.x + 'px; ' + 'top:' + notice.location.y + 'px;';
    noticeElement.setAttribute('id', notice.id);
    var imgNotice = noticeElement.firstChild;
    imgNotice.src = notice.author.avatar;
    imgNotice.alt = notice.offer.title;
    noticeElement.setAttribute('tabindex', 0);
    return noticeElement;
  };

  // отрисовка пинов
  var viewPin = function (noticeArrays) {
    var fragment = document.createDocumentFragment();
    if (noticeArrays === undefined) {
      noticeArrays = notices;
    }
    noticeArrays = noticeArrays.filter(function (it){
      return it.offer;
    })
    for (var n = 0; n < noticeArrays.length && n < MAXPINMAP; n++) {
      fragment.appendChild(renderNotice(noticeArrays[n]));
    }
    similarListElement.appendChild(fragment);
  };

  // Отрисовка карточек
  window.viewCard = function (id) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(window.card.renderСard(notices[id]));
    var filtersContainer = similarCardListElement.querySelector('.map__filters-container');
    filtersContainer.before(fragmentCard);
  };

  var filterMap = function () {
    window.debounce(window.filter.updatePins(notices));
  };

  window.pin = {
    viewPin: viewPin,
    filterMap: () => window.debounce(filterMap),
  };

})();
