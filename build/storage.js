define(['exports', '../lang'], function (exports, _lang) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getItem = getItem;
  exports.setItem = setItem;
  exports.removeItem = removeItem;
  exports.safeClearStorage = safeClearStorage;
  exports.setProtectedKeys = setProtectedKeys;
  exports.setErrReporter = setErrReporter;


  var safeData = {
    localStorage: [],
    sessionStorage: []
  };

  var errReporter = function errReporter(err) {
    /* eslint-disable no-console */
    console.log(err);
  };

  // 宿主
  var HOST = window;

  var NULL_VAL = '';

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
});