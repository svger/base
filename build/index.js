'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Responsive = exports.Sign = exports.Dom = exports.Format = exports.Cookies = exports.Log = exports.Storage = exports.Lang = undefined;

var _lang = require('./lang');

var _Lang = _interopRequireWildcard(_lang);

var _storage = require('./storage');

var _Storage = _interopRequireWildcard(_storage);

var _log = require('./log');

var _Log = _interopRequireWildcard(_log);

var _cookies = require('./cookies');

var _Cookies = _interopRequireWildcard(_cookies);

var _format = require('./format');

var _Format = _interopRequireWildcard(_format);

var _dom = require('./dom');

var _Dom = _interopRequireWildcard(_dom);

var _sign = require('./sign');

var _Sign = _interopRequireWildcard(_sign);

var _responsive = require('./responsive');

var _Responsive = _interopRequireWildcard(_responsive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Lang = _Lang;
exports.Storage = _Storage;
exports.Log = _Log;
exports.Cookies = _Cookies;
exports.Format = _Format;
exports.Dom = _Dom;
exports.Sign = _Sign;
exports.Responsive = _Responsive;

/**
 * 其他第三方工具库
 *
 * `qs` 查询字符串 parse/stringify，支持多层级及数组
 * `ua-parser-js` 浏览器 userAgent 分析，支持国产手机型号
 * `format-num` 格式化数字，小数位、千分符
 * `number-unit` 数字单位自定义
 * `parse-num` 解析数字
 * `moment` 日期时间处理 moment.utc('20171022152344', 'YYYYMMDDHHmmss').valueOf()
 * `js-cookie` 浏览器 cookie set get remove 操作，支持 cookie 编码解码
 */