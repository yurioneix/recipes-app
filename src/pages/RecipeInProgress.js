import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import favIcon from '../images/blackHeartIcon.svg';
import notFavIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
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
    <main className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-2 text-center" data-testid="recipe-title">
        {details.strDrink || details.strMeal}
      </h1>
      <p className="text-gray-600 mb-4 text-center" data-testid="recipe-category">
        {details.strCategory}
      </p>

      <img
        className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
        src={ details.strDrinkThumb || details.strMealThumb }
        alt={ details.strDrink || details.strMeal }
        data-testid="recipe-photo"
      />
      <div className="w-full flex justify-between">
        <button
          className="bg-slate-200 text-white font-bold py-2 px-4 rounded mb-2"
          data-testid="share-btn"
          onClick={ () => handleCopy(setCopy) }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {copy && <p className="text-green-500">Link copied!</p>}
        <button
          onClick={ () => {
            handleFavorite(details, showType);
            setIsFavorite(!isFavorite);
          } }
        >
          <img
            className="w-8 h-8"
            data-testid="favorite-btn"
            src={ isFavorite ? favIcon : notFavIcon }
            alt="favorite"
          />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <h4 className="col-span-3 mb-2 text-center text-xl">Ingredientes</h4>
        {ingredients.toHave.map((ingredient, index) => (
          <label
            htmlFor={ ingredient }
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className={
              isInArray(ingredient, ingredients.checkedIngredients)
                ? 'checked-ingredient col-span-1 bg-gray-200 p-2 rounded'
                : 'col-span-1'
            }
          >
            <input
              name={ ingredient }
              type="checkbox"
              checked={ isInArray(ingredient, ingredients.checkedIngredients) }
              onChange={ () => handleIngredient(ingredient) }
              className="mr-2"
            />
            {ingredient}
          </label>
        ))}
      </div>

      <p className="text-gray-600 mb-4" data-testid="instructions">
        {details.strInstructions}
      </p>

      <button
        className="disabled:bg-green-200 bg-green-500
         hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl w-3/6"
        data-testid="finish-recipe-btn"
        disabled={ !isDisabled }
        onClick={ handleSave }
      >
        Finish Recipe
      </button>
    </main>
  );
}
