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
    image_url: 'https://i.pinimg.com/originals/a7/7f/36/a77f3610d99f1331d4d35e7a05ec17f8.jpg',
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
    ],
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
