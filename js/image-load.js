'use strict';

(function () {
  var FILE_TYPES = window.const.FILE_TYPES;
  var USER_AVATAR = 'avatar';
  var HOUSING_PHOTO = 'photo';

  // user avatar
  var userAvatar = document.querySelector('.ad-form__field input[type=file]');
  var userAvatarPreview = document.querySelector('.ad-form-header__preview img');

  // housing photo
  var housingPhoto = document.querySelector('.ad-form__input');
  var housingPhotoPreview = document.querySelector('.ad-form__photo');

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

  userAvatar.addEventListener('change', function () {
    var file = userAvatar.files[0];
    var matches = isPicture(file);

    if (matches) {
      readerPicture(file, USER_AVATAR);
    }
  });

  housingPhoto.addEventListener('change', function () {
    var file = housingPhoto.files[0];
    var matches = isPicture(file);

    if (matches) {
      readerPicture(file, HOUSING_PHOTO);
    }
  });

})();
