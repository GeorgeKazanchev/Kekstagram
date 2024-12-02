'use strict';

const PICTURES_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 2;

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
const formInputElement = document.querySelector('#upload-file');
const imgUploadFormElement = document.querySelector('.img-upload__overlay');
const imgUploadCloseElement = document.querySelector('.img-upload__cancel');

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
    const commentsCount = getRandomInRange(1, 2);
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
});

picturesContainerElement.append(fragment);

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

const showBigPicture = (picture) => {
  bigPictureElement.classList.remove('hidden');
  setTimeout(() => bigPictureCloseElement.focus(), 0); //  It's added for providing a way of closing picture by Esc

  bigPictureElement.querySelector('.big-picture__img > img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;

  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  renderComments(picture.comments, commentsContainer);
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
};

const hideBigPictureComments = () => {
  bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPictureElement.querySelector('.social__comments-loader').classList.add('visually-hidden');
};

const addUploadFileFormChangeHandler = () => {
  formInputElement.addEventListener('change', () => {
    imgUploadFormElement.classList.remove('hidden');
    setTimeout(() => imgUploadCloseElement.focus(), 0);
  });
};

const addUploadFileFormCloseClickHandler = () => {
  imgUploadCloseElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeUploadFileForm();
  });
};

const addUploadFileFormCloseKeyDownHandler = () => {
  imgUploadFormElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeUploadFileForm();
    }
  });
};

const closeUploadFileForm = () => {
  const imgUploadFormElement = document.querySelector('.img-upload__overlay');
  imgUploadFormElement.classList.add('hidden');
  formInputElement.value = '';
};

const addPicturesClickHandlers = (pictures) => {
  //  TODO: Maybe, It'll be renamed
  const pictureElements = document.querySelectorAll('.picture');
  pictureElements.forEach((pictureElement) => {
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      const picture = getPictureByElement(pictureElement, pictures);
      showBigPicture(picture);
      hideBigPictureComments();
    });
  });
};

const getPictureFilename = (url) => {
  return url.split('/').at(-1);
};

const getPictureByElement = (pictureElement, pictures) => {
  const givenPictureFilename = getPictureFilename(
    pictureElement.querySelector('.picture__img').src
  );
  const foundPicture = pictures.find((picture) => {
    const curPictureFilename = getPictureFilename(picture.url);
    return curPictureFilename === givenPictureFilename;
  });

  if (foundPicture === undefined) {
    throw new Error('Failed to find an appropriate picture for element.');
  }

  return foundPicture;
};

const addBigPictureCloseClickHandler = () => {
  bigPictureCloseElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    hideBigPicture();
  });
};

const addBigPictureCloseKeyDownHandler = () => {
  bigPictureElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      hideBigPicture();
    }
  });
};

addUploadFileFormChangeHandler();
addUploadFileFormCloseClickHandler();
addUploadFileFormCloseKeyDownHandler();

addPicturesClickHandlers(pictures);
addBigPictureCloseClickHandler();
addBigPictureCloseKeyDownHandler();
