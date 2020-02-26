'use strict';

// data.js модуль, который создаёт данные
// Создание одного обьекта
(function () {
  var notices = [];
  var mapWidth = document.querySelector('.map').clientWidth; // Находим размер окна
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
        rooms: 5,
        guests: 6,
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

  window.data = {
    notices: notices
  };
})();
