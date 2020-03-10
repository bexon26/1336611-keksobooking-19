'use strict';

(function () {
  // form.js
  var adForm = document.querySelector('.ad-form');
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

  var filterChangeHandler = function (evt) {
window.viewCard();
    if (evt.target && evt.target.matches('button')) {
      console.log('press');

    }
  }

  var mapPins = document.querySelector('.map__pins');
    mapPins.addEventListener('click', function (evt) {
      if (evt.target.matches('button')) {
      console.log('press');
    }
    });



  // Валидация

  var formRoom = document.getElementById('room_number');
  var formGuest = document.getElementById('capacity');

  var validate = function () {
    if (formRoom.value === '100' && formGuest.value === '0') {
      formRoom.style.border = 'none';
      formGuest.style.border = 'none';
      formRoom.setCustomValidity('');
    } else if ((formRoom.value >= formGuest.value) && formGuest.value !== '0' && formRoom.value !== '100') {
      formRoom.style.border = 'none';
      formGuest.style.border = 'none';
      formRoom.setCustomValidity('');
    } else {
      formRoom.style.border = '2px solid red';
      formGuest.style.border = '2px solid red';
      formRoom.setCustomValidity('Выберите правильное количество комнат');
    }
  };

  formRoom.addEventListener('change', function () {
    validate();
  });

  formGuest.addEventListener('change', function () {
    validate();
  });

  adForm.setAttribute('action', 'https://js.dump.academy/keksobooking');

})();
