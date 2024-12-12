'use strict';

(function() {
  const pictureTemplate = document.querySelector('#picture');

  const renderPicture = (picture) => {
    const pictureElement = pictureTemplate.content.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  window.picture = {
    renderPicture,
  };
})();
