'use strict';

(function () {
  // form.js
  var adForm = document.querySelector('.ad-form');
  adForm.addEventListener('submit', function (evt) {
    window.save(new FormData(adForm), function () {
      document.querySelector('.map').classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
      adForm.reset();
    });
    evt.preventDefault();
  });

  var mapPinMain = document.querySelector('.map__pin--main');
  var topMain = Number(mapPinMain.style.top.slice(0, -2));
  var leftMain = Number(mapPinMain.style.left.slice(0, -2));
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

  // Функция добавления слушателя на новый элемент
  function addModEvent() {
    var map = document.querySelector('.map');
    map.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        closeCard();
      }
    });
    var closePopup = map.querySelector('.popup__close');
    closePopup.addEventListener('click', closeCard);
  }

  // Функция закрытия окна карточки
  var closeCard = function () {
    var pinListener = document.querySelector('.map__card');
    if (pinListener) {
      document.querySelector('.map').removeChild(pinListener);
    }
  };

  var filterChangeHandler = function (id) {
    // удалалени окна карточки
    closeCard();
    // показ новой карточки
    window.viewCard(id);
    addModEvent();
  };

  // Слушатель события на пине
  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('click', function (evt) {
    if (evt.target.matches('img')) {
      if (evt.target.parentElement.getAttribute('id')) {
        filterChangeHandler(evt.target.parentElement.getAttribute('id'));
      }
    }
    if (evt.target.matches('button')) {
      if (evt.target.id) {
        filterChangeHandler(evt.target.id);
      }
    }
  });

  window.form = {
    adForm: adForm,
    removeFormDisabled: removeFormDisabled,
  };
})();
