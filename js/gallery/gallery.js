'use strict';

(function() {
  const errorMessageTemplate = document.querySelector('#error');

  const PICTURES_COUNT = 25;

  const loadingSuccessHandler = (pictures) => {
    const fragment = document.createDocumentFragment();
    const shownPictures = pictures.slice(0, PICTURES_COUNT);

    shownPictures.forEach((picture) => {
      fragment.append(window.picture.renderPicture(picture));

      const pictureElement = fragment.lastElementChild;
      pictureElement.addEventListener('click', (evt) => {
        evt.preventDefault();
        window.preview.openPreviewPopup(picture);
        window.preview.hidePreviewComments();
      });
    });

    document.querySelector('.pictures').append(fragment);
  };

  const loadingErrorHandler = (message) => {
    const messageElement = errorMessageTemplate.content.cloneNode(true);

    messageElement.querySelector('.error__title').textContent = message;
    const closeElement = messageElement.querySelector('.error__button');
    closeElement.textContent = 'Закрыть';

    closeElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      document.querySelector('.error').remove();
    });

    document.body.prepend(messageElement);
  };

  window.api.loadPictures(loadingSuccessHandler, loadingErrorHandler);
})();
