import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchRecipesDeetailsDrinks,
  fetchFoodsOrDrinks,
} from '../services/fetchRecipes';

export function DetailsDrinks({ id, pathname }) {
  const [newDrinks, setNewDrinks] = useState({ drinks: [] });
  const [recomedation, setRecomendation] = useState([]);

  useEffect(() => {
    const fetchDrinksDetails = async () => {
      const response = await fetchRecipesDeetailsDrinks(id);
      setNewDrinks(response);
    };
    fetchDrinksDetails();

    const commentsRecipes = async () => {
      const length = 6;
      const response = await fetchFoodsOrDrinks('meal', length);
      setRecomendation(response);
    };
    commentsRecipes();
  }, [pathname, id]);
  console.log('oi', recomedation);

  const strIngredient = newDrinks.drinks.reduce((acc, meal) => {
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strIngredient') && value !== null)
      .map((value) => value);
    return [...acc, ...mealIngredients];
  }, []);

  const strMeasure = newDrinks.drinks.reduce((acc, meal) => {
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strMeasure') && value !== null)
      .map((value) => value);
    return [...acc, ...mealIngredients];
  }, []);

  const onClickLocalStorageDrinks = () => {
    if (localStorage.length > 0) {
      localStorage.setItem(id, JSON.stringify(strIngredient.map((item) => item)));
    }
  };
  return (
    <div>
      {newDrinks.drinks.map(
        ({ strDrink, strDrinkThumb, strInstructions, strAlcoholic }) => (
          <div key={ strDrink }>
            <h1 data-testid="recipe-title">{strDrink}</h1>
            <p data-testid="recipe-category">{strAlcoholic}</p>
            <p>{`Drink Alcoholic: ${strAlcoholic}`}</p>
            <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
            <p data-testid="instructions">{strInstructions}</p>
          </div>
        ),
      )}
      <h1>Ingredients</h1>
      {strIngredient.map((item, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {item}
        </p>
      ))}
      {strMeasure.map((item, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {item}
        </p>
      ))}
      <h1>Recommended</h1>
      <div
        style={ {
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          gap: '2rem',
          border: '1px solid red',
        } }
      >
        {recomedation.length > 0
          && recomedation.map(({ idMeal, strMeal, strMealThumb }, index) => (
            <div
              key={ idMeal }
              data-testid={ `${index}-recommendation-card` }
              style={ {
                height: '25rem',
                objectFit: 'contain',
                border: '1px solid blue',
                minWidth: '160px',
              } }
            >
              <h1 data-testid={ `${index}-recommendation-title` }>{strMeal}</h1>
              <img
                src={ strMealThumb }
                alt="Foto de Comida"
                data-testid={ `${index}-card-img` }
                style={ {
                  width: '100%',
                } }
              />
            </div>
          ))}
      </div>
      <Link to={ `/drinks/${id}/in-progress` }>
        {recomedation.length > 0 && (
          <button
            data-testid="start-recipe-btn"
            onClick={ onClickLocalStorageDrinks }
            style={ {
              width: '600px',
              position: 'fixed',
              bottom: '0',
              left: '50%',
              marginLeft: '-300px',
              padding: '1rem',
            } }
          >
            {localStorage.getItem(id) ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        )}
      </Link>
    </div>
  );
}

DetailsDrinks.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
