'use strict';

(function () {
  // move.js
  var map = document.querySelector('.map');
  var pinMain = map.querySelector('.map__pin--main');
  var formAddress = document.getElementById('address');
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,

        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var pinLeftAsolute;
      if ((pinMain.offsetTop - shift.y) > 630) {
        pinMain.style.top = '630px';
      } else if ((pinMain.offsetTop - shift.y) < 130) {
        pinMain.style.top = '130px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      if ((pinMain.offsetLeft + 31 - shift.x) >= map.offsetWidth) {
        pinMain.style.left = (map.offsetWidth - 31) + 'px';
      } else if ((pinMain.offsetLeft - shift.x) < -31) {
        pinMain.style.left = '-31px';
        pinLeftAsolute = -31;
      } else {
        pinLeftAsolute = pinMain.offsetLeft - shift.x;
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
      formAddress.value = 'left:' + (pinLeftAsolute + 31) + '; ' + 'top:' + (pinMain.offsetTop - shift.y) + ';';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


})();


