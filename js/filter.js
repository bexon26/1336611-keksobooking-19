'use strict';

(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapType = document.getElementById('housing-type');
  var mapPrice = document.getElementById('housing-price');
  var mapRooms = document.getElementById('housing-rooms');
  var mapGuests = document.getElementById('housing-guests');
  var mapFeatures = document.querySelector('.map__features');

  var typeHouse = 'any';
  var typePrice = 'any';
  var typeRooms = 'any';
  var typeGuest = 'any';
  var dataFilterTipes = [];
  var features = [];
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
      return it.offer.rooms === typeRooms;
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
      return it.offer.guests === typeGuest;
    });

    window.viewPin(sameGuestHouses);
  };

  mapType.addEventListener('change', function (evt) {
    window.filterMap('type', mapType.value);
  });
  mapPrice.addEventListener('change', function (evt) {
    window.filterMap('price', mapPrice.value);
  });
  mapRooms.addEventListener('change', function (evt) {
    window.filterMap('room', mapRooms.value);
  });
  mapGuests.addEventListener('change', function (evt) {
    window.filterMap('guest', mapGuests.value);
  });


  // mapFeatures.addEventListener('click', function (evt) {
  //   console.log('dfdf');
  //   var mapFeatureElements = document.querySelectorAll('.map__checkbox');
  //   for (var i = 0; i < mapFeatureElements; i++) {
  //     console.log('dfdf');
  //   }
    // features.push =
    // switch (card.offer.features[i]) {
    //   case 'wifi':
    //     var feature = cardElement.querySelector('.popup__feature--wifi');
    //     feature.classList.remove('visually-hidden');
    //     break;

    //   case 'dishwasher':
    //     var dishwasher = cardElement.querySelector('.popup__feature--dishwasher');
    //     dishwasher.classList.remove('visually-hidden');
    //     break;

    //   case 'parking':
    //     var parking = cardElement.querySelector('.popup__feature--dishwasher');
    //     parking.classList.remove('visually-hidden');
    //     break;

    //   case 'washer':
    //     var washer = cardElement.querySelector('.popup__feature--washer');
    //     washer.classList.remove('visually-hidden');
    //     break;

    //   case 'elevator':
    //     var elevator = cardElement.querySelector('.popup__feature--elevator');
    //     elevator.classList.remove('visually-hidden');
    //     break;

    //   case 'conditioner':
    //     var conditioner = cardElement.querySelector('.popup__feature--conditioner');
    //     conditioner.classList.remove('visually-hidden');
    //     break;
    //   default:
    //     break;
    // }

  //   window.filterMap('features', features);
  // });
  window.filter = {
    updatePins: updatePins,
  };

})();
