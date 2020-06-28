'use strict';

(function () {
  // activates the page
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var activatePage = function () {
    // opens a map with ads
    map.classList.remove('map--faded');

    // turns on ads form controls
    window.adForm.adFormHeader.removeAttribute('disabled');
    window.adForm.adFormElements.forEach(function (itemFieldset) {
      itemFieldset.removeAttribute('disabled');
    });
    // removes form transparency
    window.adForm.form.classList.remove('ad-form--disabled');
    // sets the read-only attribute of the address field
    window.adForm.inputAddress.setAttribute('readonly', 'readonly');

    window.backend.load(onLoad, onError);
  };

  // activates the page with a click
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.MOUSE_LEFT_BUTTON) {
      activatePage();
      getPinCoordinates(false);
    }
  });

  // activates the page from the keyboard
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.Key.ENTER) {
      activatePage();
      getPinCoordinates(false);
    }
  });

  // gets label coordinates
  var getPinCoordinates = function (isRoundPin) {
    var xLeft = mapPinMain.style.left;
    var yTop = mapPinMain.style.top;
    var halfPin = window.const.PinSize.SIDE_LENGTH / 2;
    var x;
    var y;

    x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + halfPin);
    y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + halfPin);

    if (!isRoundPin) {
      y += halfPin + window.const.PinSize.HEIGHT_PIN;
    }
    window.adForm.inputAddress.value = x + ', ' + y;
  };
  getPinCoordinates(true);

  var ads;
  // receives offers from the server
  var onLoad = function (offers) {
    ads = offers;
    updateAds();
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // displays the first five pins
  var PIN_COUNT = window.const.PIN_COUNT;
  var updateAds = function () {
    var filterAds = ads.slice(0, PIN_COUNT);
    window.pin.renderPins(filterAds);
    window.card.openCard(filterAds);
  };

  // receives select with housing type
  var housingType = window.filterForm.form.querySelector('#housing-type');
  var housingTypeValue = '';

  // sets the by housing type filter
  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    var newAds = [];

    ads.forEach(function (itemAd) {
      // set the any housing type
      if (housingTypeValue === window.const.ANY_HOUSING) {
        newAds.push(itemAd);
      }
      // set the selected housing type by user
      if (itemAd.offer.type === housingTypeValue) {
        newAds.push(itemAd);
      }
    });

    // receives block with pins
    var pinBox = window.pin.mapPinsBox;
    var pinBoxChildren = pinBox.querySelectorAll('.map__pin:not(.map__pin--main)');

    // deletes pins
    pinBoxChildren.forEach(function (itemPin) {
      var pinChild = itemPin;
      pinChild.parentElement.removeChild(pinChild);
    });

    // displays filtered pins
    var filterAds = newAds.slice(0, PIN_COUNT);
    window.pin.renderPins(filterAds);
    window.card.openCard(filterAds);
  });

})();
