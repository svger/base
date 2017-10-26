define(['exports', 'md5'], function (exports, _md) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.setSignSep = setSignSep;
  exports.sign = sign;
  exports.signLess = signLess;

  var _md2 = _interopRequireDefault(_md);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __signSep = '<=>';

  /**
   * 设置签名数据拼接时的分隔符
   *
   * @param {string} sep 分隔符
   */
  /**
   * utils/sign
   *
   * 接口签名
   */
  function setSignSep(sep) {
    __signSep = sep;
  }

  /**
   * 签名
   *
   * @param {string} data 数据字符串
   * @param {string} noncestr 随机串
   * @param {string} key 混入的关键业务字段
   */
  function sign(data, noncestr, key) {
    var arr = [noncestr, data, key];

    return (0, _md2.default)(arr.join(__signSep));
  }

  /**
   * 签名
   *
   * @description 不混入业务字段
   * @param {string} data 数据字符串
   * @param {*} noncestr 随机串
   */
  function signLess(data, noncestr) {
    var arr = [noncestr, data];

    return (0, _md2.default)(arr.join(__signSep));
  }
});