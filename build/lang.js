define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isNull = isNull;
  exports.isUndefined = isUndefined;
  exports.isNullOrUndefined = isNullOrUndefined;
  exports.isEmptyStr = isEmptyStr;
  exports.isEmptyObj = isEmptyObj;
  exports.isEmpty = isEmpty;
  exports.sizeof = sizeof;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  /**
   * utils/lang
   * 语言增强
   */

  function isNull(s) {
    return s === null;
  }

  function isUndefined(s) {
    return s === undefined;
  }

  function isNullOrUndefined(s) {
    return isUndefined(s) || isNull(s);
  }

  function isEmptyStr(s) {
    return (typeof s === 'string' || s instanceof String) && s.trim() === '';
  }

  function isEmptyObj(s) {
    if ((typeof s === 'undefined' ? 'undefined' : _typeof(s)) !== 'object') {
      return false;
    }

    /* eslint-disable no-unused-vars */
    var name = null;

    for (name in s) {
      return false;
    }

    return true;
  }

  /**
   * @description 判空, null, undefined, 空字符, NaN, 空对象
   * @param {string|number|object|array} value
   * @returns {boolean}
   */
  function isEmpty(value) {
    if (Array.isArray(value)) {
      return value.length === 0;
    }

    return isNullOrUndefined(value) || isEmptyStr(value) || value === 'undefined' || value === 'null' || value.toString() === 'NaN' || isEmptyObj(value);
  }

  /**
   * 计算字符串所占的内存字节数，默认使用UTF-8的编码方式计算，也可制定为UTF-16
   * UTF-8 是一种可变长度的 Unicode 编码格式，使用一至四个字节为每个字符编码
   *
   * 000000 - 00007F(128个代码)      0zzzzzzz(00-7F)                             一个字节
   * 000080 - 0007FF(1920个代码)     110yyyyy(C0-DF) 10zzzzzz(80-BF)             两个字节
   * 000800 - 00D7FF
   * 00E000 - 00FFFF(61440个代码)    1110xxxx(E0-EF) 10yyyyyy 10zzzzzz           三个字节
   * 010000 - 10FFFF(1048576个代码)  11110www(F0-F7) 10xxxxxx 10yyyyyy 10zzzzzz  四个字节
   *
   * 注: Unicode在范围 D800-DFFF 中不存在任何字符
   * {@link http://zh.wikipedia.org/wiki/UTF-8}
   *
   * UTF-16 大部分使用两个字节编码，编码超出 65535 的使用四个字节
   * 000000 - 00FFFF  两个字节
   * 010000 - 10FFFF  四个字节
   *
   * {@link http://zh.wikipedia.org/wiki/UTF-16}
   * @param  {String} str
   * @param  {String} charset utf-8, utf-16
   * @return {Number}
   */
  function sizeof(str, charset) {
    var total = 0;
    var charCode = null;
    var i = 0;
    var len = str.length;
    charset = charset ? charset.toLowerCase() : '';

    if (charset === 'utf-16' || charset === 'utf16') {
      for (; i < len; i++) {
        charCode = str.charCodeAt(i);
        var step = charCode <= 0xffff ? 2 : 4;
        total += step;
      }
    } else {
      for (; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          total += 1;
        } else if (charCode <= 0x07ff) {
          total += 2;
        } else if (charCode <= 0xffff) {
          total += 3;
        } else {
          total += 4;
        }
      }
    }

    return total;
  }
});