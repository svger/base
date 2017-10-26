define(['exports', './lang', './storage', './log', './cookies'], function (exports, _lang, _storage, _log, _cookies2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cookies = exports.Log = exports.Storage = exports.Lang = undefined;

  var _Lang = _interopRequireWildcard(_lang);

  var _Storage = _interopRequireWildcard(_storage);

  var _Log = _interopRequireWildcard(_log);

  var _cookies = _interopRequireWildcard(_cookies2);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  exports.Lang = _Lang;
  exports.Storage = _Storage;
  exports.Log = _Log;
  exports.cookies = _cookies;
});