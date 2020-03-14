'use strict';
// Модуль backend.js


(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.save = function (data, onload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onload(xhr.response);
    });
    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };
})();

