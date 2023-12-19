const mockRecipes = [{
  id: 1,
  name: 'Test Recipe',
  description: 'A great description for a great recipe',
  portions: 3,
  difficulty: 2,
  preparation_time: 0.75,
  cooking_time: 1,
  public: false,
  tips: 'none o.<',
  image_url: '',
}];

const FETCH_RECIPES = 'FETCH_RECIPES';
const initialState = [];

export const fetchRecipes = () => ({
  type: FETCH_RECIPES,
  recipes: mockRecipes,
});

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
