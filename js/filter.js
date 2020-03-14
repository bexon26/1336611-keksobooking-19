'use strict';


(function () {
  var mapFilters = document.querySelector('.map__filters');
  var mapType = document.getElementById('housing-type');
  var mapPrice = document.getElementById('housing-price');
  var mapRooms = document.getElementById('housing-rooms');
  var mapGuests = document.getElementById('housing-guests');
  var mapFeatures = document.getElementById('housing-features');

  var updatePins = function (notices, property, value) {
    console.log(notices);
    var mapPin = document.querySelector('.map__pins');
    var mapPins = mapPin.querySelectorAll('.map__pin');
    var mapPinMain = document.querySelector('.map__pin--main');

    for (var n = 0; n < mapPins.length; n++) {
      mapPin.removeChild(mapPins[n]);
    }
    mapPin.appendChild(mapPinMain);

    var sameTypeHouses = notices.filter(function (it) {
      if (property === 'type') {
        var typeHouse = value;
        if (value === 'any') {
          typeHouse = it.offer.type;
        }
      }
      return it.offer.type === typeHouse;
    });
    var samePriceHouses = notices.filter(function (it) {
      if (property === 'price') {
        switch (value) {
          case 'any':
            var typePrice = it.offer.price;
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

    window.viewPin(sameTypeHouses);
  };
  mapType.addEventListener('change', function (evt) {
    window.filterMap('type', mapType.value);

  });
  mapPrice.addEventListener('change', function (evt) {
    window.filterMap('price', mapPrice.value);
  });

  window.filter = {
    updatePins: updatePins,
  };

})();
