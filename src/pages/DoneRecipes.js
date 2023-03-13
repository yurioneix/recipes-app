import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
// import { getDoneRecipes } from '../services/utils';

export default function DoneRecipes() {
  const { setShowHeader, setTitle, setSearch } = useContext(HeaderContext);
  const { doneRecipesStorage, setDoneRecipesStorage } = useContext(RecipesContext);

  useEffect(() => {
    setShowHeader(true);
    setSearch(false);
    setTitle('Done Recipes');
  }, [setShowHeader, setTitle, setSearch]);

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setDoneRecipesStorage(done);
  }, []);

  return (
    <div>
      <div className="flex justify-around my-5">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
            setDoneRecipesStorage(done);
          } }
          className="bg-blue-400 rounded-xl w-1/6 text-white"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => {
            const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
            setDoneRecipesStorage(done.filter(({ type }) => type === 'meal'));
          } }
          className="bg-blue-400 rounded-xl w-1/6 text-white"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            const done = JSON.parse(localStorage.getItem('doneRecipes')) || [];
            setDoneRecipesStorage(done.filter(({ type }) => type === 'drink'));
          } }
          className="bg-blue-400 rounded-xl w-1/6 text-white"
        >
          Drinks
        </button>
      </div>

      {doneRecipesStorage?.length > 0
        && doneRecipesStorage.map((item, index) => (
          <Card key={ item.name } item={ item } index={ index } />
        ))}
    </div>
  );
}
