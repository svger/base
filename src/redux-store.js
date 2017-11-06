import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

let rootReducer = () => {};
let reducerCache = {}; //保存更新后的reducers列表
let storeCache = {}; //保存更新后的store状态

// applyMiddleware来自redux可以包装 store 的 dispatch
// thunk作用是使被 dispatch 的 function 会接收 dispatch 作为参数，并且可以异步调用它;
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

export const addReducer = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  reducerKeys.forEach((key) => {
    reducerCache[key] = reducers[key];
  });

  rootReducer = combineReducers(reducerCache);
  storeCache.replaceReducer(rootReducer);
}

