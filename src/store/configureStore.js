import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer,
});

export default store;