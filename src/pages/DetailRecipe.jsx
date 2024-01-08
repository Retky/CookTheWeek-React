import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipe } from '../store/reducers/recipeReducer';

const DetailRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((store) => store.recipe);

  useEffect(() => {
    dispatch(fetchRecipe(id));
  }, [dispatch, id]);

  return (
    <div className="header-space container">
      <h1 className="text-center my-4">
        Recipe with id:
        {recipe.id}
      </h1>
    </div>
  );
};

export default DetailRecipe;
