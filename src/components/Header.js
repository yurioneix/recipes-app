import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const { title, search, searchBar, setSearchBar } = useContext(HeaderContext);

  return (
    <div>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <img src={ profileIcon } alt="user Icon" data-testid="profile-top-btn" />
      </Link>
      {search && (
        <button onClick={ () => setSearchBar(!searchBar) } data-testid="btn-search">
          <img src={ searchIcon } alt="search Icon" data-testid="search-top-btn" />

        </button>
      )}
      {searchBar && search && <SearchBar />}
    </div>
  );
}
