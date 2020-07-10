'use strict';

(function () {
  var adForm = window.adForm.form;

  // activates the page
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var isActivePage = true;
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
    isActivePage = false;
  };

  // activates the page with a click
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.MOUSE_LEFT_BUTTON) {
      if (isActivePage) {
        activatePage();
      }
      getPinCoordinates(false);
    }
  });

  // activates the page from the keyboard
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.Key.ENTER) {
      if (isActivePage) {
        activatePage();
      }
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
    window.card.onCardOpen(filterAds);
  };

  // receives select with housing type
  var filterForm = document.querySelector('.map__filters');
  var housingType = filterForm.querySelector('#housing-type');
  var housingTypeValue = '';

  var mapHousingTypeToValue = {
    // any: 'any',
    palace: 'palace',
    flat: 'flat',
    house: 'house',
    bungalo: 'bungalo',
  };

  // sets the housing type filter
  housingType.addEventListener('change', function () {
    housingTypeValue = housingType.value;
    var newAds = [];

    ads.forEach(function (itemAd) {
      var mapHousingType = mapHousingTypeToValue[itemAd.offer.type];

      // set the any housing type
      if (housingTypeValue === window.const.ANY_HOUSING) {
        newAds.push(itemAd);
      }
      if (housingTypeValue === mapHousingType) {
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
    window.card.onCardOpen(filterAds);
  });

  // gets a block to insert messages
  var main = document.querySelector('main');

  // gets a success message template
  var successMessage = document.querySelector('#success')
    .content
    .querySelector('.success');

  // gets a error message template
  var successError = document.querySelector('#error')
    .content
    .querySelector('.error');

  // successful form submission
  var onFormLoad = function () {
    renderMessage(successMessage);

    // message close handlers
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.const.Key.ESCAPE) {
        var child = main.querySelector('.success');
        if (child) {
          child.parentElement.removeChild(child);
        }
      }
    });

    var successBlock = main.querySelector('.success');
    successBlock.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.success')) {
        successBlock.parentElement.removeChild(successBlock);
      }
    });
  };

  // error form submission
  var onFormError = function () {
    renderMessage(successError);

    // message close handlers
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.const.Key.ESCAPE) {
        var child = main.querySelector('.error');
        if (child) {
          child.parentElement.removeChild(child);
        }
      }
    });

    var errorBlock = main.querySelector('.error');
    errorBlock.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.error') || evt.target.matches('.error__button')) {
        errorBlock.parentElement.removeChild(errorBlock);
      }
    });
  };

  // creates an ad label
  var renderMessage = function (message) {
    var messageBlock = message.cloneNode(true);
    main.appendChild(messageBlock);
  };

  // sends an ad form
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onFormLoad, onFormError);
  });


  window.card.closeCard();

})();
