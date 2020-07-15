'use strict';

(function () {
  // gets a block for inserting ad tags
  var pinBox = document.querySelector('.map__pins');

  // gets a pin template for an ad
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // creates an ad pin
  var createPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - window.const.PinSize.SIDE_LENGTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.const.PinSize.HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;
    return mapPinElement;
  };

  // renders pins on the page
  var render = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (itemAd, indexAd) {
      fragment.appendChild(createPin(itemAd, indexAd));
    });
    pinBox.appendChild(fragment);
    window.filterForm.turnOnFilter();
  };

  // deletes pins
  var remove = function () {
    var pins = pinBox.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (pin) {
      pin.remove();
    });
  };


  window.pins = {
    render: render,
    remove: remove,
  };

})();
