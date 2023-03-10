import React, { useContext, useEffect, useState } from 'react';
import HeaderContext from '../context/HeaderContext';
import { getFavoritesRecipes } from '../services/utils';

export default function FavoriteRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Favorite Recipes');
    setSearch(false);
  }, [setShowHeader, setTitle, setSearch]);

  useEffect(() => {
    const favorites = getFavoritesRecipes();
    setFavoriteRecipes(favorites);
    console.log(favoriteRecipes);
  }, []);

  return (
    <div>
      <button data-testid="filter-by-all-btn">Filter All</button>
      <button data-testid="filter-by-meal-btn">Filter Meals</button>
      <button data-testid="filter-by-drink-btn">Filter Drinks</button>
      { favoriteRecipes?.length > 0
       && (
         favoriteRecipes.map((favorite, index) => (
           <div key={ favorite.id }>
             <p data-testid={ `${index}-horizontal-name` }>
               {favorite.name}
             </p>
             <p
               data-testid={ `${index}-horizontal-top-text` }
             >
               {`Categoria: ${favorite.category}`}
             </p>
             <img
               alt={ favorite.name }
               src={ favorite.image }
               data-testid={ `${index}-horizontal-image` }
             />
             <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
             <button data-testid={ `${index}-horizontal-favorite-btn` }>Like</button>
           </div>
         ))
       )}
    </div>
  );
}
