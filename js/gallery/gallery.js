'use strict';

(function() {
  const loadingSuccessHandler = (pictures) => {
    window.render.gallery(pictures);
    window.filters.setPictures(pictures);
    window.filters.show();
  };

  const loadingErrorHandler = (message) => {
    window.render.error(message);
  };

  window.api.loadPictures(loadingSuccessHandler, loadingErrorHandler);
})();
