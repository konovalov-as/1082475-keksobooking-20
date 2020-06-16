'use strict';

(function () {

  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var REGISTRATIONS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var WORDS = ['семь', 'раз', 'поешь', 'один', 'раз', 'поспи'];
  var ROUND_PIN_SIZE = 65;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  // получает случайное число
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // максимум и минимум включаются
  };

  // получает случайные данные
  var getRandomElement = function (randomIndex, arrays) {
    var randomElement = arrays[randomIndex];
    return randomElement;
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

  var similarAds = []; // массив похожих объявлений
  var mapPins = document.querySelector('.map__pins'); // место для вставки меток объявлений
  var mapWidth = mapPins.offsetWidth; // получает ширину карты

  // создает похожее объявление
  var getSimilarAd = function (property) {
    var similarAd = {
      'author': {
        'avatar': property.avatar,
      },
      'offer': {
        'title': property.title,
        'address': property.address,
        'price': property.price,
        'type': property.type,
        'rooms': property.rooms,
        'guests': property.guests,
        'checkin': property.checkin,
        'checkout': property.checkout,
        'features': property.features,
        'description': property.description,
        'photos': property.photos,
      },
      'location': {
        'x': property.locationX,
        'y': property.locationY,
      },
    };
    return similarAd;
  };

  // создает нужное количество похожих объявлений
  for (var i = 0; i < 8; i++) {
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

    randomNumber = getRandomNumber(0, 5);
    var randomPhotos = getPhotoPaths(randomNumber);

    var randomX = getRandomNumber(0, mapWidth);
    var randomY = getRandomNumber(130, 630);

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
    similarAds.push(newAd);
  }

  // получает шаблон метки для похожего объявленья
  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // заполняет метку похожего объявления
  var createMapPin = function (similarAd) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.style.left = similarAd.location.x - 25 + 'px';
    mapPinElement.style.top = similarAd.location.y - 70 + 'px';
    mapPinElement.querySelector('img').src = similarAd.author.avatar;
    mapPinElement.querySelector('img').alt = similarAd.offer.title;
    return mapPinElement;
  };

  // выводит метки похожих объявлений на страницу
  var renderMapPins = function (similarAdsArr) {
    var fragment = document.createDocumentFragment();
    similarAdsArr.forEach(function (similarAd) {
      fragment.appendChild(createMapPin(similarAd));
    });
    mapPins.appendChild(fragment);
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
  var mapFiltersForm = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFiltersForm.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersForm.querySelector('fieldset');
  // поля формы с фильтрами
  var selectHousingPrice = mapFiltersForm.querySelector('#housing-price');

  // отключает элементы управления формы фильтра
  mapFiltersSelect.forEach(function (itemSelect) {
    itemSelect.setAttribute('disabled', 'disabled');
  });
  mapFiltersFieldset.setAttribute('disabled', 'disabled');

  // форма с объявлениями
  var mapAdForm = document.querySelector('.ad-form');
  var adFormHeaderFieldset = mapAdForm.querySelector('.ad-form-header');
  var adFormElementFieldset = mapAdForm.querySelectorAll('.ad-form__element');
  // поля формы с объявлениями
  var inputAddress = mapAdForm.querySelector('#address');
  var inputTitle = mapAdForm.querySelector('#title');
  var inputPrice = mapAdForm.querySelector('#price');
  var selectType = mapAdForm.querySelector('#type');
  var selectCheckIn = mapAdForm.querySelector('#timein');
  var selectCheckOut = mapAdForm.querySelector('#timeout');
  var selectRoomNumber = mapAdForm.querySelector('#room_number');
  var selectCapacity = mapAdForm.querySelector('#capacity');

  // валидация полей
  // заголовок объявления
  inputTitle.addEventListener('invalid', function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  var minTitleLength = inputTitle.minLength;
  var maxTitleLengtn = inputTitle.maxLength;

  inputTitle.addEventListener('input', function () {
    var valueLength = inputTitle.value.length;

    if (valueLength < minTitleLength) {
      inputTitle.setCustomValidity('Ещё ' + (minTitleLength - valueLength) + ' символов');
    } else if (valueLength > maxTitleLengtn) {
      inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - maxTitleLengtn) + ' символов');
    } else {
      inputTitle.setCustomValidity('');
    }
  });

  // цена за ночь
  var validationPrice = function () {
    if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else if (inputPrice.validity.badInput) {
      inputPrice.setCustomValidity('Пожалуйста, число');
    } else if (inputPrice.validity.rangeUnderflow) {
      inputPrice.setCustomValidity('Пожалуйста, не меньше ' + inputPrice.min);
    } else {
      inputPrice.setCustomValidity('');
    }
  };

  inputPrice.addEventListener('invalid', function () {
    validationPrice();

  });
  inputPrice.addEventListener('input', function () {
    validationPrice();
  });

  // тип жилья
  // проверяет тип жилья
  var checkHousingType = function (housingType) {
    var type = '';
    switch (housingType) {
      case 'bungalo':
        type = 'bungalo';
        break;
      case 'flat':
        type = 'flat';
        break;
      case 'house':
        type = 'house';
        break;
      case 'palace':
        type = 'palace';
        break;
    }
    return type;
  };

  // получает минимальное значения поля 'цена за ночь'
  var getMinPrice = function (housingType) {
    var minPrice;
    switch (housingType) {
      case 'bungalo':
        minPrice = 0;
        setMinPrice(minPrice);
        break;
      case 'flat':
        minPrice = 1000;
        setMinPrice(minPrice);
        break;
      case 'house':
        minPrice = 5000;
        setMinPrice(minPrice);
        break;
      case 'palace':
        minPrice = 10000;
        setMinPrice(minPrice);
        break;
    }
    return minPrice;
  };

  // устанавливает минимальное значения поля 'цена за ночь'
  var setMinPrice = function (minPrice) {
    inputPrice.setAttribute('min', minPrice);
  };

  // устанавливает значение плейсхолдера
  var setHousingPrice = function (minPrice) {
    switch (minPrice) {
      case 0:
        selectHousingPrice.value = 'low';
        break;
      case 1000:
        selectHousingPrice.value = 'low';
        break;
      case 5000:
        selectHousingPrice.value = 'low';
        break;
      case 10000:
        selectHousingPrice.value = 'middle';
        break;
      default:
        selectHousingPrice.value = 'any';
    }
  };

  // изменяет минимальное значение цены и плейсхолдера
  if (selectType && selectHousingPrice) {
    var minPrice = getMinPrice(checkHousingType(selectType.value));
    setHousingPrice(minPrice);
    selectType.addEventListener('change', function () {
      minPrice = getMinPrice(checkHousingType(selectType.value));
      setHousingPrice(minPrice);
    });
  }

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
  var checkRoomNumber = function (roomNumber) {
    switch (roomNumber) {
      case '1':
        roomNumber = 1;
        break;
      case '2':
        roomNumber = 2;
        break;
      case '3':
        roomNumber = 3;
        break;
      case '100':
        roomNumber = 100;
        break;
    }
    return roomNumber;
  };

  // проверяет количество гостей
  var checkCapacity = function (сapacity) {
    switch (сapacity) {
      case '1':
        сapacity = 1;
        break;
      case '2':
        сapacity = 2;
        break;
      case '3':
        сapacity = 3;
        break;
      case '0':
        сapacity = 100;
        break;
    }
    return сapacity;
  };

  // устанавливает к выбору количество доступных гостей
  var setCapacity = function (roomNumber, сapacity) {
    switch (roomNumber) {
      case 1:
        if (!(roomNumber === сapacity)) {
          selectCapacity.setCustomValidity('1 комната для 1 гостя');
        } else {
          selectCapacity.setCustomValidity('');
        }
        break;
      case 2:
        if (!(roomNumber >= сapacity)) {
          selectCapacity.setCustomValidity('2 комнаты для 2 гостей или для 1 гостя');
        } else {
          selectCapacity.setCustomValidity('');
        }
        break;
      case 3:
        if (!(roomNumber >= сapacity)) {
          selectCapacity.setCustomValidity('3 комнаты для 3 гостей, для 2 гостей или для 1 гостя');
        } else {
          selectCapacity.setCustomValidity('');
        }
        break;
      case 100:
        if (!(roomNumber === сapacity)) {
          selectCapacity.setCustomValidity('не для гостей');
        } else {
          selectCapacity.setCustomValidity('');
        }
    }
  };

  // выбирает количества комнат
  var roomNumber = checkRoomNumber(selectRoomNumber.value);
  var сapacity = checkCapacity(selectCapacity.value);
  setCapacity(roomNumber, сapacity);
  selectRoomNumber.addEventListener('change', function () {
    roomNumber = checkRoomNumber(selectRoomNumber.value);
    сapacity = checkCapacity(selectCapacity.value);
    setCapacity(roomNumber, сapacity);
  });

  // выбирает количества комнат
  roomNumber = checkRoomNumber(selectRoomNumber.value);
  сapacity = checkCapacity(selectCapacity.value);
  selectCapacity.addEventListener('change', function () {
    roomNumber = checkRoomNumber(selectRoomNumber.value);
    сapacity = checkCapacity(selectCapacity.value);
    setCapacity(roomNumber, сapacity);
  });

  // отключает элементы управления формы объявлений
  adFormHeaderFieldset.setAttribute('disabled', 'disabled');
  adFormElementFieldset.forEach(function (itemFieldset) {
    itemFieldset.setAttribute('disabled', 'disabled');
  });

  // активирует страницу
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var activatePage = function () {
    // открывает карту объявлений
    map.classList.remove('map--faded');
    // рисует объявления на карте
    renderMapPins(similarAds);
    // включает элементы управления формы фильтра
    mapFiltersSelect.forEach(function (itemSelect) {
      itemSelect.removeAttribute('disabled');
    });
    mapFiltersFieldset.removeAttribute('disabled');
    // включает элементы управления формы объявлений
    adFormHeaderFieldset.removeAttribute('disabled');
    adFormElementFieldset.forEach(function (itemFieldset) {
      itemFieldset.removeAttribute('disabled');
    });
    // убирает прозрачность формы
    mapAdForm.classList.remove('ad-form--disabled');
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
      x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + ROUND_PIN_SIZE / 2);
      y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + ROUND_PIN_SIZE / 2);
    } else {
      x = Math.floor(parseInt(xLeft.substr(0, [xLeft.length - 2]), 10) + PIN_WIDTH / 2);
      y = Math.floor(parseInt(yTop.substr(0, [yTop.length - 2]), 10) + PIN_HEIGHT);
    }
    inputAddress.value = x + ', ' + y;
  };
  getPinCoordinates(true);

  // активирует страницу кликом
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (typeof evt === 'object') {
      if (evt.button === 0) {
        activatePage();
        getPinCoordinates(false);
      }
    }
  });

  // активирует страницу с клавиатуры
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activatePage();
      getPinCoordinates(false);
    }
  });

})();
