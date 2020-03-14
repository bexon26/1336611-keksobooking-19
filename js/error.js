'use strict';
// Модуль errorMessage.js
(function () {
  var similarErrorTemplate = document.querySelector('#error')
    .content;
  var similarSuccesTemplate = document.querySelector('#success')
  .content;

  var viewError = function () {
    var errorElement = similarErrorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');
    var fragmentError = document.createDocumentFragment();

    fragmentError.appendChild(errorElement);
    var mainContainer = document.querySelector('main');
    mainContainer.appendChild(fragmentError);

    var errorBlock = mainContainer.querySelector('.error');
    errorButton.addEventListener('click', function () {
      mainContainer.removeChild(errorBlock);
    });
    errorBlock.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        mainContainer.removeChild(errorBlock);
      }
    });
  };

  var viewSucces = function () {
    var successElement = similarSuccesTemplate.cloneNode(true);
    // var successButton = successElement.querySelector('.success__button');
    var fragmentSucces = document.createDocumentFragment();

    fragmentSucces.appendChild(successElement);
    var mainContainer = document.querySelector('main');
    mainContainer.appendChild(fragmentSucces);

    var successBlock = mainContainer.querySelector('.success');
    // successButton.addEventListener('click', function (evt) {
    //   successBlock.style.display = 'none';
    // });
    mainContainer.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        mainContainer.removeChild(successBlock);
      }
    });
    successBlock.addEventListener('click', function () {
      mainContainer.removeChild(successBlock);
    });
  };

  window.error = {
    viewError: viewError,
    viewSucces: viewSucces
  };
})();


// Отрисовка карточек

