'use strict';

(function () {
  // get a block for inserting ad tags
  var pinContainer = document.querySelector('.map__pins');

  // get a pin template for an ad
  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // create an ad pin
  var createPin = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - window.const.PinSize.SIDE_LENGTH / 2 + 'px';
    pinElement.style.top = ad.location.y - window.const.PinSize.HEIGHT + 'px';
    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = ad.offer.title;
    return pinElement;
  };

  // render pins on the page
  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(createPin(ad));
    });
    pinContainer.appendChild(fragment);
  };

  // delete pins
  var removePins = function () {
    var pins = pinContainer.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };


  window.pins = {
    render: renderPins,
    remove: removePins,
  };

})();
