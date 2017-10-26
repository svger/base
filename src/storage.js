/**
 * utils/storage
 *
 * 本地存储
 */
import {
  isEmpty,
  isEmptyStr,
  isNullOrUndefined,
  sizeof
} from '../lang';

let safeData = {
  localStorage: [],
  sessionStorage: []
};

// 宿主
const HOST = window;
const NULL_VAL = '';

/**
 * 本地存储类型
 */
export const Types = {
  SESSION: 'sessionStorage',
  LOCAL: 'localStorage'
};


let errReporter = function (err) {
  /* eslint-disable no-console */
  console.log(err);
}

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
export function available(type) {
  let storage = HOST[type];

  try {
    let x = '__storage_test__';
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
export function getItem(type, key) {
  const store = HOST[type];

  try {
    let ret = store.getItem(key);

    if (isNullOrUndefined(ret)) {
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
export function setItem(type, key, val) {
  const store = HOST[type];

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
export function removeItem(type, key) {
  const store = HOST[type];

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
export function safeClearStorage(type, arr) {
  if (isEmpty(arr)) {
    return;
  }

  let storage = HOST[type];
  let tmp = [];
  // 暂存不需要删除的字段
  arr.forEach((key) => {
    const _cache = storage.getItem(key);

    if (!isEmptyStr(_cache)) {
      tmp.push([key, _cache]);
    }
  });

  storage.clear();

  // 恢复不需要删除的字段
  tmp.forEach((item) => {
    storage.setItem(item[0], item[1]);
  });
}

/**
 * 设置受保护的字段，避免被清除
 * @param {Array} local
 * @param {Array} session
 */
export function setProtectedKeys(local = [], session = []) {
  safeData.localStorage = local;
  safeData.sessionStorage = session;
}

/**
 * 设置错误日志上报函数
 * @param {function} reporter 出错后日志上报函数
 */
export function setErrReporter(reporter) {
  errReporter = reporter;
}

/**
 * 计算本地存储数据大小
 *
 * @param {string} type 存储类型 sessionStorage, localStorage
 * @returns {*}
 */
export function calcStorageDataSize(type) {
  const storage = HOST[type];

  if (!storage) {
    return 0;
  }

  if (storage && storage.getItem && storage.key && storage.length) {
    const len = storage.length;
    let str = '';
    let i = 0;
    while (i < len) {
      const key = storage.key(i);
      const val = storage.getItem(key);

      str += key + val;
      i++;
    }

    return sizeof(str);
  }

  return 0;
}
