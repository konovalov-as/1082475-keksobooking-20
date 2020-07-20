'use strict';

(function () {
  // get top and bottom bounds of the map block
  var YBound = {
    TOP: 130,
    BOTTOM: 630,
  };

  var pinContainer = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  // get left and right bounds of the map block
  var XBound = {
    left: 0,
    right: pinContainer.offsetWidth,
  };

  // set left and top offset of the container
  var PageOffset = {
    left: 0,
    top: 0,
  };

  // write the address in the address field
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
    if (endCoord.x + window.const.PinSize.SIDE_LENGTH / 2 <= XBound.left) {
      mainPin.style.left = XBound.left - window.const.PinSize.SIDE_LENGTH / 2 + window.const.CSS_UNITS;
      return;
    }
    if (endCoord.x + window.const.PinSize.SIDE_LENGTH / 2 >= XBound.right) {
      mainPin.style.left = XBound.right - window.const.PinSize.SIDE_LENGTH / 2 + window.const.CSS_UNITS;
      return;
    }
    mainPin.style.left = endCoord.x + window.const.CSS_UNITS;

    // set limits on the Y coordinate
    if (endCoord.y + window.const.PinSize.HEIGHT <= YBound.TOP) {
      mainPin.style.top = YBound.TOP - window.const.PinSize.HEIGHT + window.const.CSS_UNITS;
      return;
    }
    if (endCoord.y + window.const.PinSize.HEIGHT >= YBound.BOTTOM) {
      mainPin.style.top = YBound.BOTTOM - window.const.PinSize.HEIGHT + window.const.CSS_UNITS;
      return;
    }
    mainPin.style.top = endCoord.y + window.const.CSS_UNITS;

    setAddress();
  };

  var onMainPinMousedown = function (evt) {
    if (!(evt.button === window.const.MOUSE_LEFT_BUTTON)) {
      return;
    }
    evt.preventDefault();
    setAddress();

    XBound.right = pinContainer.offsetWidth;

    PageOffset.left = evt.clientX - mainPin.offsetLeft;
    PageOffset.top = evt.clientY - mainPin.offsetTop;

    document.addEventListener('mousemove', onMainPinMousemove);
    document.addEventListener('mouseup', onMainPinMouseup);
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
