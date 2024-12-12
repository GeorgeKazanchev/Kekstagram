'use strict';

(function() {
  const getRandomArrayItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const getRandomInRange = (min = 0, max = 0) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  window.util = {
    getRandomArrayItem,
    getRandomInRange,
  };
})();
