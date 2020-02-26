'use strict';
// модуль map.js
// Находим блок куда будем вставлять пины
var similarListElement = document.querySelector('.map__pins');
// Находим блок куда будем вставлять блок с информацией
var similarCardListElement = document.querySelector('.map');
var similarNoticeTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');

// Фунция отрисовки одного объявления
var renderNotice = function (notice) {
  var noticeElement = similarNoticeTemplate.cloneNode(true);
  noticeElement.style = notice.offer.address;
  var imgNotice = noticeElement.children[0];
  imgNotice.src = notice.author.avatar;
  imgNotice.alt = notice.offer.title;
  return noticeElement;
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < window.data.notices.length; n++) {
  fragment.appendChild(renderNotice(window.data.notices[n]));
}

similarListElement.appendChild(fragment);

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(window.card.renderСard(window.data.notices[0]));
var filtersContainer = similarCardListElement.querySelector('.map__filters-container');
filtersContainer.before(fragmentCard);
