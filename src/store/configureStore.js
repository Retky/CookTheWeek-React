import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import recipeReducer from './reducers/recipeReducer';

const reducer = combineReducers({
  user: userReducer,
  recipe: recipeReducer,
});

const store = configureStore({
  reducer,
});

export default store;
