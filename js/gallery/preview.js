'use strict';

(function() {
  const COMMENTS_PORTION_SIZE = 5;

  const commentTemplate = document.querySelector('#comment');
  const previewElement = document.querySelector('.big-picture');
  const previewCloseButton = previewElement.querySelector('.big-picture__cancel');
  const commentsContainer = previewElement.querySelector('.social__comments');
  const commentsCountElement = previewElement.querySelector('.social__comment-count');
  const loadmoreButton = previewElement.querySelector('.comments-loader');

  let loadmoreHandler = null;

  const renderComment = (comment) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatarUrl;
    commentElement.querySelector('.social__text').textContent = comment.text;

    return commentElement;
  };

  const renderComments = (comments, renderTo) => {
    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      fragment.append(renderComment(comment));
    });

    renderTo.innerHTML = '';
    renderTo.append(fragment);

    commentsCountElement.childNodes[0].textContent = `${comments.length} из `;
    commentsCountElement.childNodes[2].textContent =
      ` ${(comments.length % 10 === 1 && comments.length !== 11) ? 'комментария' : 'комментариев'}`;
  };

  const setPreview = (picture) => {
    previewElement.querySelector('.big-picture__img > img').src = picture.url;
    previewElement.querySelector('.likes-count').textContent = picture.likes;
    previewElement.querySelector('.comments-count').textContent = picture.comments.length;
    previewElement.querySelector('.social__caption').textContent = picture.description;

    const shownComments = picture.comments.slice(0, COMMENTS_PORTION_SIZE);
    renderComments(shownComments, commentsContainer);
  };

  const getLoadmoreCommentsHandler = (allComments) => {
    let shownCommentsCount = Math.min(allComments.length, COMMENTS_PORTION_SIZE);

    return function() {
      shownCommentsCount += COMMENTS_PORTION_SIZE;
      const shownComments = allComments.slice(0, shownCommentsCount);
      renderComments(shownComments, commentsContainer);

      if (shownComments.length === allComments.length) {
        previewElement.querySelector('.comments-loader').classList.add('hidden');
      }
    };
  };

  const addLoadmoreHandler = (allComments) => {
    if (allComments.length > COMMENTS_PORTION_SIZE) {
      loadmoreButton.classList.remove('hidden');
    } else {
      loadmoreButton.classList.add('hidden');
    }

    loadmoreHandler = getLoadmoreCommentsHandler(allComments);
    loadmoreButton.addEventListener('click', loadmoreHandler);
  };

  const removeLoadmoreHandler = () => {
    loadmoreButton.removeEventListener('click', loadmoreHandler);
    loadmoreHandler = null;
  };

  const previewPopupEscPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      closePreviewPopup();
    }
  };

  const openPreviewPopup = (picture) => {
    setPreview(picture);
    addLoadmoreHandler(picture.comments);
    previewElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', previewPopupEscPressHandler);
  };

  const closePreviewPopup = () => {
    removeLoadmoreHandler();
    previewElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', previewPopupEscPressHandler);
  };

  previewCloseButton.addEventListener('click', () => {
    closePreviewPopup();
  });

  previewCloseButton.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePreviewPopup();
    }
  });

  window.preview = {
    openPreviewPopup,
  };
})();
