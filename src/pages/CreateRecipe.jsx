import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../store/reducers/recipeReducer';
import loadImage from '../images/loadImage.webp';

const CreateRecipe = () => {
  const dispatch = useDispatch();
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    description: '',
    portions: 1,
    difficulty: 1,
    preparation_time: 0,
    preparation_hours: 0,
    preparation_minutes: 0,
    cooking_time: 0,
    cooking_hours: 0,
    cooking_minutes: 0,
    public: false,
    tips: '',
    image_url: '',
    recipe_ingredients_attributes: [],
    recipe_steps_attributes: [],
  });

  const handleSave = () => {
    const savingRecipe = {
      ...newRecipe,
      preparation_time:
        (parseFloat(newRecipe.preparation_hours * 60)
          + parseFloat(newRecipe.preparation_minutes)) || 0,
      cooking_time:
        (parseFloat(newRecipe.cooking_hours * 60)
          + parseFloat(newRecipe.cooking_minutes)) || 0,
    };

    setNewRecipe(savingRecipe);
    dispatch(createRecipe(savingRecipe));
  };

  const handleIngredientChange = (index, key, value) => {
    setNewRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.recipe_ingredients_attributes];
      newIngredients[index] = { ...newIngredients[index], [key]: value };
      return { ...prevRecipe, recipe_ingredients_attributes: newIngredients };
    });
  };

  const handleAddIngredient = () => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_ingredients_attributes: [...prevRecipe.recipe_ingredients_attributes, { name: '', quantity: '', unit: '' }],
    }));
  };

  const handleDeleteIngredient = (index) => {
    setNewRecipe((prevRecipe) => {
      const newIngredients = [...prevRecipe.recipe_ingredients_attributes];
      newIngredients.splice(index, 1);
      return { ...prevRecipe, recipe_ingredients_attributes: newIngredients };
    });
  };

  const handleStepChange = (index, key, value) => {
    setNewRecipe((prevRecipe) => {
      const newSteps = [...prevRecipe.recipe_steps_attributes];
      newSteps[index] = { ...newSteps[index], [key]: value };
      return { ...prevRecipe, recipe_steps_attributes: newSteps };
    });
  };

  const handleAddStep = () => {
    setNewRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_steps_attributes: [...prevRecipe.recipe_steps_attributes, { description: '' }],
    }));
  };

  const handleDeleteStep = (index) => {
    setNewRecipe((prevRecipe) => {
      const newSteps = [...prevRecipe.recipe_steps_attributes];
      newSteps.splice(index, 1);
      return { ...prevRecipe, recipe_steps_attributes: newSteps };
    });
  };

  return (
    <div className="header-space m-4 mb-5">
      <div className="menu sticky-top">
        <button onClick={() => handleSave()} type="button" className="btn btn-success">
          Save
        </button>
      </div>
      <div style={{ maxWidth: '720px', maxHeight: '480px' }} className="overflow-hidden">
        <img
          src={newRecipe.image_url ? newRecipe.image_url : loadImage}
          className="card-img-top img-fluid"
          alt="recipe"
        />
      </div>
      <div className="card-body">
        <div>
          <h1 className="my-4">
            <input
              className="fw-medium border"
              type="text"
              placeholder="Recipe Name"
              value={newRecipe.name}
              onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            />
          </h1>
          <label className="form-check-label" htmlFor="public">
            <input
              className="form-check-input"
              type="checkbox"
              id="public"
              checked={newRecipe.public}
              onChange={(e) => setNewRecipe({ ...newRecipe, public: e.target.checked })}
            />
            Public
          </label>
        </div>
        <textarea
          className="form-control"
          value={newRecipe.description}
          placeholder="Recipe Description"
          onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
        />
        <div>
          <label htmlFor="portions">
            Portions:
            <input
              id="portions"
              type="number"
              value={newRecipe.portions}
              min={1}
              onChange={(e) => setNewRecipe({ ...newRecipe, portions: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label htmlFor="difficulty">
            Difficulty:
            <input
              id="difficulty"
              type="number"
              value={newRecipe.difficulty}
              min={1}
              max={5}
              onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
            />
          </label>
        </div>
        <p>
          <div>
            {'Preparation Time '}
            <label htmlFor="hours">
              (hours):
              <input
                id="hours"
                type="number"
                value={Math.floor(newRecipe.preparation_hours)}
                min={0}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  preparation_hours: e.target.value,
                })}
              />
            </label>
            <label htmlFor="minutes">
              (minutes):
              <input
                id="minutes"
                type="number"
                value={Math.floor(newRecipe.preparation_minutes)}
                min={0}
                max={59}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  preparation_minutes: e.target.value,
                })}
              />
            </label>
          </div>
        </p>
        <p>
          <div>
            {'Cooking Time '}
            <label htmlFor="hours">
              (hours):
              <input
                id="hours"
                type="number"
                value={Math.floor(newRecipe.cooking_hours)}
                min={0}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  cooking_hours: e.target.value,
                })}
              />
            </label>
            <label htmlFor="minutes">
              (minutes):
              <input
                id="minutes"
                type="number"
                value={Math.floor(newRecipe.cooking_minutes)}
                min={0}
                max={59}
                onChange={(e) => setNewRecipe({
                  ...newRecipe,
                  cooking_minutes: e.target.value,
                })}
              />
            </label>
          </div>
        </p>
      </div>
      <div className="card-body">
        <h5>Ingredients:</h5>
        <div>
          {newRecipe.recipe_ingredients_attributes.map((ingredient, index) => (
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
      </div>
      <div className="card-body">
        <h5>Steps:</h5>
        <div>
          {newRecipe.recipe_steps_attributes.map((step, index) => (
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
      </div>
      <div className="card-body">
        <h5>Tips:</h5>
        <textarea
          className="form-control"
          value={newRecipe.tips}
          onChange={(e) => setNewRecipe({ ...newRecipe, tips: e.target.value })}
        />
      </div>
    </div>
  );
};

export default CreateRecipe;
