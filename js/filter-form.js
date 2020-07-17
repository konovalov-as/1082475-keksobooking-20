'use strict';

(function () {
  var FILTER_ANY_VALUE = 'any';

  var PriceKey = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };

  var PriceValue = {
    MIDDLE: 10000,
    HIGH: 50000,
  };

  // get a form with filters
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // get filter fields
  var housingType = filterForm.querySelector('#housing-type');
  var housingPrice = filterForm.querySelector('#housing-price');
  var housingRoom = filterForm.querySelector('#housing-rooms');
  var housingGuest = filterForm.querySelector('#housing-guests');
  var featuresBlock = filterForm.querySelector('.map__features');

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

  // ---------------------- filters ---------------------- //
  var filterHousingType = function (type) {
    return housingType.value === type
      || housingType.value === FILTER_ANY_VALUE;
  };

  var filterHousingPrice = function (price) {
    return (housingPrice.value === PriceKey.LOW && price < PriceValue.MIDDLE)
      || (housingPrice.value === PriceKey.MIDDLE && price >= PriceValue.MIDDLE && price < PriceValue.HIGH)
      || (housingPrice.value === PriceKey.HIGH && price >= PriceValue.HIGH)
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
    turnOn: turnOnFilter,
    turnOff: turnOffFilter,
  };

})();
