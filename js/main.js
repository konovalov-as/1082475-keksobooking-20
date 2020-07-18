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

  // activate the page by a click
  mainPin.addEventListener('mousedown', function (evt) {
    if (!(evt.button === window.const.MOUSE_LEFT_BUTTON)) {
      return;
    }
    if (!isActivePage) {
      activatePage();
    }
    getPinCoordinates(false);
  });

  // activate the page by an Esc key
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


  // gets ads from the server
  // success callback for get offers from the server
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

  // display the first five pins
  var updateAds = function (ads) {
    var filterAds = ads.slice(0, window.const.PIN_COUNT);
    window.pins.render(filterAds);
    window.filterForm.turnOn();
  };


  // get a container to insert a popup
  var mainContainer = document.querySelector('main');

  // get a success popup template
  var successPopupTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  // get a error popup template
  var errorPopupTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  // error callback for get offers from the server
  var onError = function (errorMessage) {
    var popupElement = errorPopupTemplate.cloneNode(true);

    // get an error message from the server
    popupElement.querySelector('.error__message').textContent = errorMessage;

    // find a popup close button and add a close click
    var errorButton = popupElement.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      window.backend.load(onLoad, onError);
    });

    // insert a popup to a main container
    mainContainer.appendChild(popupElement);

    // call the function for adding popup close handlers
    var errorContainer = mainContainer.querySelector('.error');
    addListener(errorContainer);
  };


  // send an ad to the server
  var closePopupByKey = function (evt, popup) {
    if (!evt.key === window.const.Key.ESCAPE) {
      return;
    }
    if (popup) {
      popup.remove();
    }
  };

  // success callback for send an offer to the server
  var onFormSuccess = function () {
    renderPopup(successPopupTemplate);

    // close a popup by a click
    var successContainer = mainContainer.querySelector('.success');
    successContainer.addEventListener('click', function (evt) {
      if (!evt.target.matches('.success')) {
        return;
      }
      successContainer.remove();
      document.removeEventListener('keydown', onSuccessPopupPress);
    });

    // close a popup by an Esc key
    var onSuccessPopupPress = function (evt) {
      closePopupByKey(evt, successContainer);
      document.removeEventListener('keydown', onSuccessPopupPress);
    };

    // success popup close handler
    document.addEventListener('keydown', onSuccessPopupPress);

    deactivatePage();
  };

  // add popup close handlers
  var addListener = function (popup) {

    // close a popup by a click
    popup.addEventListener('click', function (evt) {
      if (!(evt.target.matches('.error') || evt.target.matches('.error__button'))) {
        return;
      }
      popup.remove();
      document.removeEventListener('keydown', onErrorPopupPress);
    });

    // close a popup by an Esc key
    var onErrorPopupPress = function (evt) {
      closePopupByKey(evt, popup);
      document.removeEventListener('keydown', onErrorPopupPress);
    };

    // error popup close handler
    document.addEventListener('keydown', onErrorPopupPress);
  };

  // error callback for send an offer to the server
  var onFormError = function () {
    renderPopup(errorPopupTemplate);

    // call the function for adding popup close handlers
    var errorContainer = mainContainer.querySelector('.error');
    addListener(errorContainer);
  };


  // create an ad label
  var renderPopup = function (popup) {
    var popupElement = popup.cloneNode(true);
    mainContainer.appendChild(popupElement);
  };

  // send an ad form
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onFormSuccess, onFormError);
  });

  // deactivate the page
  var deactivatePage = function () {
    // hide a map with ads
    map.classList.add('map--faded');

    // disable ad form controls
    window.adForm.turnOff();

    // disable filter form controls
    window.filterForm.turnOff();

    adForm.reset();

    window.imageLoad.removeEvents();

    inputAddress.value = PinСoordinate.LEFT + window.const.PinSize.SIDE_LENGTH / 2 + ', ' + (PinСoordinate.TOP + window.const.PinSize.SIDE_LENGTH / 2);

    mainPin.style.left = PinСoordinate.LEFT + window.const.CSS_UNITS;
    mainPin.style.top = PinСoordinate.TOP + window.const.CSS_UNITS;

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
