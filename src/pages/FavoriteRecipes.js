import React, { useContext, useEffect } from 'react';
import HeaderContext from '../context/HeaderContext';
import { getFavoritesRecipes } from '../services/utils';
import FavoriteMealsCard from '../components/FavoriteMealsCard';
import RecipesContext from '../context/RecipesContext';
import FavoriteDrinksCard from '../components/FavoriteDrinksCard';

export default function FavoriteRecipes() {
  const {
    setTitle,
    setShowHeader,
    setSearch,
  } = useContext(HeaderContext);

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
      <button data-testid="filter-by-all-btn">Filter All</button>
      <button data-testid="filter-by-meal-btn">Filter Meals</button>
      <button data-testid="filter-by-drink-btn">Filter Drinks</button>
      {
        favoriteRecipes?.map((favorite, index) => (
          favorite.type === 'meal' ? (
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
          )
        ))
      }
    </div>
  );
}
