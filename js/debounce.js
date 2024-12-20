'use strict';

(function() {
  const DEBOUNCE_INTERVAL = 500;

  window.debounce = function(func) {
    let timeout = null;

    return function(...args) {
      if (timeout) {
        window.clearTimeout(timeout);
      }

      timeout = window.setTimeout(() => {
        func.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
