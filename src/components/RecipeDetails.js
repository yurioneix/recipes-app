import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchFoodsOrDrinks, fetchDetails } from '../services/fetchRecipes';
import FavoriteButton from './FavoriteButton';
import {
  getMeasurements,
  getIngredients,
  getFavoritesRecipes,
  isInArrayOfObj,
  instructionsClear,
} from '../services/utils';
import ShareButton from './ShareButton';

export function RecipeDetails({ id }) {
  const [recipeDetails, setRecipeDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const {
    location: { pathname },
  } = useHistory();
  const [copied, setCopied] = useState(false);
  const [carousel, setCarousel] = useState([]);

  useEffect(() => {
    const fetchApiDetails = async () => {
      const response = await fetchDetails(pathname, id);
      setRecipeDetails(response);
    };
    fetchApiDetails();
  }, []);

  useEffect(() => {
    const getCarousel = async () => {
      const number = 6;
      let result = [];
      if (pathname.includes('meal')) {
        result = await fetchFoodsOrDrinks('cocktail', number);
        setCarousel(result);
      } else {
        result = await fetchFoodsOrDrinks('meal', number);
        setCarousel(result);
      }
    };
    getCarousel();
  }, []);

  // pega as receitas já salvas no localStorage
  useEffect(() => {
    const favorites = getFavoritesRecipes();

    if (isInArrayOfObj(id, favorites)) {
      setIsFavorite(true);
    }
  }, []);

  const ingredients = getIngredients(recipeDetails);
  const measurements = getMeasurements(recipeDetails);

  const onClickLocalStorage = () => {
    if (localStorage.length > 0) {
      localStorage.setItem(id, JSON.stringify(ingredients.map((item) => item)));
    }
  };

  console.log(recipeDetails);

  return (
    <div className="w-[100vw] mx-auto bg-slate-100 md:mt-5">
      <h1
        className="text-3xl text-red-900 mb-2 text-center"
        data-testid="recipe-title"
      >
        {recipeDetails.strDrink || recipeDetails.strMeal}
      </h1>
      <p
        className="mb-4 text-gray-600 text-center"
        data-testid="recipe-category"
      >
        {recipeDetails.strCategory}
        <br />
        {recipeDetails.strAlcoholic
          && `Drink Alcoholic: ${recipeDetails.strAlcoholic}`}
      </p>
      <div>
        <div className="w-5/6 object-cover rounded-lg shadow-md mb-4 md:w-3/6 mx-auto">
          <img
            src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
            alt={ recipeDetails.strDrink || recipeDetails.strMeal }
            className="rounded-lg mb-4"
            data-testid="recipe-photo"
          />
        </div>

        <div className="mb-4 flex justify-between md:w-3/6 mx-auto">
          <div className="flex w-5/6 justify-between mx-auto">
            <FavoriteButton
              isFavorite={ isFavorite }
              setIsFavorite={ setIsFavorite }
              recipeDetails={ recipeDetails }
            />
            <ShareButton setCopied={ setCopied } copied={ copied } />
          </div>
        </div>
        {copied && <span className="text-green-500 mb-4">Link copied!</span>}

        <div className="mb-4 w-80 mx-auto md:w-4/6" data-testid="instructions">
          {recipeDetails.strInstructions
            && instructionsClear(recipeDetails.strInstructions).map((el) => (
              <p key={ el } className="py-2 italic">{el}</p>
            ))}
        </div>

        {pathname.includes('meal') && (
          <iframe
            title="Video Explicativo"
            width="220"
            height="315"
            src={ recipeDetails.strYoutube }
            data-testid="video"
            className="mb-4 w-80 mx-auto"
          />
        )}
      </div>
      <div className="md:w-3/6 md:mx-auto mt-4 ">
        <h4 className="col-span-3 mb-2 text-center ">Ingredientes</h4>
        <ul className="w-80 mx-auto text-center grid grid-cols-3 gap-4 mb-4">
          {ingredients.map((item, index) => (
            <li
              key={ index }
              className="col-span-1"
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {measurements[index]}
              {' '}
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        className="flex overflow-x-scroll
      scroll-snap-x-mandatory gap-4 rounded-lg p-4"
      >
        {carousel.map((recipe, index) => (
          <div
            key={ recipe.idDrink || recipe.idMeal }
            data-testid={ `${index}-recommendation-card` }
            className="flex-shrink-0 flex-grow-0 w-3/6 flex
            flex-col justify-center items-center"
          >
            <h1
              className="text-xl font-bold mb-2 text-center"
              data-testid={ `${index}-recommendation-title` }
            >
              {recipe.strDrink || recipe.strMeal}
            </h1>
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt="Foto de Comida"
              data-testid={ `${index}-card-img` }
              className="rounded-lg w-40"
            />
          </div>
        ))}
      </div>
      <Link to={ `${pathname}/in-progress` }>
        {carousel.length > 0 && (
          <button
            data-testid="start-recipe-btn"
            onClick={ onClickLocalStorage }
            className="fixed bottom-0 bg-green-500 hover:bg-green-700
             text-white font-bold py-2 px-4 w-3/6 left-1/2
             transform -translate-x-1/2 rounded-xl"
          >
            {localStorage.getItem(id) ? 'Start Recipe' : 'Continue Recipe'}
          </button>
        )}
      </Link>
    </div>
  );
}

RecipeDetails.propTypes = {
  id: PropTypes.string,
}.isRequired;
