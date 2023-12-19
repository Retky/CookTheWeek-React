import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/reducers/userReducer';
import loadImage from '../images/loadImage.webp';
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
          <div key={recipe.id} className="col-md-6 mb-4">
            <div className="card">
              <div className="image-container">
                <img
                  src={recipe.image_url ? recipe.image_url : loadImage}
                  className="card-img-top img-fluid"
                  alt="recipe"
                />
              </div>
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserRecipes;
