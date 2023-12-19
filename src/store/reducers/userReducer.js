const mockRecipes = [
  {
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
  },
  {
    id: 2,
    name: 'Some other recipe',
    description: 'Random description',
    portions: 1,
    difficulty: 1,
    preparation_time: 0.5,
    cooking_time: 0.5,
    public: true,
    tips: '',
    image_url: '',
  },
  {
    id: 3,
    name: 'Third recipe',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget ultricies ultrices, nunc nisl aliquam nunc',
    portions: 2,
    difficulty: 1,
    preparation_time: 1.2,
    cooking_time: 0.2,
    public: false,
    tips: '',
    image_url: '',
  },
];

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
