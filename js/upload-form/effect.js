'use strict';

(function() {
  const DEFAULT_EFFECT_LEVEL = 1;

  const MIN_EFFECT_LEVEL = {
    none: 0,
    chrome: 0,
    sepia: 0,
    marvin: 0,
    phobos: 0,
    heat: 1,
  };

  const MAX_EFFECT_LEVEL = {
    none: 0,
    chrome: 1,
    sepia: 1,
    marvin: 100,
    phobos: 3,
    heat: 3,
  };

  const uploadImagePictureElement = document.querySelector('.img-upload__preview img');
  const effectInputElement = document.querySelector('.effect-level__value');
  const effectLevelElement = document.querySelector('.effect-level');
  const effectSliderElement = document.querySelector('.effect-level__slider');
  const effectsControlElement = document.querySelector('.img-upload__effects');

  const getEffectFilterValue = (effect, effectLevel) => {
    switch (effect) {
        case 'none':
            return ``;
        case 'chrome':
            return `grayscale(${effectLevel})`;
        case 'sepia':
            return `sepia(${effectLevel})`;
        case 'marvin':
            return `invert(${effectLevel}%)`;
        case 'phobos':
            return `blur(${effectLevel}px)`;
        case 'heat':
            return `brightness(${effectLevel})`;
        default:
            throw new Error('There is no given filter type.');
    }
  };

  const changeImageEffect = (effectLevel) => {
    const effect = document.querySelector('.effects__radio:checked').value;
    const scaledEffectLevel = effectLevel * (MAX_EFFECT_LEVEL[effect] - MIN_EFFECT_LEVEL[effect]);
    uploadImagePictureElement.style.filter = getEffectFilterValue(effect, scaledEffectLevel);
    uploadImagePictureElement.className = `effects__preview--${effect}`;
    effectInputElement.value = effectLevel;
  };

  effectSliderElement.addEventListener('mousedown', (evt) => {
    evt.preventDefault();

    const target = evt.target;
    const parent = target.offsetParent;
    const parentCoords = parent.getBoundingClientRect();
    const sliderRadius = effectSliderElement.offsetWidth / 2;
    const fieldWidth = parent.clientWidth - target.offsetWidth;

    const minX = sliderRadius;
    const maxX = parent.clientWidth - sliderRadius;

    let startX = evt.clientX;

    const moveSlider = (clientX) => {
      const shiftX = clientX - startX;
      startX = clientX;

      let currentX = effectSliderElement.offsetLeft + shiftX;
      if (clientX < parentCoords.left + sliderRadius) {
        currentX = minX;
      } else if (clientX > parentCoords.right - sliderRadius) {
        currentX = maxX;
      }

      effectSliderElement.style.left = `${currentX}px`;
    };

    const changeEffectLevel = () => {
      let effectLevel = (target.offsetLeft - sliderRadius) / fieldWidth;
      effectLevel = Math.floor(effectLevel * 1e+2) * 1e-2;
      changeImageEffect(effectLevel);
    };

    const mouseMoveHandler = (moveEvt) => {
      moveEvt.preventDefault();
      moveSlider(moveEvt.clientX);
      changeEffectLevel();
    };

    const mouseUpHandler = (upEvt) => {
      upEvt.preventDefault();
      moveSlider(upEvt.clientX);
      changeEffectLevel();
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  effectsControlElement.addEventListener('change', (evt) => {
    const effectButton = evt.target.closest('.effects__radio');
    if (!effectButton) {
      return;
    }

    const chosenEffect = effectButton.value;
    if (chosenEffect === 'none') {
      effectLevelElement.classList.add('hidden');
    } else {
      effectLevelElement.classList.remove('hidden');
    }

    effectSliderElement.style.left = `calc(100% - ${effectSliderElement.offsetWidth}px / 2)`;
    changeImageEffect(DEFAULT_EFFECT_LEVEL);
  });

  window.effect = {
    changeImageEffect,
  };
})();
