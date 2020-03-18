'use strict';

(function () {
  // form.js
  var adForm = document.querySelector('.ad-form');
  var fieldInputs = document.querySelectorAll('fieldset');

  var adFormReset = document.querySelector('.ad-form__reset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatureForm = document.querySelector('.map__features');
  var mapFeatures = mapFeatureForm.querySelectorAll('.map__checkbox');
  var mapPinMain = document.querySelector('.map__pin--main');
  var topMain = Number(mapPinMain.style.top.slice(0, -2));
  var leftMain = Number(mapPinMain.style.left.slice(0, -2));
  adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);

  var fieldPageSwitchOff = function () {
    fieldInputs.forEach(function (element) {
      element.setAttribute('disabled', false);
    });
    mapFilters.forEach(function (element) {
      element.setAttribute('disabled', false);
    });

  };
  fieldPageSwitchOff();

  var removeFormDisabled = function () {
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);
    fieldInputs.forEach(function (element) {
      element.removeAttribute('disabled');
    });
    mapFilters.forEach(function (element) {
      element.removeAttribute('disabled');
    });
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      removeFormDisabled();
      window.viewPin(window.notices);
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

  var pageReset = function () {

    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.filter.removePins();
    fieldPageSwitchOff();
    mapFeatures.forEach(function (element) {
      element.checked = false;
    });
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);
    closeCard();

  };

  var fieldReset = function () {
    adForm.reset();
    window.filter.removePins();
    window.viewPin(window.notices);
    mapFeatures.forEach(function (element) {
      element.checked = false;
    });
    mapPinMain.setAttribute('style', 'left: 570px; top: 375px;');
    adForm.querySelector('input[name="address"]').value = 'top: ' + (topMain + 70) + '; left: ' + (leftMain + 25);
    closeCard();
  };


  adForm.addEventListener('submit', function (evt) {
    window.save(new FormData(adForm), function () {
    });
    evt.preventDefault();
    pageReset();
  });

  adFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    fieldReset();
  });

  window.form = {
    adForm: adForm,
    removeFormDisabled: removeFormDisabled,
    closeCard: closeCard
  };
})();
