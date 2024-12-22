'use strict';

(function() {
  const getRandomArrayIndex = (array) => {
    return Math.floor(Math.random() * array.length);
  };

  const getRandomArrayItem = (array) => {
    return array[getRandomArrayIndex(array)];
  };

  window.util = {
    getRandomArrayIndex,
    getRandomArrayItem,
  };
})();
