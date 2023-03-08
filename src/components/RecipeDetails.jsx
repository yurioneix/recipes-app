import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchRecipesDeetailsMeals, fetchFoodsOrDrinks } from '../services/fetchRecipes';

export function Meal({ id }) {
  const [newMeals, setNewMeals] = useState({ meals: [] });
  const [drinks, setDrinks] = useState([]);
  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    const fetchMealsDetails = async () => {
      const response = await fetchRecipesDeetailsMeals(id);
      setNewMeals(response);
    };
    fetchMealsDetails();

    const result = async () => {
      const number = 6;
      const resultDrink = await fetchFoodsOrDrinks('cocktail', number);
      setDrinks(resultDrink);
    };
    result();
  }, [pathname, id]);

  const ingredients = newMeals.meals.reduce((acc, meal) => {
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strIngredient') && value !== '')
      .map((value) => value);
    return [...acc, ...mealIngredients];
  }, []);

  const mensuares = newMeals.meals.reduce((acc, meal) => {
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strMeasure') && value !== ' ')
      .map((value) => value);
    return [...acc, ...mealIngredients];
  }, []);

  return (
    <div>
      {newMeals.meals.map(
        ({ idMeal, strMeal, strMealThumb, strInstructions, strCategory, strYoutube }) => (
          <div key={ idMeal }>
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <p data-testid="recipe-category">{strCategory}</p>
            <img src={ strMealThumb } alt={ strMeal } data-testid="recipe-photo" />
            <p data-testid="instructions">{strInstructions}</p>
            {pathname === `/meals/${idMeal}` && (
              <iframe
                title="Video Explicativo"
                width="420"
                height="315"
                src={ strYoutube }
                data-testid="video"
              />
            )}
          </div>
        ),
      )}
      <h1>Ingredientes</h1>
      <ul>
        {ingredients.map((item, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {item}
          </li>
        ))}
      </ul>
      {mensuares.map((item, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {item}
        </p>
      ))}
      <div
        style={ {
          display: 'flex',
          overflowX: 'scroll',
          scrollSnapType: 'x mandatory',
          gap: '2rem',
          border: '1px solid red',
        } }
      >
        {drinks.length > 0
          && drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
            <div
              key={ idDrink }
              data-testid={ `${index}-recommendation-card` }
              style={ {
                height: '25rem',
                objectFit: 'contain',
                border: '1px solid blue',
                minWidth: '160px',
              } }
            >
              <h1 data-testid={ `${index}-recommendation-title` }>{strDrink}</h1>
              <img
                src={ strDrinkThumb }
                alt="Foto de Comida"
                data-testid={ `${index}-card-img` }
                style={ {
                  width: '100%',
                } }
              />
            </div>
          ))}
      </div>
      <button
        data-testid="start-recipe-btn"
        style={ {
          width: '600px',
          position: 'fixed',
          bottom: '0',
          left: '50%',
          marginLeft: '-300px',
          padding: '1rem',
        } }
      >
        Start Recipe
      </button>
    </div>
  );
}

/* data-testid="${index}-ingredient-name-and-measure" */

Meal.propTypes = {
  id: PropTypes.string.isRequired,
};
