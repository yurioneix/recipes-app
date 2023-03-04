import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  fetchRecipesDeetailsDrinks,
} from '../services/fetchRecipes';

export function DetailsDrinks({ id, pathname }) {
  const [newDrinks, setNewDrinks] = useState({ drinks: [] });

  useEffect(() => {
    if (pathname === `/drinks/${id}`) {
      const fetchDrinksDetails = async () => {
        const response = await fetchRecipesDeetailsDrinks(id);
        setNewDrinks(response);
      };
      fetchDrinksDetails();
    }
  }, [pathname, id]);

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
      ;
    </div>
  );
}

DetailsDrinks.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
