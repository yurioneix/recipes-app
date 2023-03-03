import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';

export default function RecipeInProgress() {
  const { setShowType } = useContext(RecipesContext);
  const { setShowHeader } = useContext(HeaderContext);
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

  return (
    <div>RecipeInProgress</div>
  );
}
