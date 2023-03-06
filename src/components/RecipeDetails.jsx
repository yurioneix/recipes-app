import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  fetchRecipesDeetailsMeals,
} from '../services/fetchRecipes';

export function Meal({ id, pathname }) {
  console.log(pathname, id);
  const [newMeals, setNewMeals] = useState({ meals: [] });
  console.log(newMeals);

  useEffect(() => {
    if (pathname === `/meals/${id}` || pathname === `/drinks/${id}`) {
      const fetchMealsDetails = async () => {
        const response = await fetchRecipesDeetailsMeals(id);
        setNewMeals(response);
      };
      fetchMealsDetails();
    }
  }, [pathname, id]);

  /*  const oi = useCallback(() => {
    if (pathname === `/meals/${id}`) {
      const fetchMealsDetails = async () => {
        const response = await fetchRecipesDeetailsMeals(id);
        setNewMeals(response);
      };
      fetchMealsDetails();
    return oi;
  }, [setNewMeals, id, pathname]); */

  const ingredients = newMeals.meals.reduce((acc, meal) => {
    // Separando os ingredientes da refeição atual
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strIngredient') && value !== '')
      .map((value) => value);
    // Adicionando os ingredientes da refeição na lista acumulada
    return [...acc, ...mealIngredients];
  }, []);
  console.log(ingredients);

  const mensuares = newMeals.meals.reduce((acc, meal) => {
    // Separando os ingredientes da refeição atual
    const mealIngredients = Object.entries(meal)
      .filter(([key, value]) => key.startsWith('strMeasure') && value !== ' ')
      .map((value) => value);
    // Adicionando os ingredientes da refeição na lista acumulada
    return [...acc, ...mealIngredients];
  }, []);
  console.log(mensuares);

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
      {ingredients.map((item, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {item}
        </p>
      ))}
      {mensuares.map((item, index) => (
        <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {item}
        </p>
      ))}
      ;
    </div>
  );
}

/* data-testid="${index}-ingredient-name-and-measure" */

Meal.propTypes = {
  id: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};
