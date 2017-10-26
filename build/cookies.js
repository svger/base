define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * utils/cookie
   *
   * Cookie 读写及删除
   */
  /**
   * 创建cookie
   * @todo 最后一个参数改为配置项，支持 path、secure、domain等参数
   * @method set
   * @param {string} name cookie的key值
   * @param {string} value cookie的value值
   * @param {string} days cookie的有效期
   */
  var set = exports.set = function set(name, value) {
    var days = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    var expires = '';

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toGMTString();
    }

    /* global document */
    document.cookie = name + '=' + value + expires + '; path=/';
  };

  /**
   * 获取指定cookie的值
   * @method get
   * @param {string} name 需要获取的cookie的名称
   * @returns 需要获取的cookie的值
   */
  var get = exports.get = function get(name) {
    var nameEQ = '' + name;
    var ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length + 1, c.length);
      }
    }

    return null;
  };

  /**
   * 删除指定cookie
   * @method remove
   * @param {string} name 需要删除的cookie的名称
   */
  var remove = exports.remove = function remove(name) {
    set(name, '', -1);
  };
});