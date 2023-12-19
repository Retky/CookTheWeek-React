import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';

const reducer = combineReducers({
  // Mock reducer
  counter: () => 1,
});

const store = createStore(
  reducer,
  applyMiddleware(),
);

export default store;
