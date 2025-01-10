'use strict';

(function() {
  const FileFormatError = function(...params) {
    Error.apply(this, params);
    this.name = 'FileFormatError';
  };

  FileFormatError.prototype = Object.create(Error.prototype);

  window.FileFormatError = FileFormatError;
})();
