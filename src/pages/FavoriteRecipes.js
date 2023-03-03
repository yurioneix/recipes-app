import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function FavoriteRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Favorite Recipes');
    setSearch(false);
  }, [setShowHeader, setTitle, setSearch]);

  return (
    <div>FavoriteRecipes</div>
  );
}
