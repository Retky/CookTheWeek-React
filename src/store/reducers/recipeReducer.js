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
  recipe_ingredients_attributes: [
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
  recipe_steps_attributes: [
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
const UPDATE_RECIPE = 'UPDATE_RECIPE';

export const fetchRecipe = (recipeId) => {
  const recipe = recipeId === '1' ? mockRecipe : {};
  return {
    type: FETCH_RECIPE,
    recipe,
  };
};

export const updateRecipe = (recipe) => {
  console.log('saving recipe', recipe);
  return {
    type: UPDATE_RECIPE,
    recipe,
  };
};

const reducer = (state = initialState, action) => { // eslint-disable-line default-param-last
  switch (action.type) {
    case FETCH_RECIPE:
      return action.recipe;
    case UPDATE_RECIPE:
      return action.recipe;
    default:
      return state;
  }
};

export default reducer;
