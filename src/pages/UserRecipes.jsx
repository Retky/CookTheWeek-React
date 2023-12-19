import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/reducers/userReducer';

const UserRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="header-space">
      <h1>My Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name}
            <br />
            {recipe.description}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRecipes;
