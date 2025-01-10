'use strict';

(function() {
  const updateGallery = (pictures) => {
    window.render.gallery(pictures);
    window.filters.setPictures(pictures);
    window.filters.show();
  };

  const showError = (message) => {
    window.render.error(message);
  };

  window.api.loadPictures(updateGallery, showError);

  window.gallery = {
    update: updateGallery,
    showError,
  };
})();
