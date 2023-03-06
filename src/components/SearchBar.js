import React, { useContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import RecipesContext from '../context/RecipesContext';
import { fetchRecipes } from '../services/fetchRecipes';

export default function SearchBar() {
  const { selected, setSelected, setResult, result } = useContext(HeaderContext);
  const { showType } = useContext(RecipesContext);
  const history = useHistory();

  const handleFilter = useCallback(async () => { // faz requisições a api através do que o usuário digitou e selecionou na SearchBar. Quando clica no botão search dispara essa função
    if (selected.searchRadio === 'firstLetter' && selected.searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (showType === 'meal') {
      if (selected.searchRadio === 'ingredient') {
        setResult(await fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selected.searchInput}`,
        ));
      } else if (selected.searchRadio === 'name') {
        setResult(await fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${selected.searchInput}`,
        ));
      } else {
        setResult(await fetchRecipes(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${selected.searchInput}`,
        ));
      }
    } else if (showType === 'drinks') {
      if (selected.searchRadio === 'ingredient') {
        setResult(await fetchRecipes(
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selected.searchInput}`,
        ));
      } else if (selected.searchRadio === 'name') {
        setResult(await fetchRecipes(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${selected.searchInput}`,
        ));
      } else {
        setResult(await fetchRecipes(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${selected.searchInput}`,
        ));
      }
    }
  }, [selected.searchRadio, selected.searchInput, setResult, showType]);

  useEffect(() => {
    console.log(result);
    console.log('entrou na linha 49, antes do 1º if');
    if (result.drinks?.length === 1 || result.meals?.length === 1) {
      console.log('entrou na linha 51, após o 1º if');
      if (showType === 'meal') {
        const { idMeal } = result.meals[0];
        console.log('result[0]', result.meals[0]);
        history.push(`/meals/${idMeal}`);
      } else if (showType === 'drinks') {
        const { idDrink } = result.drinks[0];
        console.log('result[0]', result.drinks[0]);
        console.log('entrou na linha 59, após o if de drinks');
        history.push(`/drinks/${idDrink}`);
      }
    }
  }, [showType, result, history]);

  return (
    <form>
      <div>SearchBar</div>
      <label htmlFor="searchInput">
        <input
          id="searchInput"
          type="text"
          data-testid="search-input"
          value={ selected.searchInput }
          onChange={ (e) => setSelected({ ...selected, searchInput: e.target.value }) }
        />
      </label>
      <label
        htmlFor="ingredient"
      >
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
      <label
        htmlFor="nameSearch"
      >
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
      <label
        htmlFor="firstLetterSearch"
      >
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
      <button
        type="button"
        data-testid="exec-search-btn"
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
