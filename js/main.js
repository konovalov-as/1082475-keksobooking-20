'use strict';

(function () {
  var PinСoordinate = {
    LEFT: 570,
    TOP: 375,
  };

  var adForm = document.querySelector('.ad-form');
  var inputAddress = adForm.querySelector('#address');

  // activate the page
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var isActivePage = false;
  var activatePage = function () {
    // open a map with ads
    map.classList.remove('map--faded');

    window.adForm.turnOn();

    window.backend.load(onLoad, onError);

    window.imageLoad.addEvents();

    isActivePage = true;
  };

  // activate the page with a click
  mainPin.addEventListener('mousedown', function (evt) {
    if (!(evt.button === window.const.MOUSE_LEFT_BUTTON)) {
      return;
    }
    if (!isActivePage) {
      activatePage();
    }
    getPinCoordinates(false);
  });

  // activate the page from the keyboard
  mainPin.addEventListener('keydown', function (evt) {
    if (!(evt.key === window.const.Key.ENTER)) {
      return;
    }
    if (!isActivePage) {
      activatePage();
    }
    getPinCoordinates(false);
  });

  // get a label coordinates
  var getPinCoordinates = function (isRoundPin) {
    var xLeft = mainPin.style.left;
    var yTop = mainPin.style.top;
    var halfPin = window.const.PinSize.SIDE_LENGTH / 2;
    var x;
    var y;

    x = Math.floor(parseInt(xLeft, 10) + halfPin);
    y = Math.floor(parseInt(yTop, 10) + halfPin);

    if (!isRoundPin) {
      y += halfPin + window.const.PinSize.HEIGHT_PIN;
    }
    inputAddress.value = x + ', ' + y;
  };
  getPinCoordinates(true);

  // get offers from the server
  var onLoad = function (ads) {
    var offers = [];

    ads.forEach(function (ad) {
      if (ad.offer) {
        offers.push(ad);
      }
    });

    window.ads = offers;
    updateAds(window.ads);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-message');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // display the first five pins
  var updateAds = function (ads) {
    var filterAds = ads.slice(0, window.const.PIN_COUNT);
    window.pins.render(filterAds);
    window.filterForm.turnOn();
  };

  // get a block to insert popup
  var mainContainer = document.querySelector('main');

  // get a success popup template
  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  // get a error popup template
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var closePopupByKey = function (evt, popup) {
    if (!evt.key === window.const.Key.ESCAPE) {
      return;
    }
    if (popup) {
      popup.remove();
    }
  };

  // successful form submission
  var onFormSuccess = function () {
    renderPopup(successPopupTemplate);

    var successContainer = mainContainer.querySelector('.success');
    successContainer.addEventListener('click', function (evt) {
      if (!evt.target.matches('.success')) {
        return;
      }
      successContainer.remove();
    });

    // success popup close handler
    document.addEventListener('keydown', function (evt) {
      closePopupByKey(evt, successContainer);
    });

    deactivatePage();
  };

  // error form submission
  var onFormError = function () {
    renderPopup(errorPopupTemplate);

    var errorContainer = mainContainer.querySelector('.error');
    errorContainer.addEventListener('click', function (evt) {
      if (!(evt.target.matches('.error') || evt.target.matches('.error__button'))) {
        return;
      }
      errorContainer.remove();
    });

    // error popup close handler
    document.addEventListener('keydown', function (evt) {
      closePopupByKey(evt, errorContainer);
    });
  };

  // create an ad label
  var renderPopup = function (popup) {
    var popupBlock = popup.cloneNode(true);
    mainContainer.appendChild(popupBlock);
  };

  // send an ad form
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onFormSuccess, onFormError);
  });

  var deactivatePage = function () {
    // close a map with ads
    map.classList.add('map--faded');

    // disable ad form controls
    window.adForm.turnOff();

    // disable filter form controls
    window.filterForm.turnOff();

    adForm.reset();

    window.imageLoad.removeEvents();

    inputAddress.value = PinСoordinate.LEFT + window.const.PinSize.SIDE_LENGTH / 2 + ', ' + (PinСoordinate.TOP + window.const.PinSize.SIDE_LENGTH / 2);

    mainPin.style.left = PinСoordinate.LEFT + 'px';
    mainPin.style.top = PinСoordinate.TOP + 'px';

    window.card.onCardCloseClick();

    window.pins.remove();

    isActivePage = false;

    window.adForm.validateRoom();
  };

  // reset an ad form
  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

})();
