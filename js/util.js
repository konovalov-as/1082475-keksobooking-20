'use strict';

(function () {
  // получает случайное число
  var getRandomNumber = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // максимум и минимум включаются
  };

  // получает случайные данные
  var getRandomElement = function (randomIndex, items) {
    return items[randomIndex];
  };

  // получает случайный заголовок для аватарки
  var getRandomTitle = function (randomNumber) {
    var randomTitle = '';
    for (var l = 0; l < randomNumber; l++) {
      var randomIndex = getRandomNumber(0, window.const.WORDS.length - 1);
      randomTitle += window.const.WORDS[randomIndex] + ' ';
    }
    return randomTitle;
  };

  // получает массив строк случайной длины features
  var getRandomFeatures = function (randomNumber) {
    var randomFeatures = [];
    for (var j = 0; j < randomNumber; j++) {
      var randomIndex = getRandomNumber(0, window.const.FEATURES.length - 1);
      if (!randomFeatures.includes(window.const.FEATURES[randomIndex])) {
        randomFeatures.push(window.const.FEATURES[randomIndex]);
      }
    }
    return randomFeatures;
  };

  // получает адреса фотографий
  var getPhotoPaths = function (randomNumber) {
    var randomPhotos = [];
    for (var k = 0; k < randomNumber; k++) {
      randomPhotos.push('http://o0.github.io/assets/images/tokyo/hotel' + (k + 1) + '.jpg');
    }
    return randomPhotos;
  };


  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomElement: getRandomElement,
    getRandomTitle: getRandomTitle,
    getRandomFeatures: getRandomFeatures,
    getPhotoPaths: getPhotoPaths,
  };

})();
