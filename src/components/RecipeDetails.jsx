import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { fetchRecipesDeetailsMeals,
  fetchRecipesDeetailsDrinks } from '../services/fetchRecipes';

export function Meal({ id, pathname }) {
  /* const { setRecipes } = useContext(RecipesContext); */
  const [newId, setNewId] = useState([]);
  console.log(newId);
  useEffect(() => {
    if (pathname === `/meals/${id}`) {
      const fetchId = async () => {
        if (id) {
          const response = await fetchRecipesDeetailsMeals(id);
          setNewId(response);
        } if (pathname === `/drinks/${id}`) {
          const response = await fetchRecipesDeetailsDrinks(id);
          setNewId((prevSelect) => ({
            ...prevSelect, response }));
        }
      };
      fetchId();
    }
  }, [setNewId, id, pathname]);

  return (
    <div>
      {
        newId.map((item) => (
          <figure key={ item.idMeal }>
            <img src={ item.strMealThumb } alt="strMealThumb" />
          </figure>
        ))
      }

      {/*   <div>
        <figure>
          <img src="#" alt="a" data-testid="recipe-photo" />
        </figure>
        <h1 data-testid="recipe-title">Title</h1>
        <p data-testid="recipe-category">Categoria</p>
      </div>
      <section>
        <p data-testid="${}-ingredient-name-and-measure">index do ingrediente</p>
        <p data-testid="instructions">Instruções</p>
      </section>
      <iframe
        title="video do youtube "
        data-testid="video"
        width="420"
        height="315"
        src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
      /> */}
    </div>
  );
}

Meal.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
