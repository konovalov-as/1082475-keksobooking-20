'use strict';

(function () {
  // ad form
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');

  // fields of ad form
  var inputAddress = adForm.querySelector('#address');
  var inputTitle = adForm.querySelector('#title');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectCheckIn = adForm.querySelector('#timein');
  var selectCheckOut = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  // fields validation
  // header ad
  var minTitleLength = inputTitle.minLength;
  var maxTitleLength = inputTitle.maxLength;

  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Пожалуйста, не меньше ' + minTitleLength);
      return;
    }
    if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Пожалуйста, не меньше ' + maxTitleLength);
      return;
    }
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
      return;
    }
    inputTitle.setCustomValidity('');
  });

  inputTitle.addEventListener('input', function () {
    var valueLength = inputTitle.value.length;

    if (valueLength < minTitleLength) {
      inputTitle.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' символ(ов/а)');
      return;
    }
    if (valueLength > maxTitleLength) {
      inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' символ(ов/а)');
      return;
    }
    inputTitle.setCustomValidity('');
  });

  // price for night
  var validatePrice = function () {
    if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
      return;
    }
    if (inputPrice.validity.badInput) {
      inputPrice.setCustomValidity('Пожалуйста, число');
      return;
    }
    if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity('Пожалуйста, не меньше ' + inputPrice.min);
      return;
    }
    if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity('Пожалуйста, не больше ' + inputPrice.max);
      return;
    }
    inputPrice.setCustomValidity('');
  };

  inputPrice.addEventListener('invalid', function () {
    validatePrice();
  });

  inputPrice.addEventListener('input', function () {
    validatePrice();
  });

  var mapTypeToPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000,
  };

  // sets the minimum field and placeholder 'price for night'
  var setMinPrice = function (minPrice) {
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };

  // when opening page
  var minPrice = mapTypeToPrice[selectType.value];
  setMinPrice(minPrice);

  // when changing the housing type
  selectType.addEventListener('change', function () {
    minPrice = mapTypeToPrice[selectType.value];
    setMinPrice(minPrice);
  });

  // checkin and checkout
  var changeCheckIn = function (checkIn) {
    selectCheckIn.value = checkIn;
  };
  var changeCheckOut = function (checkOut) {
    selectCheckOut.value = checkOut;
  };
  selectCheckIn.addEventListener('change', function () {
    changeCheckOut(selectCheckIn.value);
  });
  selectCheckOut.addEventListener('change', function () {
    changeCheckIn(selectCheckOut.value);
  });

  // checks the number of guests with the number of rooms
  var validateCapacity = function (roomNumber, capacity) {
    if (roomNumber === '100' & capacity !== '0') {
      selectCapacity.setCustomValidity('100 комнат не для гостей');
      return;
    }
    if (roomNumber !== '100' && capacity === '0') {
      selectCapacity.setCustomValidity('Комнаты не для гостей');
      return;
    }
    if (roomNumber === '1' && roomNumber < capacity) {
      selectCapacity.setCustomValidity('1 комната для 1 гостя');
      return;
    }
    if (roomNumber === '2' && roomNumber < capacity) {
      selectCapacity.setCustomValidity('2 комнаты для 2 гостей или для 1 гостя');
      return;
    }
    if (roomNumber === '3' && roomNumber < capacity) {
      selectCapacity.setCustomValidity('3 комнаты для 3 гостей, для 2 гостей или для 1 гостя');
      return;
    }
    selectCapacity.setCustomValidity('');
  };

  // checks the number of rooms
  var validateRoom = function () {
    var roomNumber = selectRoomNumber.value;
    var capacity = selectCapacity.value;
    validateCapacity(roomNumber, capacity);
  };
  validateRoom();

  selectRoomNumber.addEventListener('change', function () {
    validateRoom();
  });

  selectCapacity.addEventListener('change', function () {
    validateRoom();
  });

  // disables ad form controls
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormElements.forEach(function (itemFieldset) {
    itemFieldset.setAttribute('disabled', 'disabled');
  });


  window.adForm = {
    inputAddress: inputAddress,
    form: adForm,
    adFormHeader: adFormHeader,
    adFormElements: adFormElements,
    validateRoom: validateRoom,
  };

})();
