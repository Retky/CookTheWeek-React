import PropTypes from 'prop-types';
import loadImage from '../images/loadImage.webp';

const RecipeCard = ({ recipe, handleRecipeClick }) => (
  <div
    key={recipe.id}
    className="col-md-6 mb-4"
    aria-hidden="true"
    onClick={handleRecipeClick}
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleRecipeClick();
      }
    }}
  >
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
);

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  handleRecipeClick: PropTypes.func.isRequired,
};

export default RecipeCard;
