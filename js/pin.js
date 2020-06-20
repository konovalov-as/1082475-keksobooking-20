'use strict';

(function () {
  var ads = []; // массив похожих объявлений
  var mapPinsBox = document.querySelector('.map__pins'); // место для вставки меток объявлений
  var mapWidth = mapPinsBox.offsetWidth; // получает ширину карты

  // создает похожее объявление
  var getAd = function (ad) {
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
  for (var i = 0; i < window.const.QUANTITY_AD; i++) {
    var randomAvatar = 'img/avatars/user0' + (i + 1) + '.png';

    var randomNumber = window.util.getRandomNumber(1, window.const.WORDS.length - 1);
    var randomTitle = window.util.getRandomTitle(randomNumber);

    var randomPrice = window.util.getRandomNumber(1, 1000);
    var randomOfferType = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.OFFER_TYPES.length - 1), window.const.OFFER_TYPES);
    var randomRooms = window.util.getRandomNumber(1, 5);
    var randomGuests = window.util.getRandomNumber(1, 10);
    var randomCheckin = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.REGISTRATIONS.length - 1), window.const.REGISTRATIONS);
    var randomCheckout = window.util.getRandomElement(window.util.getRandomNumber(0, window.const.REGISTRATIONS.length - 1), window.const.REGISTRATIONS);

    randomNumber = window.util.getRandomNumber(0, window.const.FEATURES.length - 1);
    var randomFeatures = window.util.getRandomFeatures(randomNumber);

    var randomDescription = 'произвольная строк(а/и) подробным с описанием';

    randomNumber = window.util.getRandomNumber(0, window.const.QUANTITY_PHOTO);
    var randomPhotos = window.util.getPhotoPaths(randomNumber);

    var randomX = window.util.getRandomNumber(0, mapWidth);
    var randomY = window.util.getRandomNumber(window.const.TOP_BOUND_Y, window.const.BOTTOM_BOUND_Y);

    var randomAddress = randomX + ', ' + randomY;

    var newAd = getAd({
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
    mapPinElement.style.left = ad.location.x - window.const.PinSize.WIDTH / 2 + 'px';
    mapPinElement.style.top = ad.location.y - window.const.PinSize.HEIGHT + 'px';
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


  window.pin = {
    renderPins: renderPins,
    ads: ads,
  };

})();
