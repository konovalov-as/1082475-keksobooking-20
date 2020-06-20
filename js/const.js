'use strict';

(function () {
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var REGISTRATIONS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var WORDS = ['семь', 'раз', 'поешь', 'один', 'раз', 'поспи'];
  var ENTER_KEY = 'Enter';
  var MOUSE_LEFT_BUTTON = 0;
  var PinSize = {
    SIDE_LENGTH: 62,
    HEIGHT: 84,
    HEIGHT_PIN: 22,
  };
  var YBound = {
    TOP: 130,
    BOTTOM: 630,
  };


  window.const = {
    OFFER_TYPES: OFFER_TYPES,
    REGISTRATIONS: REGISTRATIONS,
    FEATURES: FEATURES,
    WORDS: WORDS,
    ENTER_KEY: ENTER_KEY,
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    PinSize: PinSize,
    YBound: YBound,
  };

})();
