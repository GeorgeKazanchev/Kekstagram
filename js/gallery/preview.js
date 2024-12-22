'use strict';

(function() {
  const COMMENTS_PORTION_SIZE = 5;

  const commentTemplate = document.querySelector('#comment');
  const previewElement = document.querySelector('.big-picture');
  const imageElement = previewElement.querySelector('.big-picture__img > img');
  const likesCountElement = previewElement.querySelector('.likes-count');
  const totalCommentsCountElement = previewElement.querySelector('.comments-count');
  const descriptionElement = previewElement.querySelector('.social__caption');
  const closeButtonElement = previewElement.querySelector('.big-picture__cancel');
  const commentsContainerElement = previewElement.querySelector('.social__comments');
  const commentsCountElement = previewElement.querySelector('.social__comment-count');
  const loadmoreButtonElement = previewElement.querySelector('.comments-loader');

  let loadmoreHandler = null;

  const renderComment = (comment) => {
    const commentElement = commentTemplate.content.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatarUrl;
    commentElement.querySelector('.social__text').textContent = comment.text;

    return commentElement;
  };

  const renderComments = (comments, containerElement) => {
    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      fragment.append(renderComment(comment));
    });

    containerElement.innerHTML = '';
    containerElement.append(fragment);

    commentsCountElement.childNodes[0].textContent = `${comments.length} из `;
    commentsCountElement.childNodes[2].textContent =
      ` ${(comments.length % 10 === 1 && comments.length !== 11) ? 'комментария' : 'комментариев'}`;
  };

  const setPreview = (picture) => {
    imageElement.src = picture.url;
    likesCountElement.textContent = picture.likes;
    totalCommentsCountElement.textContent = picture.comments.length;
    descriptionElement.textContent = picture.description;

    const shownComments = picture.comments.slice(0, COMMENTS_PORTION_SIZE);
    renderComments(shownComments, commentsContainerElement);
  };

  const getLoadmoreHandler = (allComments) => {
    let shownCommentsCount = Math.min(allComments.length, COMMENTS_PORTION_SIZE);

    return function() {
      shownCommentsCount += COMMENTS_PORTION_SIZE;
      const shownComments = allComments.slice(0, shownCommentsCount);
      renderComments(shownComments, commentsContainerElement);

      if (shownComments.length === allComments.length) {
        previewElement.querySelector('.comments-loader').classList.add('hidden');
      }
    };
  };

  const addLoadmoreHandler = (allComments) => {
    if (allComments.length > COMMENTS_PORTION_SIZE) {
      loadmoreButtonElement.classList.remove('hidden');
    } else {
      loadmoreButtonElement.classList.add('hidden');
    }

    loadmoreHandler = getLoadmoreHandler(allComments);
    loadmoreButtonElement.addEventListener('click', loadmoreHandler);
  };

  const removeLoadmoreHandler = () => {
    loadmoreButtonElement.removeEventListener('click', loadmoreHandler);
    loadmoreHandler = null;
  };

  const popupEscPressHandler = (evt) => {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  const openPopup = (picture) => {
    setPreview(picture);
    addLoadmoreHandler(picture.comments);
    previewElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', popupEscPressHandler);
    setTimeout(() => {
      closeButtonElement.focus();
    }, 0);
  };

  const closePopup = () => {
    removeLoadmoreHandler();
    previewElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', popupEscPressHandler);
  };

  closeButtonElement.addEventListener('click', () => {
    closePopup();
  });

  closeButtonElement.addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  });

  window.preview = {
    openPopup,
  };
})();
