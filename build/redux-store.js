'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addReducer = exports.configureStore = undefined;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var rootReducer = function rootReducer() {};
var reducerCache = {}; //保存更新后的reducers列表
var storeCache = {}; //保存更新后的store状态

// applyMiddleware来自redux可以包装 store 的 dispatch
// thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它;
var configureStore = exports.configureStore = function configureStore(preloadedState) {
  var middlewares = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [_reduxThunk2.default];

  var createStoreWithMiddleware = _redux.applyMiddleware.apply(undefined, _toConsumableArray(middlewares))(_redux.createStore);
  var store = createStoreWithMiddleware(!reducerCache ? rootReducer : (0, _redux.combineReducers)(reducerCache), preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(function () {
      store.replaceReducer(storeCache);
    });
  }

  storeCache = store;

  return storeCache;
};

var addReducer = exports.addReducer = function addReducer(reducers) {
  var reducerKeys = Object.keys(reducers);
  reducerKeys.forEach(function (key) {
    reducerCache[key] = reducers[key];
  });

  rootReducer = (0, _redux.combineReducers)(reducerCache);
  storeCache.replaceReducer(rootReducer);
};