'use strict';

(function () {
  // форма с фильтрами
  var filterForm = document.querySelector('.map__filters');
  var filterSelects = filterForm.querySelectorAll('select');
  var filterFieldset = filterForm.querySelector('fieldset');

  // отключает элементы управления формы фильтра
  filterSelects.forEach(function (itemSelect) {
    itemSelect.setAttribute('disabled', 'disabled');
  });
  filterFieldset.setAttribute('disabled', 'disabled');


  window.filterForm = {
    filterSelects: filterSelects,
    filterFieldset: filterFieldset,
  };

})();
