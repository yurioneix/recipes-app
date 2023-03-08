import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import favIcon from '../images/blackHeartIcon.svg';
import notFavIcon from '../images/whiteHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { fetchDetails } from '../services/fetchRecipes';
import {
  handleFavorite,
  getIngredients,
  isInArray,
  removeItem,
  addLocalStorage,
  removeLocalStorage,
  handleCopy,
  getFavoritesRecipes,
  isInArrayOfObj,
  getDoneRecipes,
} from '../services/utils';

export default function RecipeInProgress() {
  const { id } = useParams();
  const { showType, setShowType } = useContext(RecipesContext);
  const { setShowHeader } = useContext(HeaderContext);
  const [details, setDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState({
    toHave: [],
    checkedIngredients: [],
  });
  const [copy, setCopy] = useState(false);
  const {
    location: { pathname },
    push,
  } = useHistory();
  const isDisabled = ingredients.toHave.length === ingredients.checkedIngredients.length
    && ingredients.checkedIngredients.length !== 0;

  useEffect(() => {
    // estado para controlar a exibição do header
    setShowHeader(false);
    // Estado do recipesContext criado para controlar o tipo de alimento que é exibido
    if (pathname.includes('meal')) {
      setShowType('meal');
    } else {
      setShowType('drink');
    }
  }, [setShowType, setShowHeader, pathname]);

  useEffect(() => {
    const getDatails = async () => {
      const result = await fetchDetails(pathname, id);
      setDetails(result);
    };
    getDatails();
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // pega do local storage ao carregar a pagina
    if (id && showType && saved) {
      setIngredients((prev) => ({
        ...prev,
        checkedIngredients:
          saved && saved[showType] && saved[showType][id]
            ? saved[showType][id].checkedIngredients
            : [],
      }));
    }
    const favorites = getFavoritesRecipes();

    if (isInArrayOfObj(id, favorites)) {
      setIsFavorite(true);
    }
  }, [id, showType, pathname]);

  useEffect(() => {
    const items = getIngredients(details);
    setIngredients((prev) => ({ ...prev, toHave: items }));
  }, [details]);

  // Salva na lista sempre que seleciona um ingrediente

  const handleIngredient = (ingredient) => {
    // desfaz a marcação e adiciona na lista de remove marcados
    if (isInArray(ingredient, ingredients.checkedIngredients)) {
      removeLocalStorage(ingredient, showType, id, [
        ingredient,
        ...ingredients.checkedIngredients,
      ]);
      setIngredients((prev) => ({
        ...prev,
        checkedIngredients: removeItem(ingredient, prev.checkedIngredients),
      }));
    } else {
      // faz a marcação e adiciona a lista
      addLocalStorage(ingredient, showType, id, [
        ingredient,
        ...ingredients.checkedIngredients,
      ]);
      setIngredients((prev) => ({
        ...prev,
        checkedIngredients: [ingredient, ...prev.checkedIngredients],
      }));
    }
  };

  const handleSave = () => {
    getDoneRecipes(details, showType);
    push('/done-recipes');
  };

  return (
    <main>
      <h1 data-testid="recipe-title">{details.strDrink || details.strMeal}</h1>
      <img
        src={ details.strDrinkThumb || details.strMealThumb }
        alt={ details.strDrink || details.strMeal }
        data-testid="recipe-photo"
      />
      <button data-testid="share-btn" onClick={ () => handleCopy(setCopy) }>
        Share
      </button>
      {copy && <p>Link copied!</p>}
      <button
        onClick={ () => {
          handleFavorite(details, showType);
          setIsFavorite(!isFavorite);
        } }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? favIcon : notFavIcon }
          alt="favorite"
        />
      </button>
      <p data-testid="recipe-category">Main Course</p>

      <div>
        <h4>Ingredientes</h4>
        {ingredients.toHave.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={
              isInArray(ingredient, ingredients.checkedIngredients)
                ? 'checked-ingredient'
                : ''
            }
          >
            <input
              name={ ingredient }
              type="checkbox"
              checked={ isInArray(ingredient, ingredients.checkedIngredients) }
              onChange={ () => handleIngredient(ingredient) }
            />
            {ingredient}
          </label>
        ))}
      </div>
      <div data-testid="instructions">
        <p>Step 1: Do this</p>
        <p>Step 2: Do that</p>
        <p>Step 3: Enjoy!</p>
      </div>
      <button
        data-testid="finish-recipe-btn"
        disabled={ !isDisabled }
        onClick={ handleSave }
      >
        Finish Recipe
      </button>
    </main>
  );
}
