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


// Находим блок куда будем вставлять пины
var similarListElement = document.querySelector('.map__pins');
// Находим блок куда будем вставлять блок с информацией
var similarCardListElement = document.querySelector('.map');
var similarNoticeTemplate = document.querySelector('#pin')
     .content
     .querySelector('.map__pin');

var similarCardTemplate = document.querySelector('#card')
    .content;
// querySelector('.map__pin');

// Фунция отрисовки одного объявления
var renderNotice = function (notice) {
  var noticeElement = similarNoticeTemplate.cloneNode(true);
  noticeElement.style = notice.offer.address;
  var imgNotice = noticeElement.children[0];
  imgNotice.src = notice.author.avatar;
  imgNotice.alt = notice.offer.title;
  return noticeElement;
};

// Фунция отрисовки одной карточки
var renderСard = function (card) {
  var cardElement = similarCardTemplate.cloneNode(true);
  var title = cardElement.querySelector('.popup__title');
  if (card.offer.title) {
    title.textContent = card.offer.title;
  } else {
    title.classList.add('visually-hidden');
  }

  var address = cardElement.querySelector('.popup__text--address');
  if (card.offer.address) {
    address.textContent = card.offer.address;
  } else {
    address.classList.add('visually-hidden');
  }

  var price = cardElement.querySelector('.popup__text--price');
  if (card.offer.price) {
    price.textContent = card.offer.price + '₽/ночь';
  } else {
    price.classList.add('visually-hidden');
  }

  var type = cardElement.querySelector('.popup__type');
  if (card.offer.type) {
    type.textContent = defineType(card.offer.type);
  } else {
    type.classList.add('visually-hidden');
  }

  var colRoom = cardElement.querySelector('.popup__text--capacity');
  if (card.offer.rooms && card.offer.guests) {
    colRoom.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  } else {
    colRoom.classList.add('visually-hidden');
  }

  var time = cardElement.querySelector('.popup__text--time');
  if (card.offer.checkin && card.offer.checkout) {
    time.textContent = ' Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  } else {
    time.classList.add('visually-hidden');
  }

  // Отображение доступрых фичей
  var features = cardElement.querySelectorAll('.popup__feature');
  if (features.length) {
    for (var i = 0; i < features.length; i++) {
      features[i].classList.add('visually-hidden');
    }

    for (var i = 0; i < card.offer.features.length; i++) {
      switch (card.offer.features[i]) {
        case 'wifi':
          var feature = cardElement.querySelector('.popup__feature--wifi');
          feature.classList.remove('visually-hidden');
          break;

        case 'dishwasher':
          var dishwasher = cardElement.querySelector('.popup__feature--dishwasher');
          dishwasher.classList.remove('visually-hidden');
          break;

        case 'parking':
          var parking = cardElement.querySelector('.popup__feature--dishwasher');
          parking.classList.remove('visually-hidden');
          break;

        case 'washer':
          var washer = cardElement.querySelector('.popup__feature--washer');
          washer.classList.remove('visually-hidden');
          break;

        case 'elevator':
          var elevator = cardElement.querySelector('.popup__feature--elevator');
          elevator.classList.remove('visually-hidden');
          break;

        case 'conditioner':
          var conditioner = cardElement.querySelector('.popup__feature--conditioner');
          conditioner.classList.remove('visually-hidden');
          break;
        default:
          break;
      }
    }
  } else {
    features.classList.add('visually-hidden');
  }
  // Конец отображения доступрых фичей

  var description = cardElement.querySelector('.popup__description');
  if (card.offer.description) {
    description.textContent = card.offer.description;
  } else {
    description.classList.add('visually-hidden');
  }

  // Отображение фото
  var photos = cardElement.querySelector('.popup__photos');

  if (card.offer.photos.length) {
    for (var i = 0; i < card.offer.photos.length; i++) {
      if (!i) {
        photos.children[0].src = card.offer.photos[0];
      } else {
        var photo = photos.children[0].cloneNode(true);
        photo.src = card.offer.photos[i];
        photos.appendChild(photo);
      }
    }
  } else {
    photos.classList.add('visually-hidden');
  }

  var avatar = cardElement.querySelector('.popup__avatar');
  if (card.author.avatar) {
    avatar.textContent = card.author.avatar;
  } else {
    avatar.classList.add('visually-hidden');
  }

  return cardElement;
};

// Функция определения типа арендуемого помещения
var defineType = function (key) {
  var curentType;
  switch (key) {
    case 'flat':
      curentType = 'Квартира';
      break;

    case 'bungalo':
      curentType = 'Бунгало';
      break;

    case 'house':
      curentType = 'Дом';
      break;

    case 'palace':
      curentType = 'Дворец';
      break;

    default:
      break;
  }
  return curentType;
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < notices.length; n++) {
  fragment.appendChild(renderNotice(notices[n]));
}

similarListElement.appendChild(fragment);

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderСard(notices[0]));
var filtersContainer = similarCardListElement.querySelector('.map__filters-container');
filtersContainer.before(fragmentCard);

var mapPinMain = document.querySelector('.map__pin--main');
var topMain = Number(mapPinMain.style.top.slice(0, -2));
var leftMain = Number(mapPinMain.style.left.slice(0, -2));
var adForm = document.querySelector('.ad-form');
adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);

var removeFormDisabled = function () {
  document.querySelector('.map').classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    removeFormDisabled();
  }

});
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    removeFormDisabled();
  }
});

// Валидация

var formRoom = document.getElementById('room_number');
var formGuest = document.getElementById('capacity');

var validate = function () {
  if (formRoom.value === '100' && formGuest.value === '0') {
    formRoom.style.border = 'none';
    formGuest.style.border = 'none';
  } else if ((formRoom.value >= formGuest.value) && formGuest.value !== '0' && formRoom.value !== '100') {
    formRoom.style.border = 'none';
    formGuest.style.border = 'none';

  } else {
    formRoom.style.border = '2px solid red';
    formGuest.style.border = '2px solid red';
  }
};

formRoom.addEventListener('change', function () {
  validate();
});

formGuest.addEventListener('change', function () {
  validate();
});

adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

