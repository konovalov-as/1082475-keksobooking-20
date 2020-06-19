'use strict';

(function () {

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var REGISTRATIONS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var WORDS = ['семь', 'раз', 'поешь', 'один', 'раз', 'поспи'];
  var QUANTITY_AD = 8;
  var QUANTITY_PHOTO = 5;
  var TOP_BOUND_Y = 130;
  var BOTTOM_BOUND_Y = 630;
  var ENTER_KEY = 'Enter';
  var MOUSE_LEFT_BUTTON = 0;
  var PinSize = {
    SIDE_LENGTH: 65,
    WIDTH: 50,
    HEIGHT: 70,
  };


  // получает случайное число
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // максимум и минимум включаются
  };

  // получает случайные данные
  var getRandomElement = function (randomIndex, items) {
    return items[randomIndex];
  };

  // получает случайный заголовок для аватарки
  var getRandomTitle = function (randomNumber) {
    var randomTitle = '';
    for (var l = 0; l < randomNumber; l++) {
      var randomIndex = getRandomNumber(0, WORDS.length - 1);
      randomTitle += WORDS[randomIndex] + ' ';
    }
    return randomTitle;
  };

  // получает массив строк случайной длины features
  var getRandomFeatures = function (randomNumber) {
    var randomFeatures = [];
    for (var j = 0; j < randomNumber; j++) {
      var randomIndex = getRandomNumber(0, FEATURES.length - 1);
      if (!randomFeatures.includes(FEATURES[randomIndex])) {
        randomFeatures.push(FEATURES[randomIndex]);
      }
    }
    return randomFeatures;
  };

  // получает адреса фотографий
  var getPhotoPaths = function (randomNumber) {
    var randomPhotos = [];
    for (var k = 0; k < randomNumber; k++) {
      randomPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
    }
    return randomPhotos;
  };

  var ads = []; // массив похожих объявлений
  var mapPinsBox = document.querySelector('.map__pins'); // место для вставки меток объявлений
  var mapWidth = mapPinsBox.offsetWidth; // получает ширину карты

  // создает похожее объявление
  var getSimilarAd = function (ad) {
    var similarAd = {
      'author': {
        'avatar': ad.avatar,
      },
      'offer': {
        'title': ad.title,
        'address': ad.address,
        'price': ad.price,
        'type': ad.type,
        'rooms': ad.rooms,
        'guests': ad.guests,
        'checkin': ad.checkin,
        'checkout': ad.checkout,
        'features': ad.features,
        'description': ad.description,
        'photos': ad.photos,
      },
      'location': {
        'x': ad.locationX,
        'y': ad.locationY,
      },
    };
    return similarAd;
  };

  // создает нужное количество похожих объявлений
  for (var i = 0; i < QUANTITY_AD; i++) {
    var randomAvatar = 'img/avatars/user0' + (i + 1) + '.png';

    var randomNumber = getRandomNumber(1, WORDS.length - 1);
    var randomTitle = getRandomTitle(randomNumber);

    var randomPrice = getRandomNumber(1, 1000);
    var randomOfferType = getRandomElement(getRandomNumber(0, OFFER_TYPES.length - 1), OFFER_TYPES);
    var randomRooms = getRandomNumber(1, 5);
    var randomGuests = getRandomNumber(1, 10);
    var randomCheckin = getRandomElement(getRandomNumber(0, REGISTRATIONS.length - 1), REGISTRATIONS);
    var randomCheckout = getRandomElement(getRandomNumber(0, REGISTRATIONS.length - 1), REGISTRATIONS);

    randomNumber = getRandomNumber(0, FEATURES.length - 1);
    var randomFeatures = getRandomFeatures(randomNumber);

    var randomDescription = 'произвольная строк(а/и) подробным с описанием';

    randomNumber = getRandomNumber(0, QUANTITY_PHOTO);
    var randomPhotos = getPhotoPaths(randomNumber);

    var randomX = getRandomNumber(0, mapWidth);
    var randomY = getRandomNumber(TOP_BOUND_Y, BOTTOM_BOUND_Y);

    var randomAddress = randomX + ', ' + randomY;

    var newAd = getSimilarAd({
      avatar: randomAvatar,
      title: randomTitle,
      address: randomAddress,
      price: randomPrice,
      type: randomOfferType,
      rooms: randomRooms,
      guests: randomGuests,
      checkin: randomCheckin,
      checkout: randomCheckout,
      features: randomFeatures,
      description: randomDescription,
      photos: randomPhotos,
      locationX: randomX,
      locationY: randomY,
    });
    ads.push(newAd);
  }

  // получает шаблон метки для похожего объявленья
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // заполняет метку похожего объявления
  var createPin = function (ad) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = ad.location.x - PinSize.WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - PinSize.HEIGHT + 'px';
    mapPinElement.querySelector('img').src = ad.author.avatar;
    mapPinElement.querySelector('img').alt = ad.offer.title;
    return mapPinElement;
  };

  // выводит метки похожих объявлений на страницу
  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (Ad) {
      fragment.appendChild(createPin(Ad));
    });
    mapPinsBox.appendChild(fragment);
  };


  // создает карточку объявления

  // получает место для вставки карточки похожего объявления
  // var mapCard = document.querySelector('.map');
  // получает шаблон карточки для похожего объявленья
  // var mapCardTemplate = document.querySelector('#card')
  // .content
  // .querySelector('.map__card');
  // получает элемент, перед которым будет вставлена карточка похожего объявления
  // var mapFiltersContainer = document.querySelector('.map__filters-container');

  // получает алиас типа жилья
  // var getHousingType = function (offerType) {
  //   var housingType = '';
  //   switch (offerType) {
  //     case 'flat':
  //       housingType = 'Квартира';
  //       break;
  //     case 'bungalo':
  //       housingType = 'Бунгало';
  //       break;
  //     case 'house':
  //       housingType = 'Дом';
  //       break;
  //     case 'palace':
  //       housingType = 'Дворец';
  //       break;
  //   }
  //   return housingType;
  // };

  // получает алиас всех доступных удобств в объявлении
  // var getAllAvailableFeatures = function (offerFeatures, mapCardElement) {
  //   offerFeatures.forEach(function (itemFeature) {
  //     switch (itemFeature) {
  //       case 'wifi':
  //         mapCardElement.querySelector('.popup__feature--wifi').textContent = 'Wi-Fi';
  //         break;
  //       case 'dishwasher':
  //         mapCardElement.querySelector('.popup__feature--dishwasher').textContent = 'Посудомоечная машина';
  //         break;
  //       case 'parking':
  //         mapCardElement.querySelector('.popup__feature--parking').textContent = 'Парковка';
  //         break;
  //       case 'washer':
  //         mapCardElement.querySelector('.popup__feature--washer').textContent = 'Стиральная машина';
  //         break;
  //       case 'elevator':
  //         mapCardElement.querySelector('.popup__feature--elevator').textContent = 'Лифт';
  //         break;
  //       case 'conditioner':
  //         mapCardElement.querySelector('.popup__feature--conditioner').textContent = 'Кондиционер';
  //         break;
  //     }
  //   });

  //   var ulPopupFeatures = mapCardElement.querySelector('.popup__features');
  //   var featureChildren = ulPopupFeatures.children;

  //   if (offerFeatures.length === 0) {
  //     ulPopupFeatures.parentElement.removeChild(ulPopupFeatures);
  //   } else {
  //     for (var m = featureChildren.length - 1; m >= 0; m--) {
  //       var featureChild = featureChildren[m];
  //       if (featureChild.textContent === '') {
  //         featureChild.parentElement.removeChild(featureChild);
  //       }
  //     }
  //   }
  // };

  // создает фотографии в popup
  // var createPopupPhoto = function (itemPhoto, mapCardElement) {
  //   var popupPhoto = mapCardElement.querySelector('.popup__photo').cloneNode(true);
  //   popupPhoto.src = itemPhoto;
  //   return popupPhoto;
  // };

  // выводит фотографии в popup
  // var renderPopupPhotos = function (photos, mapCardElement) {
  //   var divPopupPhotos = mapCardElement.querySelector('.popup__photos');
  //   var imgPopupPhoto = mapCardElement.querySelector('.popup__photo');

  //   // получает блок для вставки фотографий
  //   var popupPhotos = mapCardElement.querySelector('.popup__photos');
  //   var fragment = document.createDocumentFragment();

  //   if (photos.length === 0 && divPopupPhotos && imgPopupPhoto) {
  //     divPopupPhotos.parentElement.removeChild(divPopupPhotos);
  //     imgPopupPhoto.parentElement.removeChild(imgPopupPhoto);
  //   } else {
  //     photos.forEach(function (itemPhoto) {
  //       fragment.appendChild(createPopupPhoto(itemPhoto, mapCardElement));
  //     });
  //   }
  //   popupPhotos.appendChild(fragment);
  // };

  // заполняет карточку похожего объявления
  // var createCard = function (similarAd) {
  //   var mapCardElement = mapCardTemplate.cloneNode(true);
  //   mapCardElement.querySelector('.popup__title').textContent = similarAd.offer.title;
  //   mapCardElement.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  //   mapCardElement.querySelector('.popup__text--price').textContent = similarAd.offer.price + '₽/ночь';

  //   var housingType = getHousingType(similarAd.offer.type);
  //   mapCardElement.querySelector('.popup__type').textContent = housingType;

  //   mapCardElement.querySelector('.popup__text--capacity').textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.rooms + ' гостей';
  //   mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;

  //   getAllAvailableFeatures(similarAd.offer.features, mapCardElement);

  //   mapCardElement.querySelector('.popup__description').textContent = similarAd.offer.description;

  //   renderPopupPhotos(similarAd.offer.photos, mapCardElement);

  //   mapCardElement.querySelector('.popup__avatar').src = similarAd.author.avatar;

  //   return mapCardElement;
  // };

  // выводит карточки похожих объявлений
  // var renderCards = function (similarAd) {
  //   var fragment = document.createDocumentFragment();
  //   fragment.appendChild(createCard(similarAd));
  //   mapCard.insertBefore(fragment, mapFiltersContainer);
  // };

  // var randomCard = getRandomNumber(0, similarAds.length - 1);
  // renderCards(similarAds[randomCard]);

  // форма с фильтрами
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // отключает элементы управления формы фильтра
  filterSelects.forEach(function (itemSelect) {
    itemSelect.setAttribute('disabled', 'disabled');
  });
  filterFieldset.setAttribute('disabled', 'disabled');

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
  var maxTitleLengtn = inputTitle.maxLength;

  inputTitle.addEventListener('input', function () {
    var valueLength = inputTitle.value.length;

    if (valueLength < minTitleLength) {
      inputTitle.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' символов');
      return;
    }
    if (valueLength > maxTitleLengtn) {
      inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLengtn) + ' символов');
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

  var minPrice = mapTypeToPrice[(selectType.value)];
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

  // количество комнат и гостей
  // проверяет количество комнат
  // var checkRoomNumber = function (roomNumber) {
  //   switch (roomNumber) {
  //     case '1':
  //       roomNumber = 1;
  //       break;
  //     case '2':
  //       roomNumber = 2;
  //       break;
  //     case '3':
  //       roomNumber = 3;
  //       break;
  //     case '100':
  //       roomNumber = 100;
  //       break;
  //   }
  //   return roomNumber;
  // };

  // проверяет количество гостей
  var checkCapacity = function (capacity) {
    if (capacity === 0) {
      return 100;
    }
    return +capacity;
    // switch (сapacity) {
    //   case '1':
    //     сapacity = 1;
    //     break;
    //   case '2':
    //     сapacity = 2;
    //     break;
    //   case '3':
    //     сapacity = 3;
    //     break;
    //   case '0':
    //     сapacity = 100;
    //     break;
    // }
    // return сapacity;
  };

  // устанавливает к выбору количество доступных гостей
  var setCapacity = function (roomNumber, capacity) {
    if (roomNumber === 100 & capacity !== 0) {
      selectCapacity.setCustomValidity('не для гостей');
    }
    if (roomNumber < capacity) {
      selectCapacity.setCustomValidity('1 комната для 1 гостя');
    }
    selectCapacity.setCustomValidity('');
    // switch (roomNumber) {
    //   case 1:
    //     if (!(roomNumber === capacity)) {
    //       selectCapacity.setCustomValidity('1 комната для 1 гостя');
    //     } else {
    //       selectCapacity.setCustomValidity('');
    //     }
    //     break;
    //   case 2:
    //     if (!(roomNumber >= capacity)) {
    //       selectCapacity.setCustomValidity('2 комнаты для 2 гостей или для 1 гостя');
    //     } else {
    //       selectCapacity.setCustomValidity('');
    //     }
    //     break;
    //   case 3:
    //     if (!(roomNumber >= capacity)) {
    //       selectCapacity.setCustomValidity('3 комнаты для 3 гостей, для 2 гостей или для 1 гостя');
    //     } else {
    //       selectCapacity.setCustomValidity('');
    //     }
    //     break;
    //   case 100:
    //     if (!(roomNumber === capacity)) {
    //       selectCapacity.setCustomValidity('не для гостей');
    //     } else {
    //       selectCapacity.setCustomValidity('');
    //     }
    // }
  };

  // выбирает количества комнат
  var roomNumber = +selectRoomNumber.value;
  var capacity = checkCapacity(selectCapacity.value);
  setCapacity(roomNumber, capacity);
  selectRoomNumber.addEventListener('change', function () {
    roomNumber = +selectRoomNumber.value;
    capacity = checkCapacity(selectCapacity.value);
    setCapacity(roomNumber, capacity);
  });

  // выбирает количества комнат
  roomNumber = +selectRoomNumber.value;
  capacity = checkCapacity(selectCapacity.value);
  selectCapacity.addEventListener('input', function () {
    roomNumber = +selectRoomNumber.value;
    capacity = checkCapacity(selectCapacity.value);
    setCapacity(roomNumber, capacity);
  });

  // отключает элементы управления формы объявлений
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormElements.forEach(function (itemFieldset) {
    itemFieldset.setAttribute('disabled', 'disabled');
  });

  // активирует страницу
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var activatePage = function () {
    // открывает карту объявлений
    map.classList.remove('map--faded');
    // рисует объявления на карте
    renderPins(ads);
    // включает элементы управления формы фильтра
    filterSelects.forEach(function (itemSelect) {
      itemSelect.removeAttribute('disabled');
    });
    filterFieldset.removeAttribute('disabled');
    // включает элементы управления формы объявлений
    adFormHeader.removeAttribute('disabled');
    adFormElements.forEach(function (itemFieldset) {
      itemFieldset.removeAttribute('disabled');
    });
    // убирает прозрачность формы
    adForm.classList.remove('ad-form--disabled');
    // устанавливает атрибут только для чтения поля адрес
    inputAddress.setAttribute('readonly', 'readonly');
  };

  // получает координаты метки
  var getPinCoordinates = function (isRoundPin) {
    var xLeft = mapPinMain.style.left;
    var yTop = mapPinMain.style.top;
    var x;
    var y;
    if (isRoundPin) {
      x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + PinSize.SIDE_LENGTH / 2);
      y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + PinSize.SIDE_LENGTH / 2);
    } else {
      x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + PinSize.WIDTH / 2);
      y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + PinSize.HEIGHT);
    }
    inputAddress.value = x + ', ' + y;
  };
  getPinCoordinates(true);

  // активирует страницу кликом
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === MOUSE_LEFT_BUTTON) {
      activatePage();
      getPinCoordinates(false);
    }
  });

  // активирует страницу с клавиатуры
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      activatePage();
      getPinCoordinates(false);
    }
  });

})();
