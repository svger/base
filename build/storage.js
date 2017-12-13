'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Types = undefined;
exports.available = available;
exports.getItem = getItem;
exports.setItem = setItem;
exports.removeItem = removeItem;
exports.safeClearStorage = safeClearStorage;
exports.setProtectedKeys = setProtectedKeys;
exports.setErrReporter = setErrReporter;
exports.calcStorageDataSize = calcStorageDataSize;

var _lang = require('./lang');

var safeData = {
  localStorage: [],
  sessionStorage: []
};

// 宿主
/**
 * utils/storage
 *
 * 本地存储
 */
var HOST = process.env.BROWSER ? window : global;
var NULL_VAL = '';

/**
 * 本地存储类型
 */
var Types = exports.Types = {
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
};

var errReporter = function errReporter(err) {
  /* eslint-disable no-console */
  console.log(err);
};

/**
 * 检测本地存储是否支持
 *
 * @param {Types} type 本地存储类型 Types
 * @returns {boolean}
 * @example
 *
 * if (Storage.available('sessionStorage')) {
 *   sessionStorage.setItem('test', 'abc');
 * }
 */
function available(type) {
  var storage = HOST[type];

  try {
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);

    return true;
  } catch (e) {
    /* eslint-disable no-undef */
    return e instanceof DOMException && (
    // everything except Firefox
    e.code === 22 ||
    // Firefox
    e.code === 1014 ||
    // test name field too, because code might not be present
    // everything except Firefox
    e.name === 'QuotaExceededError' ||
    // Firefox
    e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
    // acknowledge QuotaExceededError only if there's something already stored
    storage.length !== 0;
  }
}

/**
 * 获取字段
 *
 * @param type
 * @param key
 * @returns {string}
 */
function getItem(type, key) {
  var store = HOST[type];

  try {
    var ret = store.getItem(key);

    if ((0, _lang.isNullOrUndefined)(ret)) {
      return NULL_VAL;
    }

    ret = JSON.parse(ret);

    return ret.data;
  } catch (e) {
    errReporter({
      name: 'getItem',
      type: type,
      error: e,
      message: e.message,
      stack: e.stack
    });
  }
}

/**
 * 设置字段
 * 本地存储的数据格式为包装过的 json 字符串：{ "data": val }
 *
 * @param type
 * @param key
 * @param val
 */
function setItem(type, key, val) {
  var store = HOST[type];

  try {
    store.setItem(key, JSON.stringify({
      data: val
    }));
  } catch (e) {
    errReporter({
      name: 'setItem',
      type: type,
      message: e.message,
      error: e,
      stack: e.stack
    });
    safeClearStorage(type, safeData[type]);
  }
}

/**
 * 删除指定字段
 *
 * @param type
 * @param key
 */
function removeItem(type, key) {
  var store = HOST[type];

  try {
    store.removeItem(key);
  } catch (e) {
    errReporter({
      name: 'removeItem',
      type: type,
      message: e.message,
      error: e,
      stack: e.stack
    });
  }
}

/**
 * 清除本地存储中非指定字段
 *
 * @param type
 * @param arr
 */
function safeClearStorage(type, arr) {
  if ((0, _lang.isEmpty)(arr)) {
    return;
  }

  var storage = HOST[type];
  var tmp = [];
  // 暂存不需要删除的字段
  arr.forEach(function (key) {
    var _cache = storage.getItem(key);

    if (!(0, _lang.isEmptyStr)(_cache)) {
      tmp.push([key, _cache]);
    }
  });

  storage.clear();

  // 恢复不需要删除的字段
  tmp.forEach(function (item) {
    storage.setItem(item[0], item[1]);
  });
}

/**
 * 设置受保护的字段，避免被清除
 * @param {Array} local
 * @param {Array} session
 */
function setProtectedKeys() {
  var local = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var session = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  safeData.localStorage = local;
  safeData.sessionStorage = session;
}

/**
 * 设置错误日志上报函数
 * @param {function} reporter 出错后日志上报函数
 */
function setErrReporter(reporter) {
  errReporter = reporter;
}

/**
 * 计算本地存储数据大小
 *
 * @param {string} type 存储类型 sessionStorage, localStorage
 * @returns {*}
 */
function calcStorageDataSize(type) {
  var storage = HOST[type];

  if (!storage) {
    return 0;
  }

  if (storage && storage.getItem && storage.key && storage.length) {
    var len = storage.length;
    var str = '';
    var i = 0;
    while (i < len) {
      var key = storage.key(i);
      var val = storage.getItem(key);

      str += key + val;
      i++;
    }

    return (0, _lang.sizeof)(str);
  }

  return 0;
}