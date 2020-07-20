'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var adForm = document.querySelector('.ad-form');

  // user avatar
  var userAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var userAvatarPreview = adForm.querySelector('.ad-form-header__preview img');
  var defaultAvatar = userAvatarPreview.src;

  // housing photo
  var housingPhoto = adForm.querySelector('.ad-form__input');
  var housingPhotoPreview = adForm.querySelector('.ad-form__photo');

  var isPicture = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });
  };

  // handler of load a user avatar
  var onUserAvatarChange = function () {
    var file = userAvatar.files[0];

    if (!(isPicture(file))) {
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      userAvatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  };

  // handler of load a housing photo
  var onHousingPhotoChange = function () {
    var file = housingPhoto.files[0];

    if (!(isPicture(file))) {
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var node = document.createElement('img');
      node.classList.add('housing-photo');
      node.src = reader.result;
      housingPhotoPreview.appendChild(node);
    });

    reader.readAsDataURL(file);
  };

  var addEvents = function () {
    userAvatar.addEventListener('change', onUserAvatarChange);
    housingPhoto.addEventListener('change', onHousingPhotoChange);
  };

  var removeEvents = function () {
    userAvatar.removeEventListener('change', onUserAvatarChange);
    housingPhoto.removeEventListener('change', onHousingPhotoChange);
    userAvatarPreview.src = defaultAvatar;
    housingPhotoPreview.textContent = '';
  };


  window.imageLoad = {
    addEvents: addEvents,
    removeEvents: removeEvents,
  };

})();
