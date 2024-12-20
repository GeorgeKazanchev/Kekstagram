'use strict';

(function() {
  const SHOWN_PICTURES_COUNT = 25;

  const pictureTemplate = document.querySelector('#picture');
  const errorMessageTemplate = document.querySelector('#error');

  const renderPicture = (picture) => {
    const pictureElement = pictureTemplate.content.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  const renderGallery = (pictures) => {
    const fragment = document.createDocumentFragment();
    const shownPictures = pictures.slice(0, SHOWN_PICTURES_COUNT);

    shownPictures.forEach((picture) => {
      fragment.append(renderPicture(picture));
      const pictureElement = fragment.lastElementChild;
      pictureElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.preview.openPreviewPopup(picture);
      });
    });

    document.querySelectorAll('.picture').forEach((elem) => elem.remove());
    document.querySelector('.pictures').append(fragment);
  };

  const renderError = (message) => {
    const messageElement = errorMessageTemplate.content.cloneNode(true);

    messageElement.querySelector('.error__title').textContent = message;
    const closeElement = messageElement.querySelector('.error__button');
    closeElement.textContent = 'Закрыть';

    closeElement.addEventListener('click', () => {
      document.querySelector('.error').remove();
    });

    document.body.prepend(messageElement);
  };

  window.render = {
    picture: renderPicture,
    gallery: renderGallery,
    error: renderError,
  };
})();
