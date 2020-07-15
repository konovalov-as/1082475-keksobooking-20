'use strict';

(function () {
  var adForm = window.adForm.form;
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var inputAddress = adForm.querySelector('#address');

  // activates the page
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var isActivePage = true;
  var activatePage = function () {
    // opens a map with ads
    map.classList.remove('map--faded');

    // enable an ad form controls
    adFormHeader.removeAttribute('disabled');
    adFormElements.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
    // removes an ad form transparency
    adForm.classList.remove('ad-form--disabled');
    // sets the read-only attribute of the address field
    inputAddress.setAttribute('readonly', 'readonly');

    window.backend.load(onLoad, onError);

    window.imageLoad.addEvents();

    isActivePage = false;
  };

  // activates the page with a click
  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.MOUSE_LEFT_BUTTON) {
      if (isActivePage) {
        activatePage();
      }
      getPinCoordinates(false);
    }
  });

  // activates the page from the keyboard
  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.Key.ENTER) {
      if (isActivePage) {
        activatePage();
      }
      getPinCoordinates(false);
    }
  });

  // gets label coordinates
  var getPinCoordinates = function (isRoundPin) {
    var xLeft = mainPin.style.left;
    var yTop = mainPin.style.top;
    var halfPin = window.const.PinSize.SIDE_LENGTH / 2;
    var x;
    var y;

    x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + halfPin);
    y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + halfPin);

    if (!isRoundPin) {
      y += halfPin + window.const.PinSize.HEIGHT_PIN;
    }
    inputAddress.value = x + ', ' + y;
  };
  getPinCoordinates(true);

  // receives offers from the server
  var onLoad = function (offers) {
    window.ads = offers;
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
    var filterAds = window.ads.slice(0, PIN_COUNT);
    window.pins.render(filterAds);
    window.card.onCardOpen(filterAds);
  };

  // gets a block to insert messages
  var main = document.querySelector('main');

  // gets a success message template
  var successPopup = document.querySelector('#success')
    .content
    .querySelector('.success');

  // gets a error message template
  var errorPopup = document.querySelector('#error')
    .content
    .querySelector('.error');

  var closePopupByKey = function (evt, typePopup) {
    if (!evt.key === window.const.Key.ESCAPE) {
      return;
    }
    if (typePopup) {
      typePopup.remove();
    }
  };

  // successful form submission
  var onFormUpload = function () {
    renderMessage(successPopup);

    // success message close handler
    document.addEventListener('keydown', function (evt) {
      closePopupByKey(evt, successBlock);
    });

    var successBlock = main.querySelector('.success');
    successBlock.addEventListener('click', function (evt) {
      if (evt.target && evt.target.matches('.success')) {
        successBlock.remove();
      }
    });

    deactivatePage();
  };

  // error form submission
  var onFormError = function () {
    renderMessage(errorPopup);

    // error message close handler
    document.addEventListener('keydown', function (evt) {
      closePopupByKey(evt, errorBlock);
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
    window.backend.save(new FormData(adForm), onFormUpload, onFormError);
  });

  var deactivatePage = function () {
    // closes a map with ads
    map.classList.add('map--faded');

    // adds an ad form transparency
    adForm.classList.add('ad-form--disabled');

    // disables an ad form controls
    adFormHeader.setAttribute('disabled', '');
    adFormElements.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });

    // disables a filter form controls
    window.filterForm.turnOffFilter();

    adForm.reset();

    window.imageLoad.removeEvents();

    inputAddress.value = window.const.PinСoordinate.LEFT + window.const.PinSize.SIDE_LENGTH / 2 + ', ' + (window.const.PinСoordinate.TOP + window.const.PinSize.SIDE_LENGTH / 2);

    mainPin.style.left = window.const.PinСoordinate.LEFT + 'px';
    mainPin.style.top = window.const.PinСoordinate.TOP + 'px';

    window.card.closeCard();

    window.pins.remove();

    isActivePage = true;

    window.adForm.validateRoom();
  };

  // resets an ad form
  var resetButton = adForm.querySelector('.ad-form__reset');
  resetButton.addEventListener('click', function () {
    deactivatePage();
  });

})();
