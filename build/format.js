'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desensitize = desensitize;
/**
 * 各种证件或账号脱敏
 * @param {String} s 需要脱敏的字符串
 * @param {Number} sn 首部可显示的字符数
 * @param {Number} en 尾部可显示的字符数
 */
function desensitize(s, sn) {
  var en = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (s === '' || s == null) {
    return;
  }

  var len = s.length;

  if (len <= sn) {
    return s;
  }

  if (len <= sn + en) {
    return s.substr(0, sn) + '*';
  }

  return '' + s.substr(0, sn) + s.substring(sn, len - en).replace(/[\s\S]/g, '*') + s.substr(-en);
}