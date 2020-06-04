'use strict';

var TYPE_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_OUT = ['12:00', '13:00', '14:00'];
var FRATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var WORDS = ['семь', 'раз', 'поешь', 'один', 'раз', 'поспи'];

// получаем случайное число
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // максимум и минимум включаются
}

// получаем длину массива
function getLengthArray(array) {
  return array.length;
}

// получаем случайные данные
function getRandomData(randomIndex, array) {
  var result = array[randomIndex];
  return result;
}

var similarAds = [];
var mapBlock = document.querySelector('.map__pins');
var mapWidth = mapBlock.offsetWidth;

// создаем массив объектов
var getSimilarAd = function (array, intValue) {
  for (var i = 0; i < intValue; i++) {
    var randomPrice = getRandomNumber(1, 1000);
    var randomTypeOffer = getRandomData(getRandomNumber(0, getLengthArray(TYPE_OFFER) - 1), TYPE_OFFER);
    var randomRooms = getRandomNumber(1, 5);
    var randomGuests = getRandomNumber(1, 10);
    var randomCheckin = getRandomData(getRandomNumber(0, getLengthArray(CHECKIN_OUT) - 1), CHECKIN_OUT);
    var randomCheckout = getRandomData(getRandomNumber(0, getLengthArray(CHECKIN_OUT) - 1), CHECKIN_OUT);

    // получаем массив строк случайной длины features
    var randomNumber = getRandomNumber(0, getLengthArray(FRATURES) - 1);
    var randomFeatures = [];
    for (var j = 0; j < randomNumber; j++) {
      var randomIndex = getRandomNumber(0, getLengthArray(FRATURES) - 1);
      if (!randomFeatures.includes(FRATURES[randomIndex])) {
        randomFeatures.push(FRATURES[randomIndex]);
      }
    }

    // получаем случайный заголовок для аватарки
    randomNumber = getRandomNumber(1, getLengthArray(WORDS) - 1);
    var randomTitle = '';
    for (var l = 0; l < randomNumber; l++) {
      randomIndex = getRandomNumber(0, getLengthArray(WORDS) - 1);
      randomTitle += WORDS[randomIndex] + ' ';
    }

    // получаем адреса фоторграфий
    randomNumber = getRandomNumber(0, 20);
    var photos = [];
    for (var k = 0; k < randomNumber; k++) {
      photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
    }

    var x = getRandomNumber(0, mapWidth);
    var y = getRandomNumber(130, 630);

    // заполняем объект
    array[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png',
      },
      'offer': {
        'title': randomTitle,
        'address': x.toString() + ', ' + y.toString(),
        'price': randomPrice,
        'type': randomTypeOffer,
        'rooms': randomRooms,
        'guests': randomGuests,
        'checkin': randomCheckin,
        'checkout': randomCheckout,
        'features': randomFeatures,
        'description': 'строка с описанием',
        'photos': photos,
      },
      'location': {
        'x': x,
        'y': y,
      },
    };
  }
  return array;
};
getSimilarAd(similarAds, 8);

var map = document.querySelector('.map');
if (map) {
  map.classList.remove('map--faded');
}

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

// заполняем блок персонажа
var renderMapPin = function (item) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.style.left = item.location.x - 25 + 'px';
  mapPinElement.style.top = item.location.y - 70 + 'px';
  mapPinElement.querySelector('img').src = item.author.avatar;
  mapPinElement.querySelector('img').alt = item.offer.title;
  return mapPinElement;
};

// вывод блок персонажа на страницу
var renderBloks = function (array) {
  var fragment = document.createDocumentFragment();
  array.forEach(function (item) {
    fragment.appendChild(renderMapPin(item));
  });
  mapBlock.appendChild(fragment);
};
renderBloks(similarAds);
