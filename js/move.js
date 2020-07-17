'use strict';

(function () {
  // gets a main pin size
  var PinSize = {
    HALF: window.const.PinSize.SIDE_LENGTH / 2,
    HEIGHT: window.const.PinSize.HEIGHT,
  };

  // gets top and bottom bounds of the map block
  var YBound = {
    TOP: window.const.YBound.TOP,
    BOTTOM: window.const.YBound.BOTTOM,
  };

  var pinsBox = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  // gets left and right bounds of the map block
  var XBound = {
    left: 0,
    right: pinsBox.offsetWidth,
  };

  // sets left and top offset of the container
  var PageOffset = {
    left: 0,
    top: 0,
  };

  // writes the address in the address field
  var setAddress = function () {
    var pinX = mainPin.offsetLeft + window.const.PinSize.SIDE_LENGTH / 2;
    var pinY = mainPin.offsetTop + window.const.PinSize.HEIGHT;
    inputAddress.value = pinX + ', ' + pinY;
  };

  var moveMainPin = function (evt) {
    var endCoord = {
      x: evt.clientX - PageOffset.left,
      y: evt.clientY - PageOffset.top,
    };

    // set limits on the X coordinate
    if (endCoord.x + PinSize.HALF <= XBound.left) {
      mainPin.style.left = XBound.left - PinSize.HALF + 'px';
      return;
    }
    if (endCoord.x + PinSize.HALF >= XBound.right) {
      mainPin.style.left = XBound.right - PinSize.HALF + 'px';
      return;
    }
    mainPin.style.left = endCoord.x + 'px';

    // set limits on the Y coordinate
    if (endCoord.y + PinSize.HEIGHT <= YBound.TOP) {
      mainPin.style.top = YBound.TOP - PinSize.HEIGHT + 'px';
      return;
    }
    if (endCoord.y + PinSize.HEIGHT >= YBound.BOTTOM) {
      mainPin.style.top = YBound.BOTTOM - PinSize.HEIGHT + 'px';
      return;
    }
    mainPin.style.top = endCoord.y + 'px';

    setAddress();
  };

  var onMainPinMousedown = function (evt) {
    if (evt.button === window.const.MOUSE_LEFT_BUTTON) {
      evt.preventDefault();
      setAddress();

      XBound.right = pinsBox.offsetWidth;

      PageOffset.left = evt.clientX - mainPin.offsetLeft;
      PageOffset.top = evt.clientY - mainPin.offsetTop;

      document.addEventListener('mousemove', onMainPinMousemove);
      document.addEventListener('mouseup', onMainPinMouseup);
    }
  };

  var onMainPinMousemove = function (moveEvt) {
    moveEvt.preventDefault();
    moveMainPin(moveEvt);
  };

  var onMainPinMouseup = function (upEvt) {
    upEvt.preventDefault();
    moveMainPin(upEvt);

    document.removeEventListener('mousemove', onMainPinMousemove);
    document.removeEventListener('mouseup', onMainPinMouseup);
  };

  mainPin.addEventListener('mousedown', onMainPinMousedown);

})();
