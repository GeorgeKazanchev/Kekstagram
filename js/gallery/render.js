'use strict';

(function() {
  const MAX_SHOWN_PICTURES = 33;

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
    const shownPictures = pictures.slice(0, MAX_SHOWN_PICTURES);

    shownPictures.forEach((picture) => {
      fragment.append(renderPicture(picture));
      const pictureElement = fragment.lastElementChild;
      pictureElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.preview.openPopup(picture);
      });
    });

    document.querySelectorAll('.picture').forEach((element) => {
      element.remove();
    });
    document.querySelector('.pictures').append(fragment);
  };

  const renderError = (errorMessage) => {
    const messageElement = errorMessageTemplate.content.cloneNode(true);

    messageElement.querySelector('.error__title').textContent = errorMessage;
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
