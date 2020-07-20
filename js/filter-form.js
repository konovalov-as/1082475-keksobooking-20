'use strict';

(function () {
  var FILTER_ANY_VALUE = 'any';

  var PriceValue = {
    MIDDLE: 10000,
    HIGH: 50000,
  };

  // get a form with filters
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // get filter fields
  var housingTypeSelect = filterForm.querySelector('#housing-type');
  var housingPriceSelect = filterForm.querySelector('#housing-price');
  var housingRoomSelect = filterForm.querySelector('#housing-rooms');
  var housingGuestSelect = filterForm.querySelector('#housing-guests');
  var featuresContainer = filterForm.querySelector('.map__features');

  // a filter change handler
  var onFilterChange = function () {
    window.debounce(setFilterAds);
  };

  // turn on filter form controls
  var turnOnFilter = function () {
    filterSelects.forEach(function (select) {
      select.disabled = false;
    });
    filterFieldset.disabled = false;

    filterForm.addEventListener('change', onFilterChange);
  };

  // turn off filter form controls
  var turnOffFilter = function () {
    filterSelects.forEach(function (select) {
      select.disabled = true;
    });
    filterFieldset.disabled = true;

    filterForm.removeEventListener('change', onFilterChange);
  };
  turnOffFilter();

  // filters
  var filterHousingType = function (type) {
    if (housingTypeSelect.value === FILTER_ANY_VALUE) {
      return true;
    }
    return housingTypeSelect.value === type;
  };

  var priceCategoryToValueMap = {
    any: function () {
      return true;
    },
    low: function (price) {
      return price < PriceValue.MIDDLE;
    },
    middle: function (price) {
      return price >= PriceValue.MIDDLE && price < PriceValue.HIGH;
    },
    high: function (price) {
      return price >= PriceValue.HIGH;
    },
  };

  var filterHousingPrice = function (price) {
    var priceCategory = housingPriceSelect.value;
    // priceCategoryToValueMap[priceCategory](price);
    return priceCategoryToValueMap[priceCategory](price);
  };

  var filterHousingRooms = function (rooms) {
    if (housingRoomSelect.value === FILTER_ANY_VALUE) {
      return true;
    }
    return +housingRoomSelect.value === rooms;
  };

  var filterHousingGuests = function (guests) {
    if (housingGuestSelect.value === FILTER_ANY_VALUE) {
      return true;
    }
    return +housingGuestSelect.value === guests;
  };

  var filterHousingFeatures = function (ad) {
    var checkedFeatures = featuresContainer.querySelectorAll('.map__checkbox:checked');

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
      if (!(filterAds.length < window.const.PIN_COUNT)) {
        break;
      }
    }

    window.card.close();
    window.pins.remove();

    window.pins.render(filterAds);
  };


  window.filterForm = {
    turnOn: turnOnFilter,
    turnOff: turnOffFilter,
  };

})();
