'use strict';

// create ad cards
(function () {
  // get a block to insert an ad card
  var map = document.querySelector('.map');

  // get a card template for an ad card
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // get an element before which an ad card will be inserted
  var filtersContainer = document.querySelector('.map__filters-container');

  // get alias housing type
  var mapHousingTypeToAlias = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  // get alias features
  var mapFeaturesToAlias = {
    wifi: 'Wi-Fi',
    dishwasher: 'Посудомоечная машина',
    parking: 'Парковка',
    washer: 'Стиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер',
  };

  // create a feature element
  var createFeature = function (feature, featureContainer) {
    var featureElement = featureContainer.querySelector('.popup__feature--' + feature).cloneNode(true);
    featureElement.textContent = mapFeaturesToAlias[feature];
    return featureElement;
  };

  // render features in the card
  var renderFeatures = function (features, featureContainer) {
    if (features.length === 0) {
      featureContainer.remove();
      return;
    }

    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      fragment.appendChild(createFeature(feature, featureContainer));
    });

    // clean a feature container
    featureContainer.innerHTML = '';
    // insert photos into a container
    featureContainer.appendChild(fragment);
  };

  // create a photo element
  var createPhoto = function (photo, photoContainer) {
    var photoElement = photoContainer.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = photo;
    return photoElement;
  };

  // render photos in the card
  var renderPhotos = function (photos, photoContainer) {
    if (photos.length === 0) {
      photoContainer.remove();
      return;
    }

    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      fragment.appendChild(createPhoto(photo, photoContainer));
    });

    // clean a photo container
    photoContainer.innerHTML = '';
    // insert photos into a container
    photoContainer.appendChild(fragment);
  };

  // create an ad card
  var createCard = function (ad) {
    // fill in an ad card template
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    var housingType = mapHousingTypeToAlias[ad.offer.type];
    cardElement.querySelector('.popup__type').textContent = housingType;

    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var featureContainer = cardElement.querySelector('.popup__features');
    renderFeatures(ad.offer.features, featureContainer);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var photoContainer = cardElement.querySelector('.popup__photos');
    renderPhotos(ad.offer.photos, photoContainer);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    addListeners(cardElement);

    return cardElement;
  };

  // a card closing handler by click
  var closeCard = function () {
    var card = document.querySelector('.map .map__card');
    if (card) {
      card.remove();
    }
    removeActivePin();
    document.removeEventListener('keydown', onDocumentPress);
  };

  // a card closing handler by Esc key
  var onDocumentPress = function (evt) {
    if (evt.key === window.const.Key.ESCAPE) {
      closeCard();
      document.removeEventListener('keydown', onDocumentPress);
    }
  };

  // add card close handlers
  var addListeners = function (cardElement) {
    var cardCloseButton = cardElement.querySelector('.map__card .popup__close');

    // add a mouse click handler
    cardCloseButton.addEventListener('click', function () {
      closeCard();
    });

    // add an Esc key handler
    document.addEventListener('keydown', onDocumentPress);
  };

  // display an ad card
  var renderCard = function (ad) {
    map.insertBefore(createCard(ad), filtersContainer);
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // open an ad card
  var onMapClick = function (evt) {
    // return if target isn't a pin
    if (!(evt.target.matches('.map__pin:not(.map__pin--main)') || evt.target.matches('.map__pin:not(.map__pin--main) img'))) {
      return;
    }

    // get active pin
    var activePin = evt.target.closest('.map__pin:not(.map__pin--main)');
    // get an ad title
    var adTitle = activePin.children[0].alt;

    // get an ad by an ad title
    var offer = window.ads.find(function (ad) {
      return ad.offer.title === adTitle;
    });

    closeCard();
    activePin.classList.add('map__pin--active');
    // render an ad card
    renderCard(offer);
  };

  // add a click handler on pin container
  var pinContainer = document.querySelector('.map__pins');
  pinContainer.addEventListener('click', onMapClick);


  window.card = {
    close: closeCard,
  };

})();
