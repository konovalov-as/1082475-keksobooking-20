'use strict';

(function () {
  var MOUSE_LEFT_BUTTON = 0;
  var PIN_COUNT = 5;
  var ANY_HOUSING = 'any';
  var MAP_BLOCK_ELEMENT_CONT = 2;
  var DEBOUNCE_INTERVAL = 500; // ms
  var FILTER_ANY_VALUE = 'any';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var USER_AVATAR = 'avatar';
  var HOUSING_PHOTO = 'photo';
  var PinSize = {
    SIDE_LENGTH: 62,
    HEIGHT: 84,
    HEIGHT_PIN: 22,
  };
  var PinСoordinate = {
    LEFT: 570,
    TOP: 375,
  };
  var YBound = {
    TOP: 130,
    BOTTOM: 630,
  };
  var Url = {
    POST: 'https://javascript.pages.academy/keksobooking',
    GET: 'https://javascript.pages.academy/keksobooking/data',
  };
  var StatusCode = {
    OK: 200
  };
  var Key = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
  };
  var PriceKey = {
    LOW: 'low',
    MIDDLE: 'middle',
    HIGH: 'high',
  };
  var PriceValue = {
    MIDDLE: 10000,
    HIGH: 50000,
  };


  window.const = {
    MOUSE_LEFT_BUTTON: MOUSE_LEFT_BUTTON,
    PIN_COUNT: PIN_COUNT,
    ANY_HOUSING: ANY_HOUSING,
    MAP_BLOCK_ELEMENT_CONT: MAP_BLOCK_ELEMENT_CONT,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    FILTER_ANY_VALUE: FILTER_ANY_VALUE,
    FILE_TYPES: FILE_TYPES,
    DEFAULT_AVATAR: DEFAULT_AVATAR,
    USER_AVATAR: USER_AVATAR,
    HOUSING_PHOTO: HOUSING_PHOTO,
    PinSize: PinSize,
    PinСoordinate: PinСoordinate,
    YBound: YBound,
    Url: Url,
    StatusCode: StatusCode,
    Key: Key,
    PriceKey: PriceKey,
    PriceValue: PriceValue,
  };

})();
