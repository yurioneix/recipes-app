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
      <div className="w-100 flex justify-around my-3">
        <button
          data-testid="filter-by-all-btn"
          className="bg-blue-400 rounded-xl p-3 text-white"
        >
          Filter All
        </button>
        <button
          data-testid="filter-by-meal-btn "
          className="bg-blue-400 rounded-xl p-3 text-white"
        >
          Filter Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          className="bg-blue-400 rounded-xl p-3 text-white"
        >
          Filter Drinks
        </button>
      </div>

      {favoriteRecipes?.length > 0
        && favoriteRecipes.map((favorite, index) => (
          <div
            key={ favorite.id }
            className="max-w-sm rounded w-5/6 mx-auto overflow-hidden shadow-lg my-5"
          >
            <div className="flex w-100 justify-between">
              <p
                data-testid={ `${index}-horizontal-name` }
                className="text-gray-900 font-bold text-xl mb-2 text-center"
              >
                {favorite.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="text-gray-900 font-bold text-xl mb-2 text-center"
              >
                {`Categoria: ${favorite.category}`}
              </p>
            </div>

            <img
              className="w-full h-64 object-cover"
              alt={ favorite.name }
              src={ favorite.image }
              data-testid={ `${index}-horizontal-image` }
            />
            <div className="flex justify-between w-full">
              <button data-testid={ `${index}-horizontal-share-btn` }>
                Share
              </button>
              <button data-testid={ `${index}-horizontal-favorite-btn` }>
                Like
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
