'use strict';

(function() {
  const DEFAULT_SCALE_PERCENT = 100;
  const IMAGE_FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

  const uploadSuccessTemplate = document.querySelector('#success');
  const uploadErrorTemplate = document.querySelector('#error');
  const loaderTemplate = document.querySelector('#messages');

  const uploadFormElement = document.querySelector('.img-upload__form');
  const uploadInputElement = document.querySelector('#upload-file');
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  const uploadPopupCloseElement = document.querySelector('.img-upload__cancel');
  const uploadImagePreviewElement = document.querySelector('.img-upload__preview img');
  const effectPreviewElements = document.querySelectorAll('.effects__preview');

  const scaleInputElement = document.querySelector('.scale__control--value');
  const effectLevelElement = document.querySelector('.effect-level');
  const effectSliderElement = document.querySelector('.effect-level__slider');
  const effectNoneElement = document.querySelector('#effect-none');
  const hashtagsInputElement = document.querySelector('.text__hashtags');
  const commentInputElement = document.querySelector('.text__description');

  const setUploadImagePreview = () => {
    const file = uploadInputElement.files[0];
    const fileName = file.name.toLowerCase();

    const isImage = IMAGE_FILE_TYPES.some((type) => fileName.endsWith(type));
    if (!isImage) {
      throw new window.FileFormatError('Uploaded file has unsupported format');
    }

    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadImagePreviewElement.src = reader.result;
      effectPreviewElements.forEach((preview) => {
        preview.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  };

  const resetUploadForm = () => {
    uploadInputElement.value = '';

    scaleInputElement.value = `${DEFAULT_SCALE_PERCENT}%`;
    window.scale.changeUploadImageScale(DEFAULT_SCALE_PERCENT);

    effectLevelElement.classList.add('hidden');
    effectSliderElement.style.left = `calc(100% - ${effectSliderElement.offsetWidth}px / 2)`;
    effectNoneElement.checked = true;
    window.effect.changeImageEffect(1);

    hashtagsInputElement.value = '';
    commentInputElement.value = '';
    hashtagsInputElement.setCustomValidity('');
    commentInputElement.setCustomValidity('');
  };

  const isHashtagsOrDescription = (element) => {
    return element.matches('.text__hashtags') || element.matches('.text__description');
  };

  const popupEscPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      if (isHashtagsOrDescription(evt.target)) {
        return;
      }

      closePopup();
    }
  };

  const openPopup = () => {
    try {
      setUploadImagePreview();
      uploadPopupElement.classList.remove('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', popupEscPressHandler);
    } catch (err) {
      if (err instanceof window.FileFormatError) {
        window.render.error(`Файл имеет некорректный формат.\n
          Поддерживаемые форматы: ${IMAGE_FILE_TYPES.join(', ')}`);
      } else {
        window.render.error(err.message);
      }
    }
  };

  const closePopup = () => {
    uploadPopupElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetUploadForm();
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  const closeSuccessPopup = () => {
    document.querySelector('.success')?.remove();
  };

  const closeErrorPopup = () => {
    document.querySelector('.error')?.remove();
  };

  const closeLoader = () => {
    document.querySelector('.img-upload__message--loading')?.remove();
  };

  const uploadingSuccessHandler = () => {
    closePopup();
    closeLoader();

    window.api.loadPictures(window.gallery.update, window.gallery.showError);

    const messageElement = uploadSuccessTemplate.content.cloneNode(true);
    messageElement.querySelector('.success__button').addEventListener('click', () => {
      closeSuccessPopup();
    });
    document.body.prepend(messageElement);
  };

  const uploadingErrorHandler = () => {
    closePopup();
    closeLoader();
    closeErrorPopup();  //  Может быть несколько окон. Чтобы они не перекрывали друг друга, закрываем предыдущее окно

    const messageElement = uploadErrorTemplate.content.cloneNode(true);
    messageElement.querySelector('.error__button').addEventListener('click', () => {
      closeErrorPopup();
    });
    document.body.prepend(messageElement);
  };

  const showLoader = () => {
    const loaderElement = loaderTemplate.content.cloneNode(true);
    document.body.prepend(loaderElement);
    document.body.firstElementChild.style.zIndex = 100;
  };

  uploadInputElement.addEventListener('change', () => {
    openPopup();
  });

  uploadPopupCloseElement.addEventListener('click', () => {
    closePopup();
  });

  uploadPopupCloseElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  });

  uploadFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const data = new FormData(uploadFormElement);
    window.api.uploadPhoto(data, uploadingSuccessHandler, uploadingErrorHandler);
    showLoader();
  });
})();
