const mockRecipes = [{
  name: 'Recipe',
  description: '',
  portions: 3,
  difficulty: 2,
  preparation_time: 0.75,
  cooking_time: 1,
  public: false,
  tips: '',
  image_url: '',
}];

const FETCH_RECIPES = 'FETCH_RECIPES';
const initialState = [];

export const fetchRecipes = () => ({
  type: FETCH_RECIPES,
  recipes: mockRecipes,
});

const reducer = (action, state = initialState) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.recipes;
    default:
      return state;
  }
};

export default reducer;
