'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var MOUSE_LEFT_BUTTON = 0;
  var PIN_COUNT = 5;
  var ANY_HOUSING = 'any';
  var PinSize = {
    SIDE_LENGTH: 62,
    HEIGHT: 84,
    HEIGHT_PIN: 22,
  };
  var YBound = {
    TOP: 130,
    BOTTOM: 630,
  };
  var Url = {
    POST: '',
    GET: 'https://javascript.pages.academy/keksobooking/data',
  };
  var StatusCode = {
    OK: 200
  };


  window.const = {
    ENTER_KEY: ENTER_KEY,
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    PIN_COUNT: PIN_COUNT,
    ANY_HOUSING: ANY_HOUSING,
    PinSize: PinSize,
    YBound: YBound,
    Url: Url,
    StatusCode: StatusCode,
  };

})();
