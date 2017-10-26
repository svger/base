/**
 * utils/log
 *
 * 日志
 */

// 日志级别
const LogLevel = {
  WARN: 'warn',
  ERROR: 'error',
  DEBUG: 'debug',
  INFO: 'info',
  TRACE: 'trace'
};

let _Log = {
  __reporter(data) {
    /* eslint-disable no-console */
    console.log(JSON.stringify(data));
  },

  /**
   * 设置上报函数
   * @param {function} r 上报函数
   */
  setReporter(r) {
    _Log.__reporter = r;
  }
};

const _report = (_LEVEL, info) => {
  const data = {
    _LEVEL,
    ...info
  };

  _Log.__reporter(data);
};

Object.keys(LogLevel).forEach((k) => {
  _Log[LogLevel[k]] = (info) => _report(LogLevel[k], info);
});

const Log = _Log;

export default Log;
