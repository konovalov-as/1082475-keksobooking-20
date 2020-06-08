'use strict';

var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var REGISTRATIONS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var WORDS = ['семь', 'раз', 'поешь', 'один', 'раз', 'поспи'];

// получаем случайное число
var getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // максимум и минимум включаются
};

// получаем случайные данные
var getRandomElement = function (randomIndex, arrays) {
  var randomElement = arrays[randomIndex];
  return randomElement;
};

// получаем случайный заголовок для аватарки
var getRandomTitle = function (randomNumber) {
  var randomTitle = '';
  for (var l = 0; l < randomNumber; l++) {
    var randomIndex = getRandomNumber(0, WORDS.length - 1);
    randomTitle += WORDS[randomIndex] + ' ';
  }
  return randomTitle;
};

// получаем массив строк случайной длины features
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

// получаем адреса фотографий
var getPhotoPaths = function (randomNumber) {
  var randomPhotos = [];
  for (var k = 0; k < randomNumber; k++) {
    randomPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
  }
  return randomPhotos;
};

var similarAds = []; // массив похожих объявлений
var mapPins = document.querySelector('.map__pins'); // место для вставки меток объявлений
var mapWidth = mapPins.offsetWidth; // получаем ширину карты

// создаем похожее объявление
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

// создаем нужное количество похожих объявлений
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

  randomNumber = getRandomNumber(0, 20);
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

// временное решение
var map = document.querySelector('.map');
if (map) {
  map.classList.remove('map--faded');
}

// получаем шаблон метки для похожего объявленья
var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// заполняем метку похожего объявления
var createMapPin = function (similarAd) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = similarAd.location.x - 25 + 'px';
  mapPinElement.style.top = similarAd.location.y - 70 + 'px';
  mapPinElement.querySelector('img').src = similarAd.author.avatar;
  mapPinElement.querySelector('img').alt = similarAd.offer.title;
  return mapPinElement;
};

// выводим метки похожих объявлений на страницу
var renderMapPins = function (similarAdsArr) {
  var fragment = document.createDocumentFragment();
  similarAdsArr.forEach(function (similarAd) {
    fragment.appendChild(createMapPin(similarAd));
  });
  mapPins.appendChild(fragment);
};
renderMapPins(similarAds);


// создаем карточку объявления

// место для вставки карточки похожего объявления
var mapCard = document.querySelector('.map');
// получаем шаблон карточки для похожего объявленья
var mapCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');
// элемент, перед которым будет вставлена карточка похожего объявления
var mapFiltersContainer = document.querySelector('.map__filters-container');

// получаем алиас типа жилья
var getHousingType = function (offerType) {
  var housingType = '';
  switch (offerType) {
    case 'flat':
      housingType = 'Квартира';
      break;
    case 'bungalo':
      housingType = 'Бунгало';
      break;
    case 'house':
      housingType = 'Дом';
      break;
    case 'palace':
      housingType = 'Дворец';
      break;
  }
  return housingType;
};

// получаем алиас всех доступных удобств в объявлении
var getAllAvailableFeatures = function (offerFeatures, mapCardElement) {
  offerFeatures.forEach(function (itemFeature) {
    switch (itemFeature) {
      case 'wifi':
        mapCardElement.querySelector('.popup__feature--wifi').textContent = 'Wi-Fi';
        break;
      case 'dishwasher':
        mapCardElement.querySelector('.popup__feature--dishwasher').textContent = 'Посудомоечная машина';
        break;
      case 'parking':
        mapCardElement.querySelector('.popup__feature--parking').textContent = 'Парковка';
        break;
      case 'washer':
        mapCardElement.querySelector('.popup__feature--washer').textContent = 'Стиральная машина';
        break;
      case 'elevator':
        mapCardElement.querySelector('.popup__feature--elevator').textContent = 'Лифт';
        break;
      case 'conditioner':
        mapCardElement.querySelector('.popup__feature--conditioner').textContent = 'Кондиционер';
        break;
    }
  });

  var ulPopupFeatures = mapCardElement.querySelector('.popup__features');
  var featureChildren = ulPopupFeatures.children;

  if (offerFeatures.length === 0) {
    ulPopupFeatures.parentElement.removeChild(ulPopupFeatures);
  } else {
    for (var m = featureChildren.length - 1; m >= 0; m--) {
      var featureChild = featureChildren[m];
      if (featureChild.textContent === '') {
        featureChild.parentElement.removeChild(featureChild);
      }
    }
  }
};

// создаем фотографии в popup
var createPopupPhoto = function (itemPhoto, mapCardElement) {
  console.log(itemPhoto);
  var popupPhoto = mapCardElement.querySelector('.popup__photo').cloneNode(true);
  popupPhoto.src = itemPhoto;
  return popupPhoto;
};

// выводим фотографии в popup
var renderPopupPhotos = function (photos, mapCardElement) {
  console.log(photos);
  var divPopupPhotos = mapCardElement.querySelector('.popup__photos');
  var imgPopupPhoto = mapCardElement.querySelector('.popup__photo');

  // получаем блок для вставки фотографий
  var popupPhotos = mapCardElement.querySelector('.popup__photos');
  var fragment = document.createDocumentFragment();

  if (photos.length === 0 && divPopupPhotos && imgPopupPhoto) {
    divPopupPhotos.parentElement.removeChild(divPopupPhotos);
    imgPopupPhoto.parentElement.removeChild(imgPopupPhoto);
  } else {
    photos.forEach(function (itemPhoto) {
      fragment.appendChild(createPopupPhoto(itemPhoto, mapCardElement));
    });
  }
  popupPhotos.appendChild(fragment);
};

// заполняем карточку похожего объявления
var createCard = function (similarAd) {
  var mapCardElement = mapCardTemplate.cloneNode(true);
  mapCardElement.querySelector('.popup__title').textContent = similarAd.offer.title;
  mapCardElement.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  mapCardElement.querySelector('.popup__text--price').textContent = similarAd.offer.price + '₽/ночь';

  var housingType = getHousingType(similarAd.offer.type);
  mapCardElement.querySelector('.popup__type').textContent = housingType;

  mapCardElement.querySelector('.popup__text--capacity').textContent = similarAd.offer.rooms + ' комнаты для ' + similarAd.offer.rooms + ' гостей';
  mapCardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarAd.offer.checkin + ', выезд до ' + similarAd.offer.checkout;

  getAllAvailableFeatures(similarAd.offer.features, mapCardElement);

  mapCardElement.querySelector('.popup__description').textContent = similarAd.offer.description;

  renderPopupPhotos(similarAd.offer.photos, mapCardElement);

  mapCardElement.querySelector('.popup__avatar').src = similarAd.author.avatar;

  return mapCardElement;
};

// выводим карточки похожих объявлений
var renderCards = function (similarAd) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCard(similarAd));
  mapCard.insertBefore(fragment, mapFiltersContainer);
};

var randomCard = getRandomNumber(0, similarAds.length - 1);
renderCards(similarAds[randomCard]);
