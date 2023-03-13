import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import Drinks from '../components/Drinks';
import Foods from '../components/Foods';
import Footer from '../components/Footer';

function Recipes() {
  const {
    location: { pathname },
  } = useHistory();
  const { setShowHeader, setTitle, setSearch } = useContext(HeaderContext);
  const { showType, setShowType } = useContext(RecipesContext);
  useEffect(() => {
    // estado para controlar a exibição do header
    setShowHeader(true);
    setSearch(true);
    // Estado do recipesContext criado para controlar o tipo de alimento que é exibido
    if (pathname.includes('meal')) {
      setShowType('meal');
    } else {
      setShowType('drinks');
    }
  }, [pathname, setShowType, setShowHeader, setSearch]);
  useEffect(() => {
    if (showType === 'meal') {
      setTitle('Meals');
    } else {
      setTitle('Drinks');
    }
  }, [showType, setTitle]);

  return (
    <div>
      {pathname === '/meals'
        ? <Foods pathname={ pathname } /> : <Drinks pathname={ pathname } />}
      <Footer />
    </div>
  );
}

export default Recipes;
