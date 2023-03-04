import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  fetchRecipesDeetailsMeals,
} from '../services/fetchRecipes';

export function Meal({ id, pathname }) {
  const [newId, setNewId] = useState([]);
  const [oid, setOid] = useState(false);

  useEffect(() => {
    const fetchId = async () => {
      const response = await fetchRecipesDeetailsMeals(id);
      setNewId(response);
      setOid(true);
    };
    fetchId();
  }, [setNewId, id, pathname]);

  return (
    <div>
      { oid
        && newId.map((oi) => console.log(oi))}
      {/*     <div>
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
