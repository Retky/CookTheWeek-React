import PropTypes from 'prop-types';
import loadImage from '../images/loadImage.webp';

const RecipeExpand = ({ recipe, handleRecipeClose }) => (
  <div
    className="container"
    onClick={handleRecipeClose}
    aria-hidden="true"
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleRecipeClose();
      }
    }}
  >
    <div className="row">
      <div className="col-md-12">
        <div className="card mb-4">
          <div className="image-container">
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
              {recipe.recipe_ingredients.map((ingredient) => (
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
              {recipe.recipe_steps.map((step) => (
                <li key={step.id}>{step.instructions}</li>
              ))}
            </ol>
          </div>
          <div className="card-body">
            <h5>
              Tips:
            </h5>
            {recipe.tips}
          </div>
        </div>
      </div>
    </div>
  </div>
);

RecipeExpand.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    portions: PropTypes.number.isRequired,
    difficulty: PropTypes.number,
    preparation_time: PropTypes.number.isRequired,
    cooking_time: PropTypes.number.isRequired,
    tips: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    recipe_ingredients: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
    ).isRequired,
    recipe_steps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        instructions: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  handleRecipeClose: PropTypes.func.isRequired,
};

export default RecipeExpand;
