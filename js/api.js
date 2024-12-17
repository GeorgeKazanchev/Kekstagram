'use strict';

(function() {
  const BASE_URL = 'http://localhost:3000';
  const TIMEOUT = 5000;
  const STATUS_OK = 200;

  const getXHR = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', () => {
      if (xhr.status === STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('timeout', () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединения');
    });

    return xhr;
  };

  const loadPictures = (onLoad, onError) => {
    const xhr = getXHR(onLoad, onError);
    xhr.open('GET', `${BASE_URL}/data`);
    xhr.send();
  };

  const uploadPhoto = (data, onLoad, onError) => {
    const xhr = getXHR(onLoad, onError);
    xhr.open('POST', `${BASE_URL}/`);
    xhr.send(data);
  };

  window.api = {
    loadPictures,
    uploadPhoto,
  };
})();
