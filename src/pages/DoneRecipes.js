import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function DoneRecipes() {
  const { setShowHeader, setTitle, setSearch } = useContext(HeaderContext);

  useEffect(() => {
    setShowHeader(true);
    setSearch(false);
    setTitle('Done Recipes');
  }, [setShowHeader, setTitle, setSearch]);

  return (
    <div>DoneRecipes</div>
  );
}
