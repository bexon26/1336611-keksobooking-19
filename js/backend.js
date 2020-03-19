'use strict';
// Модуль backend.js
const TIMEOUT = 10000;
const CODESUCCESS = 200;

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.save = function (data, onload, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onload(xhr.response);
      if (xhr.status === CODESUCCESS) {
        window.error.viewSucces();
      } else {
        window.error.viewError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

(function () {

  var URL = 'https://js.dump.academy/keksobooking/data';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CODESUCCESS) {
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


  const ERRORMESSAGELEFT = 0;
  const ERRORMESSAGETOP = 0;
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = ERRORMESSAGELEFT;
    node.style.right = ERRORMESSAGETOP;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load = {
    load: load,
    errorHandler: errorHandler,
  };
})();

