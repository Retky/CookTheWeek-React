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

  const updateEditedRecipe = () => {
    setEditedRecipe({
      id: recipe.id,
      name: recipe.name,
      description: recipe.description,
      portions: parseFloat(recipe.portions),
      difficulty: parseFloat(recipe.difficulty),
      preparation_time: parseFloat(recipe.preparation_time),
      preparation_hours: Math.floor(recipe.preparation_time / 60),
      preparation_minutes: Math.floor(recipe.preparation_time % 60),
      cooking_time: parseFloat(recipe.cooking_time),
      cooking_hours: Math.floor(recipe.cooking_time / 60),
      cooking_minutes: Math.floor(recipe.cooking_time % 60),
      public: recipe.public,
      tips: recipe.tips,
      image_url: recipe.image_url,
      recipe_ingredients_attributes: [...recipe.recipe_ingredients_attributes],
      recipe_steps_attributes: [...recipe.recipe_steps_attributes],
    });
  };

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, [dispatch, id]);

  const handleEditMode = () => {
    if (!editMode) {
      updateEditedRecipe();
    }
    setEditMode(!editMode);
  };

  const handleSave = () => {
    const savingRecipe = {
      ...editedRecipe,
      preparation_time:
        (parseFloat(editedRecipe.preparation_hours * 60)
          + parseFloat(editedRecipe.preparation_minutes)) || 0,
      cooking_time:
        (parseFloat(editedRecipe.cooking_hours * 60)
          + parseFloat(editedRecipe.cooking_minutes)) || 0,
    };

    setEditedRecipe(savingRecipe);

    delete savingRecipe.preparation_hours;
    delete savingRecipe.preparation_minutes;
    delete savingRecipe.cooking_hours;
    delete savingRecipe.cooking_minutes;

    if (!_isEqual(savingRecipe, recipe)) {
      dispatch(updateRecipe(savingRecipe));
    }
    setEditMode(false);
  };

  const handleIngredientChange = (index, key, value) => {
    setEditedRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.recipe_ingredients_attributes];
      newIngredients[index] = { ...newIngredients[index], [key]: value };
      return { ...prevRecipe, recipe_ingredients_attributes: newIngredients };
    });
  };

  const handleAddIngredient = () => {
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_ingredients_attributes: [...prevRecipe.recipe_ingredients_attributes, { name: '', quantity: '', unit: '' }],
    }));
  };

  const handleDeleteIngredient = (index) => {
    setEditedRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.recipe_ingredients_attributes];
      newIngredients.splice(index, 1);
      return { ...prevRecipe, recipe_ingredients_attributes: newIngredients };
    });
  };

  const handleStepChange = (index, key, value) => {
    setEditedRecipe((prevRecipe) => {
      const newSteps = [...prevRecipe.recipe_steps_attributes];
      newSteps[index] = { ...newSteps[index], [key]: value };
      return { ...prevRecipe, recipe_steps_attributes: newSteps };
    });
  };

  const handleAddStep = () => {
    setEditedRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_steps_attributes: [...prevRecipe.recipe_steps_attributes, { description: '' }],
    }));
  };

  const handleDeleteStep = (index) => {
    setEditedRecipe((prevRecipe) => {
      const newSteps = [...prevRecipe.recipe_steps_attributes];
      newSteps.splice(index, 1);
      return { ...prevRecipe, recipe_steps_attributes: newSteps };
    });
  };

  return (
    <div className="header-space m-4 mb-5">
      <div className="menu sticky-top">
        <button onClick={handleEditMode} type="button" className={`btn ${editMode ? 'btn-danger' : 'btn-primary'}`}>
          {editMode ? 'Cancel' : 'Edit'}
        </button>
        {editMode && (
          <button onClick={() => handleSave()} type="button" className="btn btn-success">
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
          <div>
            <h1 className="my-4">
              <input
                className="fw-medium border"
                type="text"
                value={editedRecipe.name}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, name: e.target.value })}
              />
            </h1>
            <label className="form-check-label" htmlFor="public">
              <input
                className="form-check-input"
                type="checkbox"
                id="public"
                checked={editedRecipe.public}
                onChange={(e) => setEditedRecipe({ ...editedRecipe, public: e.target.checked })}
              />
              Public
            </label>
          </div>
        ) : (
          <h1 className="my-4">{recipe.name}</h1>
        )}
        {editMode ? (
          <textarea
            className="form-control"
            value={editedRecipe.description}
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
                value={editedRecipe.portions}
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
                value={editedRecipe.difficulty}
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
              {'Preparation Time '}
              <label htmlFor="hours">
                (hours):
                <input
                  id="hours"
                  type="number"
                  value={Math.floor(editedRecipe.preparation_hours)}
                  min={0}
                  onChange={(e) => setEditedRecipe({
                    ...editedRecipe,
                    preparation_hours: e.target.value,
                  })}
                />
              </label>
              <label htmlFor="minutes">
                (minutes):
                <input
                  id="minutes"
                  type="number"
                  value={Math.floor(editedRecipe.preparation_minutes)}
                  min={0}
                  max={59}
                  onChange={(e) => setEditedRecipe({
                    ...editedRecipe,
                    preparation_minutes: e.target.value,
                  })}
                />
              </label>
            </div>
          ) : (
            <p>
              Preparation Time:
              {recipe.preparation_time && (
                `${Math.floor(recipe.preparation_time / 60)}h ${Math.floor(recipe.preparation_time % 60)}m`
              )}
            </p>
          )}
        </p>
        <p>
          {editMode ? (
            <div>
              {'Cooking Time '}
              <label htmlFor="hours">
                (hours):
                <input
                  id="hours"
                  type="number"
                  value={Math.floor(editedRecipe.cooking_hours)}
                  min={0}
                  onChange={(e) => setEditedRecipe({
                    ...editedRecipe,
                    cooking_hours: e.target.value,
                  })}
                />
              </label>
              <label htmlFor="minutes">
                (minutes):
                <input
                  id="minutes"
                  type="number"
                  value={Math.floor((editedRecipe.cooking_minutes))}
                  min={0}
                  max={59}
                  onChange={(e) => setEditedRecipe({
                    ...editedRecipe,
                    cooking_minutes: e.target.value,
                  })}
                />
              </label>
            </div>
          ) : (
            <p>
              Cooking Time:
              {recipe.preparation_time && (
                `${Math.floor(recipe.cooking_time / 60)}h ${Math.floor(recipe.cooking_time % 60)}m`
              )}
            </p>
          )}
        </p>
      </div>
      <div className="card-body">
        <h5>Ingredients:</h5>
        {editMode ? (
          <div>
            {editedRecipe.recipe_ingredients_attributes.map((ingredient, index) => (
              <div key={ingredient.id || index}>
                <label htmlFor={`ingredientName${index}`}>
                  Name:
                  <input
                    id={`ingredientName${index}`}
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                  />
                </label>
                <label htmlFor={`ingredientQuantity${index}`}>
                  Quantity:
                  <input
                    id={`ingredientQuantity${index}`}
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                  />
                </label>
                <label htmlFor={`ingredientUnit${index}`}>
                  Unit:
                  <input
                    id={`ingredientUnit${index}`}
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => handleDeleteIngredient(index)}>
                  Delete
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddIngredient}>
              Add Ingredient
            </button>
          </div>
        ) : (
          <ul>
            {recipe.recipe_ingredients_attributes
            && recipe.recipe_ingredients_attributes.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.name}
                {': '}
                {ingredient.quantity}
                {ingredient.unit}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-body">
        <h5>Steps:</h5>
        {editMode ? (
          <div>
            {editedRecipe.recipe_steps_attributes.map((step, index) => (
              <div key={step.id || index}>
                <label htmlFor={`stepDescription${index}`}>
                  {index + 1}
                  <input
                    id={`stepDescription${index}`}
                    type="text"
                    value={step.description}
                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                  />
                </label>
                <button type="button" onClick={() => handleDeleteStep(index)}>
                  Delete
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddStep}>
              Add Step
            </button>
          </div>
        ) : (
          <ol>
            {recipe.recipe_steps_attributes
              && recipe.recipe_steps_attributes.map((step) => (
                <li key={step.id}>
                  {step.description}
                </li>
              ))}
          </ol>
        )}
      </div>
      <div className="card-body">
        <h5>Tips:</h5>
        {editMode ? (
          <textarea
            className="form-control"
            value={editedRecipe.tips}
            onChange={(e) => setEditedRecipe({ ...editedRecipe, tips: e.target.value })}
          />
        ) : (
          <p className="card-text">{recipe.tips}</p>
        )}
      </div>
    </div>
  );
};

export default DetailRecipe;
