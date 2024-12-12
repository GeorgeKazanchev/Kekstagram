'use strict';

(function() {
  const MIN_SCALE_PERCENT = 25;
  const MAX_SCALE_PERCENT = 100;
  const DELTA_SCALE_PERCENT = 25;

  const uploadImageElement = document.querySelector('.img-upload__preview');
  const scaleInputElement = document.querySelector('.scale__control--value');
  const scaleSmallerElement = document.querySelector('.scale__control--smaller');
  const scaleBiggerElement = document.querySelector('.scale__control--bigger');

  const changeUploadImageScale = (value) => {
    uploadImageElement.style.transform = `scale(${value * 0.01})`;
  };

  const changeScaleValue = (deltaPercent) => {
    const prevValue = Number(scaleInputElement.value.replace('%', ''));
    const newValue = prevValue + deltaPercent;
    if (newValue < MIN_SCALE_PERCENT || newValue > MAX_SCALE_PERCENT) {
      return;
    }
    scaleInputElement.value = `${newValue}%`;
    changeUploadImageScale(newValue);
  };

  scaleSmallerElement.addEventListener('click', () => {
    changeScaleValue(-DELTA_SCALE_PERCENT);
  });

  scaleBiggerElement.addEventListener('click', () => {
    changeScaleValue(DELTA_SCALE_PERCENT);
  });

  window.scale = {
    changeUploadImageScale,
  };
})();
