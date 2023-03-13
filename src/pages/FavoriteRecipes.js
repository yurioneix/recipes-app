import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import { getFavoritesRecipes } from '../services/utils';
import FavoriteMealsCard from '../components/FavoriteMealsCard';
import RecipesContext from '../context/RecipesContext';
import FavoriteDrinksCard from '../components/FavoriteDrinksCard';

export default function FavoriteRecipes() {
  const { setTitle, setShowHeader, setSearch } = useContext(HeaderContext);

  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipesContext);

  useEffect(() => {
    setShowHeader(true);
    setTitle('Favorite Recipes');
    setSearch(false);
  }, [setShowHeader, setTitle, setSearch]);

  useEffect(() => {
    const favorites = getFavoritesRecipes();
    setFavoriteRecipes(favorites);
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

      {favoriteRecipes?.map((favorite, index) => (favorite.type === 'meal' ? (
        <FavoriteMealsCard
          key={ favorite.id }
          index={ index }
          favorite={ favorite }
        />
      ) : (
        <FavoriteDrinksCard
          key={ favorite.id }
          index={ index }
          favorite={ favorite }
        />
      )))}
    </div>
  );
}
