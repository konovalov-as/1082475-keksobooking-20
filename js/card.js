'use strict';

// creates ad cards
(function () {
  // gets a block to insert an ad card
  var cardBox = document.querySelector('.map');

  // gets a card template for an ad card
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // gets a element before which an ad card will be inserted
  var filtersContainer = document.querySelector('.map__filters-container');

  // gets alias housing type
  var mapHousingTypeToAlias = {
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  // gets alias features
  var mapFeaturesToAlias = {
    wifi: 'Wi-Fi',
    dishwasher: 'Посудомоечная машина',
    parking: 'Парковка',
    washer: 'Стиральная машина',
    elevator: 'Лифт',
    conditioner: 'Кондиционер',
  };

  // gets an alias of all available features in the ad
  var getAllAvailableFeatures = function (offerFeatures, cardElement) {
    offerFeatures.forEach(function (itemFeature) {
      switch (itemFeature) {
        case 'wifi':
          cardElement.querySelector('.popup__feature--wifi').textContent = mapFeaturesToAlias[itemFeature];
          break;
        case 'dishwasher':
          cardElement.querySelector('.popup__feature--dishwasher').textContent = mapFeaturesToAlias[itemFeature];
          break;
        case 'parking':
          cardElement.querySelector('.popup__feature--parking').textContent = mapFeaturesToAlias[itemFeature];
          break;
        case 'washer':
          cardElement.querySelector('.popup__feature--washer').textContent = mapFeaturesToAlias[itemFeature];
          break;
        case 'elevator':
          cardElement.querySelector('.popup__feature--elevator').textContent = mapFeaturesToAlias[itemFeature];
          break;
        case 'conditioner':
          cardElement.querySelector('.popup__feature--conditioner').textContent = mapFeaturesToAlias[itemFeature];
          break;
      }
    });

    var featureBox = cardElement.querySelector('.popup__features');
    var featureChildren = featureBox.children;

    if (offerFeatures.length === 0) {
      featureBox.parentElement.removeChild(featureBox);
    } else {
      for (var i = featureChildren.length - 1; i >= 0; i--) {
        var featureChild = featureChildren[i];
        if (featureChild.textContent === '') {
          featureChild.parentElement.removeChild(featureChild);
        }
      }
    }
  };

  // creates photos in popup
  var createPopupPhoto = function (itemPhoto, cardElement) {
    var popupPhoto = cardElement.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = itemPhoto;
    return popupPhoto;
  };

  // displays photos in popup
  var renderPopupPhotos = function (photos, cardElement) {
    // gets block to insert photos
    var popupPhotoBox = cardElement.querySelector('.popup__photos');

    var fragment = document.createDocumentFragment();
    photos.forEach(function (itemPhoto) {
      fragment.appendChild(createPopupPhoto(itemPhoto, cardElement));
    });

    // cleans a container for photos
    popupPhotoBox.textContent = '';
    // inserts photos into a container
    popupPhotoBox.appendChild(fragment);
  };

  // creates an ad card
  var createCard = function (ad, clientX, clientY) {
    // gets the window width
    var windowWidth = document.documentElement.clientWidth;

    // gets map width
    var mapWidth = window.pin.mapPinsBox.offsetWidth;
    var mapLetMargin = (windowWidth - mapWidth) / 2;

    // fills in an ad card template
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.style.left = clientX - mapLetMargin + 'px';
    cardElement.style.top = clientY + 'px';

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    var housingType = mapHousingTypeToAlias[ad.offer.type];
    cardElement.querySelector('.popup__type').textContent = housingType;

    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.rooms + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    getAllAvailableFeatures(ad.offer.features, cardElement);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    renderPopupPhotos(ad.offer.photos, cardElement);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  // displays ad cards
  var renderCards = function (ad, clientX, clientY) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(ad, clientX, clientY));
    cardBox.insertBefore(fragment, filtersContainer);
  };

  // opens an ad card
  var openCard = function (ads) {

    var pinBox = window.pin.mapPinsBox;

    // ad card opening handler
    var onPinPress = function (evt) {
      // selects only pins
      if (evt.target && evt.target.matches('button[type=button]')) {

        // gets an object index for an ad card
        var indexAd = parseInt(evt.target.attributes['data-index-ad'].value, 10);

        var clientX = '';
        var clientY = '';

        // only one ad card can be opened at the time
        if (cardBox.childElementCount === window.const.MAP_ELEMENT_CONT) {
          clientX = evt.clientX;
          clientY = evt.clientY;
          renderCards(ads[indexAd], clientX, clientY);
          closeCard();
        } else {
          var cardAd = document.querySelector('.map .map__card');
          cardAd.parentElement.removeChild(cardAd);
          clientX = evt.target.offsetLeft;
          clientY = evt.target.offsetLeft;
          renderCards(ads[indexAd], clientX, clientY);
          closeCard();
        }

      }
    };

    // adds a mouse click handler
    pinBox.addEventListener('click', onPinPress);

    // adds Enter key handler
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.const.Key.ENTER) {
        onPinPress(evt);
      }
    });

  };

  // closes an ad card
  var closeCard = function () {
    var closeCardButton = document.querySelector('.map__card .popup__close');

    // adds a mouse click handler
    closeCardButton.addEventListener('click', function () {
      var cardAd = document.querySelector('.map .map__card');
      cardAd.parentElement.removeChild(cardAd);
    });

    // adds Esc key handler
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.const.Key.ESCAPE) {
        var cardAd = document.querySelector('.map .map__card');
        if (cardAd !== null) {
          cardAd.parentElement.removeChild(cardAd);
        }
      }
    });

  };


  window.card = {
    openCard: openCard,
  };

})();
