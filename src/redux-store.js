/**
 * utils/redux-store
 *
 * actions、reducers 可以按业务模块写在一个文件中，并通过 addReducer 动态添加到 store
 */
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

let rootReducer = () => {};
let reducerCache = {};
let storeCache = {};

/**
 * 首次配置 Store, 设置初始 state 及中间件
 *
 * @param {Object} preloadedState 初始 state
 * @param {Array} middlewares 中间件列表
 */
export const configureStore = (preloadedState, middlewares = [thunk]) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
  const store = createStoreWithMiddleware(!reducerCache ? rootReducer : combineReducers(reducerCache), preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(() => {
      store.replaceReducer(storeCache);
    });
  }

  storeCache = store;

  return storeCache;
}

/**
 * 动态添加 reducer
 * @param {Object} reducers redux reducers
 */
export const addReducer = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  reducerKeys.forEach((key) => {
    reducerCache[key] = reducers[key];
  });

  rootReducer = combineReducers(reducerCache);
  storeCache.replaceReducer(rootReducer);
}

