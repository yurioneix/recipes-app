import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipes } from '../services/fetchRecipes';

export default function SearchBar() {
  const { selected, setSelected, setResult, result } = useContext(HeaderContext);
  const { showType } = useContext(RecipesContext);
  const history = useHistory();

  const handleFilter = useCallback(async () => {
    // faz requisições a api através do que o usuário digitou e selecionou na SearchBar. Quando clica no botão search dispara essa função
    if (
      selected.searchRadio === 'firstLetter'
      && selected.searchInput.length > 1
    ) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (showType === 'meal') {
      if (selected.searchRadio === 'ingredient') {
        setResult(
          await fetchRecipes(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selected.searchInput}`,
          ),
        );
      } else if (selected.searchRadio === 'name') {
        setResult(
          await fetchRecipes(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${selected.searchInput}`,
          ),
        );
      } else {
        setResult(
          await fetchRecipes(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${selected.searchInput}`,
          ),
        );
      }
    } else if (showType === 'drinks') {
      if (selected.searchRadio === 'ingredient') {
        setResult(
          await fetchRecipes(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selected.searchInput}`,
          ),
        );
      } else if (selected.searchRadio === 'name') {
        setResult(
          await fetchRecipes(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selected.searchInput}`,
          ),
        );
      } else {
        setResult(
          await fetchRecipes(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selected.searchInput}`,
          ),
        );
      }
    }
  }, [selected.searchRadio, selected.searchInput, setResult, showType]);

  useEffect(() => {
    if (result.drinks?.length === 1 || result.meals?.length === 1) {
      if (showType === 'meal') {
        const { idMeal } = result.meals[0];
        history.push(`/meals/${idMeal}`);
      } else if (showType === 'drinks') {
        const { idDrink } = result.drinks[0];
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [showType, result, history]);

  return (
    <form className="w-full">
      <div>
        <label htmlFor="searchInput">
          <input
            id="searchInput"
            type="text"
            className="border rounded-[4px] p-3 hover:outline-none
            focus:outline-none border-yellow-500 w-full mt-5"
            data-testid="search-input"
            value={ selected.searchInput }
            onChange={ (e) => setSelected({ ...selected, searchInput: e.target.value }) }
          />
        </label>
      </div>
      <div className="flex w-full justify-around mt-3">
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            data-testid="ingredient-search-radio"
            value="ingredient"
            name="searchRadio"
            onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            type="radio"
            id="nameSearch"
            data-testid="name-search-radio"
            value="name"
            name="searchRadio"
            onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
          />
          Name
        </label>
        <label htmlFor="firstLetterSearch">
          <input
            type="radio"
            id="firstLetterSearch"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            name="searchRadio"
            onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
          />
          First letter
        </label>
      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        className="mt-5 w-full border p-2 bg-gradient-to-r
         from-gray-800 bg-gray-500 text-white rounded-[4px]
         hover:bg-slate-400 scale-105 duration-300 disabled:text-gray-500"
        onClick={ () => {
          handleFilter();
          setSelected({
            searchInput: '',
            searchRadio: '',
          });
        } }
      >
        Search
      </button>
    </form>
  );
}
