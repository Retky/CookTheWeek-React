import { BASE_URL, API_VERSION } from './endpoint';

const FETCH_RECIPES = 'FETCH_RECIPES';
const initialState = [];

export const fetchRecipes = () => async (dispatch) => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const response = await fetch(`${BASE_URL}${API_VERSION}/users/${userId}/recipes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Fetching recipes failed');
    }

    const data = await response.json();

    dispatch({
      type: FETCH_RECIPES,
      recipes: data,
    });
  } catch (error) {
    console.error(error);
  }
};

// Redux require the params as: (state, action)
const reducer = (state = initialState, action) => { // eslint-disable-line default-param-last
  switch (action.type) {
    case FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};

export default reducer;
