const PICTURES_COUNT = 25;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;
const MAX_COMMENTS_COUNT = 2;
const ESC_KEY_CODE = 27;

const COMMENTS = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];

const DESCRIPTIONS = [
    `Тестим новую камеру!`,
    `Затусили с друзьями на море`,
    `Как же круто тут кормят`,
    `Отдыхаем...`,
    `Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......`,
    `Вот это тачка!`
];

const commentTemplate =
    `<li class="social__comment social__comment--text">
        <img class="social__picture" src="" alt="Аватар комментатора фотографии" width="35" height="35">
        <p class="social__text"></p>
    </li>`;

const pictureTemplate = document.querySelector('#picture');
const bigPictureElement = document.querySelector('.big-picture');
const formInputElement = document.querySelector('#upload-file');
const imgUploadFormElement = document.querySelector('.img-upload__overlay');
const closeButtonElement = document.querySelector('.img-upload__cancel');

const createElementFromTemplate = (template) => {
    const templateContainer = document.createElement('div');
    templateContainer.insertAdjacentHTML('afterbegin', template);
    return templateContainer.firstElementChild;
};

const generatePicture = (index) => {
    const url = `photos/${index + 1}.jpg`;
    const likes = Math.floor(Math.random() * (MAX_LIKES_COUNT - MIN_LIKES_COUNT) + MIN_LIKES_COUNT);
    const description = DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)];

    const commentsCount = Math.floor(Math.random() * MAX_COMMENTS_COUNT + 1);
    const comments = [];
    for (let j = 0; j < commentsCount; ++j) {
        comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
    }

    return {
        url,
        likes,
        comments,
        description
    };
};

const generatePictures = () => {
    const pictures = [];
    for (let i = 0; i < PICTURES_COUNT; ++i) {
        const picture = generatePicture(i);
        pictures.push(picture);
    }
    return pictures;
};

const createPictureElement = (picture) => {
    const pictureElement = pictureTemplate.content.cloneNode(true);
    const imageElement = pictureElement.querySelector('.picture__img');
    const likesCountElement = pictureElement.querySelector('.picture__likes');
    const commentsCountElement = pictureElement.querySelector('.picture__comments');
    imageElement.src = picture.url;
    likesCountElement.textContent = picture.likes;
    commentsCountElement.textContent = picture.comments.length;
    return pictureElement;
};

const createPictureElements = (pictures) => {
    return pictures.map((picture) => createPictureElement(picture));
};

const createCommentElement = (comment) => {
    const commentElement = createElementFromTemplate(commentTemplate);
    const imageElement = commentElement.querySelector('.social__picture');
    const textElement = commentElement.querySelector('.social__text');
    const imageNumber = Math.floor(Math.random() * 5 + 1);
    imageElement.src = `img/avatar-${imageNumber}.svg`;
    textElement.textContent = comment;
    return commentElement;
};

const createCommentElements = (comments) => {
    return comments.map((comment) => createCommentElement(comment));
};

const renderPictureElements = (pictureElements) => {
    const picturesContainerElement = document.querySelector('.pictures');
    const fragment = new DocumentFragment();
    fragment.append(...pictureElements);
    picturesContainerElement.append(fragment);
    picturesContainerElement.classList.remove('visually-hidden');
};

const renderCommentsList = (commentElements) => {
    const listElement = document.querySelector('.social__comments');
    listElement.innerHTML = '';
    const fragment = new DocumentFragment();
    fragment.append(...commentElements);
    listElement.append(fragment);
};

const renderBigPicture = (picture) => {
    bigPictureElement.classList.remove('hidden');

    const imageElement = bigPictureElement.querySelector('.big-picture__img');
    const likesCountElement = bigPictureElement.querySelector('.likes-count');
    const commentsCountElement = bigPictureElement.querySelector('.comments-count');
    const descriptionElement = bigPictureElement.querySelector('.social__caption');

    imageElement.src = picture.url;
    likesCountElement.textContent = picture.likes;
    commentsCountElement.textContent = picture.comments.length;
    descriptionElement.textContent = picture.description;

    const commentElements = createCommentElements(picture.comments);
    renderCommentsList(commentElements);
};

const hideBigPictureComments = () => {
    const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
    const commentsLoaderElement = bigPictureElement.querySelector('.social__comments-loader');
    commentsCountElement.classList.add('visually-hidden');
    commentsLoaderElement.classList.add('visually-hidden');
};

const addUploadFileFormChangeHandler = () => {
    formInputElement.addEventListener('change', () => {
        imgUploadFormElement.classList.remove('hidden');
        setTimeout(() => closeButtonElement.focus(), 0);
    });
};

const addUploadFileFormCloseClickHandler = () => {
    closeButtonElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        closeUploadFileForm();
    });
};

const addUploadFileFormCloseKeyDownHandler = () => {
    imgUploadFormElement.addEventListener('keydown', (evt) => {
        if (evt.keyCode === ESC_KEY_CODE) {
            closeUploadFileForm();
        }
    });
};

const closeUploadFileForm = () => {
    const imgUploadFormElement = document.querySelector('.img-upload__overlay');
    imgUploadFormElement.classList.add('hidden');
    formInputElement.value = '';
};

const pictures = generatePictures();
const pitcureElements = createPictureElements(pictures);
renderPictureElements(pitcureElements);
addUploadFileFormChangeHandler();
addUploadFileFormCloseClickHandler();
addUploadFileFormCloseKeyDownHandler();