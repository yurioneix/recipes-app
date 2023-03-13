import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { fetchRecipesDeetailsDrinks, fetchFoodsOrDrinks } from '../services/fetchRecipes';
import compartilhar from '../images/shareIcon.svg';
import favoritar from '../images/whiteHeartIcon.svg';

export function DetailsDrinks({ id, pathname }) {
  const [newDrinks, setNewDrinks] = useState({ drinks: [] });
  const [recomedation, setRecomendation] = useState([]);
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    clipboardCopy(window.location.href);
    if (copied === false) {
      setCopied(true);
    } else {
      setCopied(false);
    }
  };
  return (
    <div className="bg-red-900">
      {newDrinks.drinks.map(
        ({ strDrink, strDrinkThumb, strInstructions, strAlcoholic }) => (
          <div key={ strDrink }>
            <h1 data-testid="recipe-title">{strDrink}</h1>
            <p data-testid="recipe-category">{strAlcoholic}</p>
            <p>{`Drink Alcoholic: ${strAlcoholic}`}</p>
            <img src={ strDrinkThumb } alt={ strDrink } data-testid="recipe-photo" />
            <div>
              <button
                data-testid="share-btn"
                onClick={ handleCopy }
              >
                <img src={ compartilhar } alt="Compartilhar" />
              </button>
              <img src={ favoritar } data-testid="favorite-btn" alt="Favotirar" />
            </div>
            {copied && <span>Link copied!</span>}
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
              position: 'fixed',
              bottom: '0',
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
