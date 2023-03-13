import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import HeaderContext from '../context/HeaderContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const { title, search, searchBar, setSearchBar } = useContext(HeaderContext);

  return (
    <div className="flex-flex-col bg-slate-300 py-2">
      <div className="flex w-full justify-around">
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="user Icon"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1 data-testid="page-title" className="text-3xl text-slate-800">{title}</h1>
        {search && (
          <button
            onClick={ () => setSearchBar(!searchBar) }
            data-testid="btn-search"
          >
            <img
              src={ searchIcon }
              alt="search Icon"
              data-testid="search-top-btn"
            />
          </button>
        )}
      </div>
      {searchBar && search && <SearchBar />}
    </div>
  );
}
