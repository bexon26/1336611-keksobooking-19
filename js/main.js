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
  noticeElement.style = 'left:' + notice.location.x + 'px; ' + 'top:' + notice.location.y + 'px;';
  var imgNotice = noticeElement.children[0];
  imgNotice.src = notice.author.avatar;
  imgNotice.alt = notice.offer.title;
  return noticeElement;
};

window.load(function (notices) {
  var fragment = document.createDocumentFragment();
  for (var n = 0; n < notices.length; n++) {
    fragment.appendChild(renderNotice(notices[n]));
  }
  similarListElement.appendChild(fragment);
}, errorHandler);


var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(window.card.renderСard(window.data.notices[0]));
var filtersContainer = similarCardListElement.querySelector('.map__filters-container');
filtersContainer.before(fragmentCard);

var errorHandler = function (errorMessage) {
  var node = document.createElement('div');
  node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  node.style.position = 'absolute';
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = '30px';

  node.textContent = errorMessage;
  document.body.insertAdjacentElement('afterbegin', node);
};


