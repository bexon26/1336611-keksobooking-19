'use strict';
// Модуль errorMessage.js
(function () {
  var similarErrorTemplate = document.querySelector('#error')
    .content;


  var viewError = function () {
    var errorElement = similarErrorTemplate.cloneNode(true);
    var errorButton = errorElement.querySelector('.error__button');

    var fragmentError = document.createDocumentFragment();
    fragmentError.appendChild(errorElement);
    var mainContainer = document.querySelector('main');
    mainContainer.before(fragmentError);

    var errorBlock = document.querySelector('.error');
    errorButton.addEventListener('click', function (evt) {
      errorBlock.style.display = 'none';
    });
    mainContainer.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {

        errorBlock.style.display = 'none';
      }
    });


  };

  window.error = {
    viewError: viewError
  };
})();


// Отрисовка карточек

