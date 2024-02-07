import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/reducers/userReducer';
import RecipeCard from '../components/RecipeCard';
import RecipeExpand from '../components/RecipeExpand';
import '../styles/UserRecipes.css';

const UserRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.user);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleRecipeClick = (recipe) => () => {
    setSelectedRecipe(recipe);
  };

  const handleRecipeClose = () => {
    setSelectedRecipe(null);
  };

  console.log(recipes);

  return (
    <div className="header-space container">
      <h1 className="text-center my-4">My Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => {
          if (recipe === selectedRecipe) {
            return (
              <RecipeExpand
                key={recipe.id}
                recipe={recipe}
                handleRecipeClose={handleRecipeClose}
              />
            );
          }
          return (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleRecipeClick={handleRecipeClick(recipe)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default UserRecipes;
