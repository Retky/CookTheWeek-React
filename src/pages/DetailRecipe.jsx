import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import _isEqual from 'lodash/isEqual';
import { fetchRecipe, updateRecipe } from '../store/reducers/recipeReducer';
import loadImage from '../images/loadImage.webp';

const DetailRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const recipe = useSelector((store) => store.recipe);

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, [dispatch, id]);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSave = (editRecipe) => {
    if (!_isEqual(editRecipe, recipe)) {
      dispatch(updateRecipe(editRecipe));
    }
    setEditMode(false);
  };

  const recipeObject = () => {
    // TODO: create recipe object from DOM data
    const newRecipe = {};

    return newRecipe;
  };

  return (
    <div className="header-space m-4 mb-5">
      <div className="menu">
        <button onClick={handleEditMode} type="button" className={`btn ${editMode ? 'btn-danger' : 'btn-primary'}`}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && (
          <button onClick={() => handleSave(recipeObject())} type="button" className="btn btn-success">
            Save
          </button>
        )}
      </div>
      <div style={{ maxWidth: '720px', maxHeight: '480px' }} className="overflow-hidden">
        <img
          src={recipe.image_url ? recipe.image_url : loadImage}
          className="card-img-top img-fluid"
          alt="recipe"
        />
      </div>
      <div className="card-body">
        <h1 className="my-4">{recipe.name}</h1>
        <p className="card-text">{recipe.description}</p>
        <p>
          Portions:
          {recipe.portions}
        </p>
        <p>
          Difficulty:
          {recipe.difficulty}
        </p>
        <p>
          Preparation Time:
          {recipe.preparation_time}
          {' '}
          hours
        </p>
        <p>
          Cooking Time:
          {recipe.cooking_time}
          {' '}
          hours
        </p>
      </div>
      <div className="card-body">
        <h5>Ingredients:</h5>
        <ul>
          {recipe.recipe_ingredients_attributes
            && recipe.recipe_ingredients_attributes.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
                :
                {ingredient.quantity}
                {' '}
                {ingredient.unit}
              </li>
            ))}
        </ul>
      </div>
      <div className="card-body">
        <h5>Steps:</h5>
        <ol>
          {recipe.recipe_steps_attributes
            && recipe.recipe_steps_attributes.map((step) => (
              <li key={step.id}>{step.description}</li>
            ))}
        </ol>
      </div>
      <div className="card-body">
        <h5>Tips:</h5>
        {recipe.tips}
      </div>
    </div>
  );
};

export default DetailRecipe;
