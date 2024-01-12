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
  const [editedRecipe, setEditedRecipe] = useState({});
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
      <div className="menu sticky-top">
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
        {editMode ? (
          <h1 className="my-4">
            <input
              className="fw-medium border"
              type="text"
              value={editedRecipe.name || recipe.name}
              onChange={(e) => setEditedRecipe({ ...editedRecipe, name: e.target.value })}
            />
          </h1>
        ) : (
          <h1 className="my-4">{recipe.name}</h1>
        )}
        {editMode ? (
          <textarea
            className="form-control"
            value={editedRecipe.description || recipe.description}
            onChange={(e) => setEditedRecipe({ ...editedRecipe, description: e.target.value })}
          />
        ) : (
          <p className="card-text">{recipe.description}</p>
        )}
        {editMode ? (
          <div>
            <label htmlFor="portions">
              Portions:
              <input
                id="portions"
                type="number"
                value={editedRecipe.portions || recipe.portions}
                min={1}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, portions: e.target.value })}
              />
            </label>
          </div>
        ) : (
          <p>
            Portions:
            {recipe.portions}
          </p>
        )}
        {editMode ? (
          <div>
            <label htmlFor="difficulty">
              Difficulty:
              <input
                id="difficulty"
                type="number"
                value={editedRecipe.difficulty || recipe.difficulty}
                min={1}
                max={5}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, difficulty: e.target.value })}
              />
            </label>
          </div>
        ) : (
          <p>
            Difficulty:
            {recipe.difficulty}
          </p>
        )}
        <p>
          {editMode ? (
            <div>
              <label htmlFor="hours">
                Preparation Time (hours):
                <input
                  id="hours"
                  type="number"
                  value={editedRecipe.hours || Math.floor(recipe.preparation_time)}
                  min={1}
                  onChange={(e) => setEditedRecipe({ ...editedRecipe, hours: e.target.value })}
                />
              </label>
              <label htmlFor="minutes">
                Preparation Time (minutes):
                <input
                  id="minutes"
                  type="number"
                  value={editedRecipe.minutes || Math.floor((recipe.preparation_time % 1) * 60)}
                  min={0}
                  max={59}
                  onChange={(e) => setEditedRecipe({ ...editedRecipe, minutes: e.target.value })}
                />
              </label>
            </div>
          ) : (
            <p>
              Preparation Time:
              {recipe.preparation_time && (
                `${Math.floor(recipe.preparation_time)}h ${Math.floor((recipe.preparation_time % 1) * 60)}m`
              )}
            </p>
          )}
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
              <li key={step.id}>
                {step.description}
              </li>
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
