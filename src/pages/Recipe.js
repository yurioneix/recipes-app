import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';

export default function Recipe() {
  const { setShowHeader } = useContext(HeaderContext);
  const { showType, setShowType } = useContext(RecipesContext);
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
  }, [pathname, setShowType, setShowHeader]);

  return <div>{showType}</div>;
}
