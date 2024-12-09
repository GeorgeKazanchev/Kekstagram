'use strict';

const PICTURES_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 2;

const MIN_SCALE_PERCENT = 25;
const MAX_SCALE_PERCENT = 100;
const DELTA_SCALE_PERCENT = 25;
const DEFAULT_SCALE_PERCENT = 100;

const DEFAULT_EFFECT_LEVEL = 1;

const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

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

const COMMENTS = [
  `Всё отлично!`,
  `В целом всё неплохо. Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
];

const DESCRIPTIONS = [
  `Тестим новую камеру!`,
  `Затусили с друзьями на море`,
  `Как же круто тут кормят`,
  `Отдыхаем...`,
  `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
  `Вот это тачка!`,
];

const pictureTemplate = document.querySelector('#picture');
const commentTemplate = document.querySelector('#comment');
const picturesContainerElement = document.querySelector('.pictures');
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');

const uploadInputElement = document.querySelector('#upload-file');
const uploadPopupElement = document.querySelector('.img-upload__overlay');
const uploadPopupCloseElement = document.querySelector('.img-upload__cancel');
const uploadImageElement = document.querySelector('.img-upload__preview');
const uploadImagePictureElement = uploadImageElement.querySelector('img');
const uploadSubmitElement = document.querySelector('.img-upload__submit');

const scaleSmallerElement = document.querySelector('.scale__control--smaller');
const scaleBiggerElement = document.querySelector('.scale__control--bigger');
const scaleInputElement = document.querySelector('.scale__control--value');

const effectLevelElement = document.querySelector('.effect-level');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectInputElement = document.querySelector('.effect-level__value');
const effectsControlElement = document.querySelector('.img-upload__effects');

const hashtagsInputElement = document.querySelector('.text__hashtags');
const commentInputElement = document.querySelector('.text__description');

//  Генерация и рендеринг фото

const getRandomArrayItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomInRange = (min = 0, max = 0) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < PICTURES_COUNT; ++i) {
    const url = `photos/${i + 1}.jpg`;
    const likes = Math.floor(
      Math.random() * (MAX_LIKES_COUNT - MIN_LIKES_COUNT) + MIN_LIKES_COUNT
    );
    const description = getRandomArrayItem(DESCRIPTIONS);
    const commentsCount = getRandomInRange(1, MAX_COMMENTS_COUNT);
    const comments = new Array(commentsCount).fill(getRandomArrayItem(COMMENTS));

    pictures.push({
      url,
      likes,
      comments,
      description,
    });
  }
  return pictures;
};

const renderPicture = (picture) => {
  const pictureElement = pictureTemplate.content.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

const pictures = generatePictures();
const fragment = document.createDocumentFragment();
pictures.forEach((picture) => {
  fragment.append(renderPicture(picture));

  const pictureElement = fragment.lastElementChild;
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicturePopup(picture);
    hideBigPictureComments();
  });
});

picturesContainerElement.append(fragment);



//  Работа с полноразмерным изображением

const renderComment = (comment) => {
  const commentElement = commentTemplate.content.cloneNode(true);

  const imageNumber = getRandomInRange(1, 6);
  commentElement.querySelector('.social__picture').src = `img/avatar-${imageNumber}.svg`;
  commentElement.querySelector('.social__text').textContent = comment;

  return commentElement;
};

const renderComments = (comments, renderTo) => {
  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.append(renderComment(comment));
  });
  renderTo.append(fragment);
};

const setBigPicture = (picture) => {
  bigPictureElement.querySelector('.big-picture__img > img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  renderComments(picture.comments, commentsContainer);
};

const hideBigPictureComments = () => {
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.social__comments-loader').classList.add('visually-hidden');
};

const bigPicturePopupEscPressHandler = (evt) => {
  if (evt.key === 'Escape') {
    closeBigPicturePopup();
  }
};

const openBigPicturePopup = (picture) => {
  setBigPicture(picture);
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', bigPicturePopupEscPressHandler);
};

const closeBigPicturePopup = () => {
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', bigPicturePopupEscPressHandler);
};

bigPictureCloseElement.addEventListener('click', () => {
  closeBigPicturePopup();
});

bigPictureCloseElement.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
    closeBigPicturePopup();
  }
});



//  Загрузка фото; открытие/закрытие формы редактирования фото

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
  document.addEventListener('keydown', uploadPopupEscPressHandler);
};

const closeUploadPopup = () => {
  uploadPopupElement.classList.add('hidden');
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



//  Редактирование размера фото

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



//  Наложение эффекта на фото

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

effectSliderElement.addEventListener('mouseup', (evt) => {
  const target = evt.target;
  const fieldWidth = target.offsetParent.clientWidth - target.offsetWidth;
  let effectLevel = (target.offsetLeft - target.offsetWidth / 2) / fieldWidth;
  effectLevel = Math.floor(effectLevel * 1e+1) * 1e-1;
  changeImageEffect(effectLevel);
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



//  Валидация формы загрузки фото

const validateHashtags = (hashtagsString) => {
  const hashtags = hashtagsString.split(' ').filter((str) => str.length > 0);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    hashtagsInputElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов!');
    return;
  }

  for (let i = 0; i < hashtags.length; ++i) {
    const hashtag = hashtags[i];
    if (hashtag[0] !== '#') {
      hashtagsInputElement.setCustomValidity('Все хэш-теги должны начинаться с символа #!');
      return;
    }
    if (hashtag.length === 1) {
      hashtagsInputElement.setCustomValidity('Хэш-тег не должен состоять только из символа #!');
      return;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      hashtagsInputElement.setCustomValidity('Длина хэш-тега не должна превышать 20 символов!');
      return;
    }
  }

  const uniqueHashtags = Array.from(new Set(hashtags.map((hashtag) => hashtag.toLowerCase())));
  if (hashtags.length !== uniqueHashtags.length) {
    hashtagsInputElement.setCustomValidity('Нельзя использован один и тот же хэш-тег более одного раза!');
    return;
  }

  hashtagsInputElement.setCustomValidity('');   //  Сброс сообщения в setCustomValidity(), если поле валидно
};

const resetUploadForm = () => {
  uploadInputElement.value = '';

  scaleInputElement.value = `${DEFAULT_SCALE_PERCENT}%`;
  changeUploadImageScale(DEFAULT_SCALE_PERCENT);

  effectLevelElement.classList.add('hidden');
  effectSliderElement.style.left = `calc(100% - ${effectSliderElement.offsetWidth}px / 2)`;
  document.querySelector('#effect-none').checked = true;
  changeImageEffect(1);

  hashtagsInputElement.value = '';
  commentInputElement.value = '';
  hashtagsInputElement.setCustomValidity('');
  commentInputElement.setCustomValidity('');
};

uploadSubmitElement.addEventListener('click', () => {
  validateHashtags(hashtagsInputElement.value);
});
