'use strict';

(function () {
  // block for inserting ad tags
  var mapPinsBox = document.querySelector('.map__pins');

  // gets label template for ad
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // creates an ad label
  var createPin = function (ad, index) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.setAttribute('data-index-ad', index);
    mapPinElement.style.left = ad.location.x - window.const.PinSize.SIDE_LENGTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.const.PinSize.HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;
    return mapPinElement;
  };

  // render tags on the page
  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (itemAd, indexAd) {
      fragment.appendChild(createPin(itemAd, indexAd));
    });
    mapPinsBox.appendChild(fragment);
    window.filterForm.turnOnFilter();
  };

  // // window.backend.save('sdsdfdfffffddddgdgf');

  window.pin = {
    renderPins: renderPins,
    mapPinsBox: mapPinsBox,
  };

})();
