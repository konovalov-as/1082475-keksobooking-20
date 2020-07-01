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
  var createPopupPhoto = function (itemPhoto, popupPhotoBox) {
    var popupPhoto = popupPhotoBox.querySelector('.popup__photo').cloneNode(true);
    popupPhoto.src = itemPhoto;
    return popupPhoto;
  };

  // displays photos in popup
  var renderPopupPhotos = function (photos, popupPhotoBox) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (itemPhoto) {
      fragment.appendChild(createPopupPhoto(itemPhoto, popupPhotoBox));
    });

    // cleans a container for photos
    popupPhotoBox.textContent = '';
    // inserts photos into a container
    popupPhotoBox.appendChild(fragment);
  };

  // creates an ad card
  var createCard = function (ad) {
    // fills in an ad card template
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';

    var housingType = mapHousingTypeToAlias[ad.offer.type];
    cardElement.querySelector('.popup__type').textContent = housingType;

    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.rooms + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    getAllAvailableFeatures(ad.offer.features, cardElement);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var popupPhotoBox = cardElement.querySelector('.popup__photos');
    renderPopupPhotos(ad.offer.photos, popupPhotoBox);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  // displays ad cards
  var renderCards = function (ad) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(createCard(ad));
    cardBox.insertBefore(fragment, filtersContainer);
  };

  // opens an ad card
  var onContainerPinPress = function (evt, ads) {
    // selects only pins
    if (evt.target && evt.target.matches('button[type=button]') || evt.target.matches('button[type=button] img')) {

      // gets an object index for an ad card
      var indexAd;
      var imgPath = '';

      // gets image path of avatar
      if (evt.target.matches('button[type=button]')) {
        imgPath = evt.target.children[0].attributes['src'].value;
      } else {
        imgPath = evt.target.attributes['src'].value;
      }

      // search of an object index for opening a card
      ads.forEach(function (itemAd, index) {
        if (itemAd.author.avatar === imgPath) {
          indexAd = index;
        }
      });

      // only one ad card can be opened at the time
      if (cardBox.childElementCount === window.const.MAP_ELEMENT_CONT) {
        renderCards(ads[indexAd]);
        addCardCloseHandler();
      } else {
        var cardAd = document.querySelector('.map .map__card');
        cardAd.parentElement.removeChild(cardAd);
        renderCards(ads[indexAd]);
        addCardCloseHandler();
      }

    }
  };

  // adds a card open handler
  var addCardOpenHandler = function (ads) {
    var pinBox = window.pin.mapPinsBox;

    // adds a mouse click handler
    pinBox.addEventListener('click', function (evt) {
      onContainerPinPress(evt, ads);
    });
  };

  // closes an ad card
  var closeCard = function () {
    var cardAd = document.querySelector('.map .map__card');
    if (cardAd) {
      cardAd.parentElement.removeChild(cardAd);
    }
  };

  // adds a card close handler
  var addCardCloseHandler = function () {
    var closeCardButton = document.querySelector('.map__card .popup__close');

    // adds a mouse click handler
    closeCardButton.addEventListener('click', closeCard);

    // adds Esc key handler
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.const.Key.ESCAPE) {
        closeCard();
      }
    });

  };


  window.card = {
    addCardOpenHandler: addCardOpenHandler,
    closeCard: closeCard,
  };

})();
