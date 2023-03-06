import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import { fetchDetails } from '../services/fetchRecipes';

export default function RecipeInProgress() {
  const { id } = useParams();
  const { setShowType } = useContext(RecipesContext);
  const { setShowHeader } = useContext(HeaderContext);
  const [details, setDetails] = useState({});

  const {
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    // estado para controlar a exibição do header
    setShowHeader(false);
    // Estado do recipesContext criado para controlar o tipo de alimento que é exibido
    if (pathname.includes('meal')) {
      setShowType('meal');
    } else {
      setShowType('drinks');
    }
  }, [setShowType, setShowHeader, pathname]);


  useEffect(() => {
    const getDatails = async () => {
      const result =  await fetchDetails(pathname, id)
      setDetails(result)
    }
    getDatails();
    }, [])

  useEffect(() => console.log(details),[details])

  return (
    <main>
  <img src="recipe-photo.jpg" alt="Recipe Photo" data-testid="recipe-photo" />
      <h1 data-testid="recipe-title">Delicious Recipe</h1>
      <button data-testid="share-btn">Share</button>
      <button data-testid="favorite-btn">Favorite</button>
      <p data-testid="recipe-category">Main Course</p>
      <div data-testid="instructions">
        <p>Step 1: Do this</p>
        <p>Step 2: Do that</p>
        <p>Step 3: Enjoy!</p>
      </div>
      <button data-testid="finish-recipe-btn">Finish Recipe</button>
    </main>
  );
}
