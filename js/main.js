'use strict';

(function () {
  // --------------- файл card.js ---------------
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
  // --------------- файл card.js ---------------

  // активирует страницу
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var activatePage = function () {
    // открывает карту объявлений
    map.classList.remove('map--faded');
    // рисует объявления на карте
    window.pin.renderPins();
    // включает элементы управления формы фильтра
    window.filterForm.filterSelects.forEach(function (itemSelect) {
      itemSelect.removeAttribute('disabled');
    });
    window.filterForm.filterFieldset.removeAttribute('disabled');
    // включает элементы управления формы объявлений
    window.adForm.adFormHeader.removeAttribute('disabled');
    window.adForm.adFormElements.forEach(function (itemFieldset) {
      itemFieldset.removeAttribute('disabled');
    });
    // убирает прозрачность формы
    window.adForm.form.classList.remove('ad-form--disabled');
    // устанавливает атрибут только для чтения поля адрес
    window.adForm.inputAddress.setAttribute('readonly', 'readonly');
  };

  // активирует страницу кликом
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.const.MOUSE_LEFT_BUTTON) {
      activatePage();
      getPinCoordinates(false);
    }
  });

  // активирует страницу с клавиатуры
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.const.ENTER_KEY) {
      activatePage();
      getPinCoordinates(false);
    }
  });

  // получает координаты метки
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

})();
