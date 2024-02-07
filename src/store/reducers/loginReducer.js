import BASE_URL from "./endpoint";

const initialState = {};

const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const loginRequest = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: userData }),
  });
  
  return {
    type: LOGIN_REQUEST,
    response,
  };
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default loginReducer;
