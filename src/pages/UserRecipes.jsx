import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/reducers/userReducer';
import RecipeCard from '../components/RecipeCard';
import '../styles/UserRecipes.css';

const UserRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="header-space container">
      <h1 className="text-center my-4">My Recipes</h1>
      <div className="row">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
