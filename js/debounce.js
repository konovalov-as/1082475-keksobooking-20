'use strict';

(function () {
  var DEBOUNCE_INTERVAL = window.const.DEBOUNCE_INTERVAL;

  var lastTimeout;
  window.debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

})();
