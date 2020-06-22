'use strict';

(function () {
  var ads = []; // массив объявлений
  var mapPinsBox = document.querySelector('.map__pins'); // место для вставки меток объявлений

  // получает шаблон метки для объявленья
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // заполняет метку объявления
  var createPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - window.const.PinSize.SIDE_LENGTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.const.PinSize.HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;
    return mapPinElement;
  };

  // выводит меток на страницу
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (itemAd) {
      fragment.appendChild(createPin(itemAd));
    });
    mapPinsBox.appendChild(fragment);
  };

  // получает данные с сервера
  var onLoad = function (data) {
    ads = data;
  };
  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };


  window.backend.load(onLoad, onError);
  // window.backend.save('sdsdfdfffffddddgdgf');

  window.pin = {
    renderPins: renderPins,
  };

})();
