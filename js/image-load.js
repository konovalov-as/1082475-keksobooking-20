'use strict';

(function () {
  var FILE_TYPES = window.const.FILE_TYPES;
  var DEFAULT_AVATAR = window.const.DEFAULT_AVATAR;
  var USER_AVATAR = window.const.USER_AVATAR;
  var HOUSING_PHOTO = window.const.HOUSING_PHOTO;

  var adForm = window.adForm.form;

  // user avatar
  var userAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var userAvatarPreview = adForm.querySelector('.ad-form-header__preview img');

  // housing photo
  var housingPhoto = adForm.querySelector('.ad-form__input');
  var housingPhotoPreview = adForm.querySelector('.ad-form__photo');

  var isPicture = function (file) {
    var fileName = file.name.toLowerCase();
    return FILE_TYPES.some(function (fileType) {
      return fileName.endsWith(fileType);
    });
  };

  var readerPicture = function (file, pictureKind) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      if (pictureKind === USER_AVATAR) {
        userAvatarPreview.src = reader.result;
      }
      if (pictureKind === HOUSING_PHOTO) {
        var node = document.createElement('img');
        node.classList.add('housing-photo');
        node.src = reader.result;
        housingPhotoPreview.appendChild(node);
      }
    });

    reader.readAsDataURL(file);
  };

  // handler of load a user avatar
  var onUserAvatarChange = function () {
    var file = userAvatar.files[0];
    var matches = isPicture(file);

    if (matches) {
      readerPicture(file, USER_AVATAR);
    }
  };

  // handler of load a housing photo
  var onHousingPhotoChange = function () {
    var file = housingPhoto.files[0];
    var matches = isPicture(file);

    if (matches) {
      readerPicture(file, HOUSING_PHOTO);
    }
  };

  var addEvents = function () {
    userAvatar.addEventListener('change', onUserAvatarChange);
    housingPhoto.addEventListener('change', onHousingPhotoChange);
  };

  var removeEvents = function () {
    userAvatar.removeEventListener('change', onUserAvatarChange);
    housingPhoto.removeEventListener('change', onHousingPhotoChange);
    userAvatarPreview.src = DEFAULT_AVATAR;
    housingPhotoPreview.textContent = '';
  };


  window.imageLoad = {
    addEvents: addEvents,
    removeEvents: removeEvents,
  };

})();
