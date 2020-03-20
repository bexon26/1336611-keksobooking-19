'use strict';
 // move.js
(function () {
  const DOWN = 630;
  const TOP = 130;
  const HALFPINWIDTH = 32;
  const PINHEIGHT = 82;

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
      if ((pinMain.offsetTop - shift.y) > DOWN) {
        pinMain.style.top = '630px';
      } else if ((pinMain.offsetTop - shift.y) < TOP) {
        pinMain.style.top = '130px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      if ((pinMain.offsetLeft + HALFPINWIDTH - shift.x) >= map.offsetWidth) {
        pinLeftAsolute = (map.offsetWidth - HALFPINWIDTH);
        pinMain.style.left = pinLeftAsolute + 'px';

      } else if ((pinMain.offsetLeft - shift.x) < -HALFPINWIDTH) {
        pinMain.style.left = - HALFPINWIDTH + 'px';
        pinLeftAsolute = -HALFPINWIDTH;
      } else {
          pinLeftAsolute = pinMain.offsetLeft - shift.x;
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }
      formAddress.value = 'left:' + (pinLeftAsolute + HALFPINWIDTH) + '; ' + 'top:' + (pinMain.offsetTop - shift.y + PINHEIGHT) + ';';
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


