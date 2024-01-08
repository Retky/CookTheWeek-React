const mockRecipe = {
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
  ingredients: [
    {
      id: 1,
      name: 'Ingredient 1',
      quantity: 1,
      unit: 'kg',
    },
    {
      id: 2,
      name: 'Ingredient 2',
      quantity: 2,
      unit: 'kg',
    },
  ],
  steps: [
    {
      id: 1,
      description: 'Step 1',
    },
    {
      id: 2,
      description: 'Step 2',
    },
    {
      id: 3,
      description: 'Step 3',
    },
  ],
};

const initialState = {};

const FETCH_RECIPE = 'FETCH_RECIPE';

export const fetchRecipe = (recipeId) => ({
  type: FETCH_RECIPE,
  recipe: recipeId === 1 ? mockRecipe : null,
});

const reducer = (state = initialState, action) => { // eslint-disable-line default-param-last
  switch (action.type) {
    case FETCH_RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

export default reducer;
