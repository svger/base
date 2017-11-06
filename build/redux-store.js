'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.addReducer = exports.configureStore = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * utils/redux-store
                                                                                                                                                                                                     *
                                                                                                                                                                                                     * actions、reducers 可以按业务模块写在一个文件中，并通过 addReducer 动态添加到 store
                                                                                                                                                                                                     */


var rootReducer = function rootReducer() {};
var reducerCache = {};
var storeCache = {};

/**
 * 首次配置 Store, 设置初始 state 及中间件
 *
 * @param {Object} preloadedState 初始 state
 * @param {Array} middlewares 中间件列表
 */
var configureStore = exports.configureStore = function configureStore(preloadedState) {
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_reduxThunk2.default];

  var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares))(_redux.createStore);
  var store = createStoreWithMiddleware(rootReducer, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(function () {
      store.replaceReducer(storeCache);
    });
  }

  storeCache = store;

  return storeCache;
};

/**
 * 动态添加 reducer
 * @param {Object} reducers redux reducers
 */
var addReducer = exports.addReducer = function addReducer(reducers) {
  var reducerKeys = Object.keys(reducers);
  reducerKeys.forEach(function (key) {
    reducerCache[key] = reducers[key];
  });

  rootReducer = (0, _redux.combineReducers)(reducerCache);
  storeCache.replaceReducer(rootReducer);
};

// 单例
var store = exports.store = configureStore();