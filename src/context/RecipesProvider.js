import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  // Ideia para controlar o tipo de conteudo que será exibido, meals/drinks
  const [showType, setShowType] = useState('');
  
  const contextValue = useMemo(
    () => ({ showType, setShowType }),
    [showType, setShowType],
  );

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
