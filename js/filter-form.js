'use strict';

(function () {
  // form with filters
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // turns off filter form controls
  filterSelects.forEach(function (itemSelect) {
    itemSelect.setAttribute('disabled', 'disabled');
  });
  filterFieldset.setAttribute('disabled', 'disabled');

  // turns on filter form controls
  var turnOnFilter = function () {
    filterSelects.forEach(function (itemSelect) {
      itemSelect.removeAttribute('disabled');
    });
    filterFieldset.removeAttribute('disabled');
  };

  // turns on filter form controls
  var turnOffFilter = function () {
    filterSelects.forEach(function (itemSelect) {
      itemSelect.setAttribute('disabled', '');
    });
    filterFieldset.setAttribute('disabled', '');
  };


  window.filterForm = {
    turnOnFilter: turnOnFilter,
    turnOffFilter: turnOffFilter,
  };

})();
