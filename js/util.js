'use strict';

(function() {
  const getRandomArrayIndex = (arr) => {
    return Math.floor(Math.random() * arr.length);
  };

  const getRandomArrayItem = (arr) => {
    return arr[getRandomArrayIndex(arr)];
  };

  const getRandomInRange = (min = 0, max = 0) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.util = {
    getRandomArrayIndex,
    getRandomArrayItem,
    getRandomInRange,
  };
})();
