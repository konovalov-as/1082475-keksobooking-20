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
      cardElement.querySelector('.popup__feature--' + itemFeature).textContent = mapFeaturesToAlias[itemFeature];
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

    cardElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    getAllAvailableFeatures(ad.offer.features, cardElement);

    cardElement.querySelector('.popup__description').textContent = ad.offer.description;

    var popupPhotoBox = cardElement.querySelector('.popup__photos');
    renderPopupPhotos(ad.offer.photos, popupPhotoBox);

    cardElement.querySelector('.popup__avatar').src = ad.author.avatar;

    return cardElement;
  };

  // displays ad cards
  var renderCard = function (ad) {
    cardBox.insertBefore(createCard(ad), filtersContainer);
  };

  var removeActivePin = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  // opens an ad card
  var onContainerPinPress = function (evt, ads) {
    // selects only pins
    if (evt.target && evt.target.matches('.map__pin:not(.map__pin--main)') || evt.target.matches('.map__pin:not(.map__pin--main) img')) {

      // gets an ad title
      var adTitle = evt.target.alt;
      var activePin = evt.target;

      if (evt.target.matches('.map__pin:not(.map__pin--main)')) {
        adTitle = evt.target.children[0].alt;
      }

      // gets an object index for an ad card
      var indexAd = ads.findIndex(function (itemAd, index) {
        if (itemAd.offer.title === adTitle) {
          return index + 1;
        }
        return false;
      });

      // only one ad card can be opened at the time
      if (cardBox.childElementCount === window.const.MAP_BLOCK_ELEMENT_CONT) {
        renderCard(ads[indexAd]);
        activePin.classList.add('map__pin--active');
        onCardClose();
        return;
      }
      var cardAd = document.querySelector('.map .map__card');
      cardAd.parentElement.removeChild(cardAd);
      renderCard(ads[indexAd]);
      removeActivePin();
      activePin.classList.add('map__pin--active');
      onCardClose();
    }
  };

  var pinBox = document.querySelector('.map__pins');
  // adds a card open handler
  var onCardOpen = function (ads) {

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
    removeActivePin();
  };

  var closeCardByKey = function (evt) {
    if (evt.key === window.const.Key.ESCAPE) {
      closeCard();
      document.removeEventListener('keydown', closeCardByKey);
    }
  };

  // adds a card close handler
  var onCardClose = function () {
    var closeCardButton = document.querySelector('.map__card .popup__close');

    // adds a mouse click handler
    closeCardButton.addEventListener('click', closeCard);

    // adds Esc key handler
    document.addEventListener('keydown', closeCardByKey);
  };


  window.card = {
    onCardOpen: onCardOpen,
    closeCard: closeCard,
  };

})();
