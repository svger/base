define(['exports', './lang', './storage'], function (exports, _lang, _storage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Storage = exports.Lang = undefined;

  var _lang2 = _interopRequireDefault(_lang);

  var _storage2 = _interopRequireDefault(_storage);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Lang = _lang2.default;
  exports.Storage = _storage2.default;
});