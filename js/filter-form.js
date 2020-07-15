'use strict';

(function () {
  var FILTER_ANY_VALUE = window.const.FILTER_ANY_VALUE;

  var LOW_PRICE_KEY = window.const.PriceKey.LOW;
  var MIDDLE_PRICE_KEY = window.const.PriceKey.MIDDLE;
  var HIGH_PRICE_KEY = window.const.PriceKey.HIGH;

  var MIDDLE_PRICE_VALUE = window.const.PriceValue.MIDDLE;
  var HIGH_PRICE_VALUE = window.const.PriceValue.HIGH;

  // gets a form with filters
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // gets filter fields
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRoom = filterForm.querySelector('#housing-rooms');
  var housingGuest = filterForm.querySelector('#housing-guests');
  var featuresBlock = filterForm.querySelector('.map__features');

  // turns on filters form controls
  var turnOnFilter = function () {
    filterSelects.forEach(function (itemSelect) {
      itemSelect.removeAttribute('disabled');
    });
    filterFieldset.removeAttribute('disabled');

    filterForm.addEventListener('change', onFilterChange);
  };

  // turns off filters form controls
  var turnOffFilter = function () {
    filterSelects.forEach(function (itemSelect) {
      itemSelect.setAttribute('disabled', '');
    });
    filterFieldset.setAttribute('disabled', '');

    filterForm.removeEventListener('change', onFilterChange);
  };

  // ---------------------- filters ---------------------- //
  var filterHousingType = function (type) {
    return housingType.value === type
      || housingType.value === FILTER_ANY_VALUE;
  };

  var filterHousingPrice = function (price) {
    return (housingPrice.value === LOW_PRICE_KEY && price < MIDDLE_PRICE_VALUE)
      || (housingPrice.value === MIDDLE_PRICE_KEY && price >= MIDDLE_PRICE_VALUE && price < HIGH_PRICE_VALUE)
      || (housingPrice.value === HIGH_PRICE_KEY && price >= HIGH_PRICE_VALUE)
      || (housingPrice.value === price || housingPrice.value === FILTER_ANY_VALUE);
  };

  var filterHousingRooms = function (rooms) {
    return (+housingRoom.value === rooms)
      || (housingRoom.value === FILTER_ANY_VALUE);
  };

  var filterHousingGuests = function (guests) {
    return (+housingGuest.value === guests)
      || (housingGuest.value === FILTER_ANY_VALUE);
  };

  var filterHousingFeatures = function (ad) {
    var checkedFeatures = featuresBlock.querySelectorAll('.map__checkbox:checked');

    return Array.from(checkedFeatures).every(function (checkedFeature) {
      return ad.offer.features.includes(checkedFeature.value);
    });
  };

  var setFilterAds = function () {
    var ads = window.ads;
    var filterAds = [];

    for (var i = 0; i < ads.length; i++) {
      var ad = ads[i];
      if (filterHousingType(ad.offer.type)
        && filterHousingPrice(ad.offer.price)
        && filterHousingRooms(ad.offer.rooms)
        && filterHousingGuests(ad.offer.guests)
        && filterHousingFeatures(ad)) {
        filterAds.push(ad);
      }
      if (filterAds.length > window.const.PIN_COUNT - 1) {
        break;
      }
    }

    window.card.closeCard();
    window.pins.remove();

    window.pins.render(filterAds);
    window.card.onCardOpen(filterAds);
  };

  var onFilterChange = function () {
    window.debounce(setFilterAds);
  };
  // ---------------------- filters ---------------------- //


  window.filterForm = {
    turnOnFilter: turnOnFilter,
    turnOffFilter: turnOffFilter,
  };

})();
