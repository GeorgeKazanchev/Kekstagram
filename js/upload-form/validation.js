'use strict';

(function() {
  const MAX_HASHTAGS_COUNT = 5;
  const MAX_HASHTAG_LENGTH = 20;

  const hashtagsInputElement = document.querySelector('.text__hashtags');
  const uploadSubmitElement = document.querySelector('.img-upload__submit');

  const validateHashtags = (hashtagsString) => {
    const hashtags = hashtagsString.split(' ').filter((str) => str.length > 0);

    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      hashtagsInputElement.setCustomValidity('Нельзя указать больше пяти хэш-тегов!');
      return;
    }

    for (let i = 0; i < hashtags.length; ++i) {
      const hashtag = hashtags[i];
      if (hashtag[0] !== '#') {
        hashtagsInputElement.setCustomValidity('Все хэш-теги должны начинаться с символа #!');
        return;
      }
      if (hashtag.length === 1) {
        hashtagsInputElement.setCustomValidity('Хэш-тег не должен состоять только из символа #!');
        return;
      }
      if (hashtag.length > MAX_HASHTAG_LENGTH) {
        hashtagsInputElement.setCustomValidity('Длина хэш-тега не должна превышать 20 символов!');
        return;
      }
    }

    const uniqueHashtags = Array.from(new Set(hashtags.map((hashtag) => hashtag.toLowerCase())));
    if (hashtags.length !== uniqueHashtags.length) {
      hashtagsInputElement.setCustomValidity('Нельзя использован один и тот же хэш-тег более одного раза!');
      return;
    }

    hashtagsInputElement.setCustomValidity('');   //  Сброс сообщения в setCustomValidity() если поле валидно
  };

  uploadSubmitElement.addEventListener('click', () => {
    validateHashtags(hashtagsInputElement.value);
  });
})();
