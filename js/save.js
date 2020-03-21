'use strict';
// Модуль save.js

var CODE_SUCCESS = 200;

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  var save = function (data, onload) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onload(xhr.response);
      if (xhr.status === CODE_SUCCESS) {
        window.error.viewSucces();
      } else {
        window.error.viewError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.save = {
    save: save
  };
})();

