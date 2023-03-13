import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import favIcon from '../images/blackHeartIcon.svg';
import notFavIcon from '../images/whiteHeartIcon.svg';
import { handleFavorite } from '../services/utils';
import RecipesContext from '../context/RecipesContext';

export default function FavoriteButton({ isFavorite, setIsFavorite, recipeDetails }) {
  const { showType } = useContext(RecipesContext);

  function favorite() {
    handleFavorite(recipeDetails, showType);
    setIsFavorite(!isFavorite);
  }

  return (
    <button
      className="bg-slate-200 text-white font-bold py-2 px-4 rounded mb-2"
      onClick={ favorite }
    >
      <img
        data-testid="favorite-btn"
        src={ isFavorite ? favIcon : notFavIcon }
        alt="favorite"
      />
    </button>
  );
}

FavoriteButton.propTypes = {
  favorite: PropTypes.func,
  isFavorite: PropTypes.string,
}.isRequired;
