'use strict';

(function () {
  // форма с объявлениями
  var adForm = document.querySelector('.ad-form');
  var adFormHeader = adForm.querySelector('.ad-form-header');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');

  // поля формы с объявлениями
  var inputAddress = adForm.querySelector('#address');
  var inputTitle = adForm.querySelector('#title');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectCheckIn = adForm.querySelector('#timein');
  var selectCheckOut = adForm.querySelector('#timeout');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectCapacity = adForm.querySelector('#capacity');

  // валидация полей
  // заголовок объявления
  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
      return;
    }
    if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
      return;
    }
    if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
      return;
    }
    inputTitle.setCustomValidity('');
  });

  var minTitleLength = inputTitle.minLength;
  var maxTitleLength = inputTitle.maxLength;

  inputTitle.addEventListener('input', function () {
    var valueLength = inputTitle.value.length;

    if (valueLength < minTitleLength) {
      inputTitle.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' символов');
      return;
    }
    if (valueLength > maxTitleLength) {
      inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLength) + ' символов');
      return;
    }
    inputTitle.setCustomValidity('');
  });

  // цена за ночь
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

  // устанавливает минимальное значения поля и плейсхолдера 'цена за ночь'
  var setMinPrice = function (minPrice) {
    inputPrice.setAttribute('min', minPrice);
    inputPrice.setAttribute('placeholder', minPrice);
  };

  var minPrice = mapTypeToPrice[selectType.value];
  setMinPrice(minPrice);
  selectType.addEventListener('change', function () {
    minPrice = mapTypeToPrice[(selectType.value)];
    setMinPrice(minPrice);
  });

  // время заезда и время выезда
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

  // устанавливает к выбору количество доступных гостей
  var checkCapacity = function (roomNumber, capacity) {
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

  // проверяет количество комнат
  var validateRoom = function () {
    var roomNumber = selectRoomNumber.value;
    var capacity = selectCapacity.value;
    checkCapacity(roomNumber, capacity);
  };
  validateRoom();

  selectRoomNumber.addEventListener('invalid', function () {
    validateRoom();
  });

  selectRoomNumber.addEventListener('input', function () {
    validateRoom();
  });

  selectCapacity.addEventListener('invalid', function () {
    validateRoom();
  });

  selectCapacity.addEventListener('input', function () {
    validateRoom();
  });

  // отключает элементы управления формы объявлений
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormElements.forEach(function (itemFieldset) {
    itemFieldset.setAttribute('disabled', 'disabled');
  });


  window.adForm = {
    inputAddress: inputAddress,
    form: adForm,
    adFormHeader: adFormHeader,
    adFormElements: adFormElements,
  };

})();
