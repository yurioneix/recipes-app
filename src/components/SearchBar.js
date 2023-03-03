import React, { useContext, useCallback } from 'react';
import HeaderContext from '../context/HeaderContext';
import fetchRecipes from '../services/fetchRecipes';

export default function SearchBar() {
  const { selected, setSelected, setResult } = useContext(HeaderContext);

  const handleFilter = useCallback(async () => { // faz requisições a api através do que o usuário digitou e selecionou na SearchBar. Quando clica no botão search dispara essa função
    if (selected.searchRadio === 'firstLetter' && selected.searchInput.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
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
  }, [selected.searchRadio, selected.searchInput, setResult]);

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
        Ingredient
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingredient"
          name="searchRadio"
          onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
        />
      </label>
      <label
        htmlFor="nameSearch"
      >
        Name
        <input
          type="radio"
          id="nameSearch"
          data-testid="name-search-radio"
          value="name"
          name="searchRadio"
          onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
        />
      </label>
      <label
        htmlFor="firstLetterSearch"
      >
        First letter
        <input
          type="radio"
          id="firstLetterSearch"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          name="searchRadio"
          onChange={ (e) => setSelected({ ...selected, searchRadio: e.target.value }) }
        />
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
