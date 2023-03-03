import React, { useContext } from 'react';
import HeaderContext from '../context/HeaderContext';

export default function SearchBar() {
  const { handleFilter, selected, setSelected } = useContext(HeaderContext);

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
