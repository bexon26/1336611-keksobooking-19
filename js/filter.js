'use strict';

(function () {

  var mapType = document.getElementById('housing-type');
  var mapPrice = document.getElementById('housing-price');
  var mapRooms = document.getElementById('housing-rooms');
  var mapGuests = document.getElementById('housing-guests');
  var mapFeatureForm = document.querySelector('.map__features');

  var typeHouse = 'any';
  var typePrice = 'any';
  var typeRooms = 'any';
  var typeGuest = 'any';
  var dataFilterTipes = [];

  dataFilterTipes = [{type: 'any'},
    {price: 'any'},
    {room: 'any'},
    {guest: 'any'},
    {features: []}];

  var updatePins = function (notices, property, value) {
    var mapPin = document.querySelector('.map__pins');
    var mapPins = mapPin.querySelectorAll('.map__pin');
    var mapPinMain = document.querySelector('.map__pin--main');

    window.form.closeCard();
    for (var n = 0; n < mapPins.length; n++) {
      mapPin.removeChild(mapPins[n]);
    }
    mapPin.appendChild(mapPinMain);

    var sameTypeHouses = notices.filter(function (it) {
      if (property === 'type') {
        typeHouse = value;
        if (value === 'any') {
          typeHouse = it.offer.type;
        }
        dataFilterTipes[0].type = value;
      } else if (dataFilterTipes[0].type === 'any') {
        typeHouse = it.offer.type;
      } else {
        typeHouse = dataFilterTipes[0].type;
      }
      return it.offer.type === typeHouse;
    });

    var samePriceHouses = sameTypeHouses.filter(function (it) {
      if (property === 'price') {
        switch (value) {
          case 'any':
            typePrice = it.offer.price;
            dataFilterTipes[1].price = 'any';
            break;
          case 'middle':
            dataFilterTipes[1].price = 'middle';
            return it.offer.price > 10000 && it.offer.price < 50000;
          case 'low':
            dataFilterTipes[1].price = 'low';
            return it.offer.price < 10000;
          case 'high':
            dataFilterTipes[1].price = 'high';
            return it.offer.price > 50000;
        }
      } else {
        switch (dataFilterTipes[1].price) {
          case 'any':
            typePrice = it.offer.price;
            break;
          case 'middle':
            return it.offer.price > 10000 && it.offer.price < 50000;
          case 'low':
            return it.offer.price < 10000;
          case 'high':
            return it.offer.price > 50000;
        }
      }
      return it.offer.price === typePrice;
    });

    var sameRoomsHouses = samePriceHouses.filter(function (it) {

      if (property === 'room') {
        typeRooms = value;
        if (value === 'any') {
          typeRooms = it.offer.rooms;
        }
        dataFilterTipes[2].room = value;
      } else if (dataFilterTipes[2].room === 'any') {
        typeRooms = it.offer.rooms;
      } else {
        typeRooms = dataFilterTipes[2].room;
      }
      return it.offer.rooms == typeRooms;
    });
    var sameGuestHouses = sameRoomsHouses.filter(function (it) {
      if (property === 'guest') {
        typeGuest = value;
        if (value === 'any') {
          typeGuest = it.offer.guests;
        } dataFilterTipes[3].guest = value;
      } else if (dataFilterTipes[3].guest === 'any') {
        typeGuest = it.offer.guests;
      } else {
        typeGuest = dataFilterTipes[3].guest;
      }
      return it.offer.guests == typeGuest;
    });

    var sameFilterHouses = sameGuestHouses.filter(function (it) {
      var countСoincidence = 0;
      var countFeature = 0;
      for (var j = 0; j < dataFilterTipes[4].features.length; j++) {
        if ((dataFilterTipes[4].features[j] !== '') && (dataFilterTipes[4].features[j] !== undefined)) {
          countFeature += 1;
          for (var i = 0; i < it.offer.features.length; i++) {
            if (dataFilterTipes[4].features[j] === it.offer.features[i]) {
              countСoincidence += 1;
            }
          }
        }
      }
      if (countFeature === countСoincidence) {
        return true;
      }
      return false;
    });
    window.viewPin(sameFilterHouses);
  };

  mapType.addEventListener('change', function () {
    window.filterMap('type', mapType.value);
  });
  mapPrice.addEventListener('change', function () {
    window.filterMap('price', mapPrice.value);
  });
  mapRooms.addEventListener('change', function () {
    window.filterMap('room', mapRooms.value);
  });
  mapGuests.addEventListener('change', function () {
    window.filterMap('guest', mapGuests.value);
  });

  mapFeatureForm.addEventListener('click', function (evt) {
    if (evt.target.matches('label')) {
      var selectCheckBox = document.getElementById(evt.target.getAttribute('for'));
      var nameCheckBox = selectCheckBox.getAttribute('value');
      if (selectCheckBox.checked === false) {
        switch (nameCheckBox) {
          case 'wifi':
            dataFilterTipes[4].features[0] = nameCheckBox;
            break;
          case 'dishwasher':
            dataFilterTipes[4].features[1] = (nameCheckBox);
            break;
          case 'parking':
            dataFilterTipes[4].features[2] = (nameCheckBox);
            break;
          case 'washer':
            dataFilterTipes[4].features[3] = (nameCheckBox);
            break;
          case 'elevator':
            dataFilterTipes[4].features[4] = (nameCheckBox);
            break;
          case 'conditioner':
            dataFilterTipes[4].features[5] = (nameCheckBox);
            break;
          default:
            break;
        }
      }
      if (selectCheckBox.checked === true) {
        switch (nameCheckBox) {
          case 'wifi':
            dataFilterTipes[4].features[0] = '';
            break;
          case 'dishwasher':
            dataFilterTipes[4].features[1] = '';
            break;
          case 'parking':
            dataFilterTipes[4].features[2] = '';
            break;
          case 'washer':
            dataFilterTipes[4].features[3] = '';
            break;
          case 'elevator':
            dataFilterTipes[4].features[4] = '';
            break;
          case 'conditioner':
            dataFilterTipes[4].features[5] = '';
            break;
          default:
            break;
        }
      }
      window.filterMap('features', dataFilterTipes[4].features);
    }
  });


  window.filter = {
    updatePins: updatePins,
  };
})();
