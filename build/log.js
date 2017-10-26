define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * utils/log
   *
   * 日志
   */

  // 日志级别
  var LogLevel = {
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug',
    INFO: 'info',
    TRACE: 'trace'
  };

  var _Log = {
    __reporter: function __reporter(data) {
      /* eslint-disable no-console */
      console.log(JSON.stringify(data));
    },
    setReporter: function setReporter(r) {
      _Log.__reporter = r;
    }
  };

  var _report = function _report(_LEVEL, info) {
    var data = _extends({
      _LEVEL: _LEVEL
    }, info);

    _Log.__reporter(data);
  };

  Object.keys(LogLevel).forEach(function (k) {
    _Log[LogLevel[k]] = function (info) {
      return _report(LogLevel[k], info);
    };
  });

  var Log = _Log;

  exports.default = Log;
});