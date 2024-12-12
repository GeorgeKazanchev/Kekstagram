'use strict';

(function() {
  const DEFAULT_SCALE_PERCENT = 100;

  const uploadInputElement = document.querySelector('#upload-file');
  const uploadPopupElement = document.querySelector('.img-upload__overlay');
  const uploadPopupCloseElement = document.querySelector('.img-upload__cancel');
  const scaleInputElement = document.querySelector('.scale__control--value');
  const effectLevelElement = document.querySelector('.effect-level');
  const effectSliderElement = document.querySelector('.effect-level__slider');
  const hashtagsInputElement = document.querySelector('.text__hashtags');
  const commentInputElement = document.querySelector('.text__description');

  const resetUploadForm = () => {
    uploadInputElement.value = '';

    scaleInputElement.value = `${DEFAULT_SCALE_PERCENT}%`;
    window.scale.changeUploadImageScale(DEFAULT_SCALE_PERCENT);

    effectLevelElement.classList.add('hidden');
    effectSliderElement.style.left = `calc(100% - ${effectSliderElement.offsetWidth}px / 2)`;
    document.querySelector('#effect-none').checked = true;
    window.effect.changeImageEffect(1);

    hashtagsInputElement.value = '';
    commentInputElement.value = '';
    hashtagsInputElement.setCustomValidity('');
    commentInputElement.setCustomValidity('');
  };

  const uploadPopupEscPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      if (evt.target.matches('.text__hashtags')
        || evt.target.matches('.text__description')) {
        return;
      }

      closeUploadPopup();
    }
  };

  const openUploadPopup = () => {
    uploadPopupElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', uploadPopupEscPressHandler);
  };

  const closeUploadPopup = () => {
    uploadPopupElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetUploadForm();
    document.removeEventListener('keydown', uploadPopupEscPressHandler);
  };

  uploadInputElement.addEventListener('change', () => {
    openUploadPopup();
  });

  uploadPopupCloseElement.addEventListener('click', () => {
    closeUploadPopup();
  });

  uploadPopupCloseElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closeUploadPopup();
    }
  });
})();
