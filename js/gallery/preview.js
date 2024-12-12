'use strict';

(function() {
  const commentTemplate = document.querySelector('#comment');
  const previewElement = document.querySelector('.big-picture');
  const previewCloseElement = previewElement.querySelector('.big-picture__cancel');

  const renderComment = (comment) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    const imageNumber = window.util.getRandomInRange(1, 6);
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

  const setPreview = (picture) => {
    previewElement.querySelector('.big-picture__img > img').src = picture.url;
    previewElement.querySelector('.likes-count').textContent = picture.likes;
    previewElement.querySelector('.comments-count').textContent = picture.comments.length;
    previewElement.querySelector('.social__caption').textContent = picture.description;

    const commentsContainer = previewElement.querySelector('.social__comments');
    commentsContainer.innerHTML = '';
    renderComments(picture.comments, commentsContainer);
  };

  const hidePreviewComments = () => {
    previewElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    previewElement.querySelector('.social__comments-loader').classList.add('visually-hidden');
  };

  const previewPopupEscPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      closePreviewPopup();
    }
  };

  const openPreviewPopup = (picture) => {
    setPreview(picture);
    previewElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', previewPopupEscPressHandler);
  };

  const closePreviewPopup = () => {
    previewElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', previewPopupEscPressHandler);
  };

  previewCloseElement.addEventListener('click', () => {
    closePreviewPopup();
  });

  previewCloseElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePreviewPopup();
    }
  });

  window.preview = {
    openPreviewPopup,
    hidePreviewComments,
  };
})();
