import { BASE_URL } from './endpoint';

const initialState = {
  loading: false,
  error: null,
  token: null,
};

const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await fetch(`${BASE_URL}/users/tokens/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token: data.token,
        resource_owner: data.resource_owner,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message,
    });
  }
};

const reducer = (state = initialState, action) => { // eslint-disable-line default-param-last
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userId', action.payload.resource_owner.id);
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
