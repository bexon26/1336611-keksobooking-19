'use strict';
// Модуль load.js

var TIMEOUT = 10000;
var CODE_SUCCESS = 200;
var ERROR_MESSAGE_LEFT = 0;
var ERROR_MESSAGE_TOP = 0;

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODE_SUCCESS) {
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

    xhr.timeout = TIMEOUT; // 10s
    xhr.open('GET', URL);
    xhr.send();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = ERROR_MESSAGE_LEFT;
    node.style.right = ERROR_MESSAGE_TOP;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load = {
    load: load,
    errorHandler: errorHandler,
  };
})();

