import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import recipeReducer from './reducers/recipeReducer';
import loginReducer from './reducers/loginReducer';

const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  recipe: recipeReducer,
});

const store = configureStore({
  reducer,
});

export default store;
