'use strict';
var notices = [];
var mapWidth = document.querySelector('.map').clientWidth; // Находим размер окна

// Создание одного обьекта
var createNotice = function (avatar) {
  var adDescription = {
    author: {
      avatar: 'img/avatars/user0' + avatar + '.png'
    },
    offer: {
      title: 'заголовок предложения',
      address: 'left:' + (Math.round(Math.random() * (mapWidth)) - 31) + 'px; ' + 'top:' + (Math.round(Math.random() * 500 + 130) - 22) + 'px;',
      price: 350,
      type: 'palace',
      rooms: 2,
      guests: 3,
      checkin: '12:00',
      checkout: '13:00',
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'строка с описанием',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: Math.round(Math.random() * (mapWidth)),
      y: Math.round(Math.random() * 600 + 130),
    }
  };
  return adDescription;
};

// Создание массива обьектов
for (var i = 1; i <= 8; i++) {
  notices.push(createNotice(i));
}

document.querySelector('.map').classList.remove('map--faded');

// Находим блок куда будем вставлять элементы
var similarListElement = document.querySelector('.map__pins');
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

for (var n = 0; n < notices.length; n++) {
  fragment.appendChild(renderNotice(notices[n]));
}

similarListElement.appendChild(fragment);
