'use strict';

(function() {
  const pictures = window.data.generatePictures();
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    fragment.append(window.picture.renderPicture(picture));

    const pictureElement = fragment.lastElementChild;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      window.preview.openPreviewPopup(picture);
      window.preview.hidePreviewComments();
    });
  });

  document.querySelector('.pictures').append(fragment);
})();
