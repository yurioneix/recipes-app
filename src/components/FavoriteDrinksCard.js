import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipesContext from '../context/RecipesContext';
import { getFavoritesRecipes } from '../services/utils';

export default function FavoriteRecipesCard(props) {
  const { favorite, index } = props;
  const [copied, setCopied] = useState(false);
  const { setFavoriteRecipes } = useContext(RecipesContext);

  const handleCopy = (callback, id) => {
    callback(true);
    const url = window.location.href.replace(
      '/favorite-recipes',
      `/drinks/${id}`,
    );
    navigator.clipboard.writeText(url);
  };

  const removeFromLocalStorage = (id) => {
    const favoriteRecipes = getFavoritesRecipes();
    const filteredFavoriteRecipes = favoriteRecipes.filter(
      (favorites) => favorites.id !== id,
    );
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(filteredFavoriteRecipes),
    );
    setFavoriteRecipes(filteredFavoriteRecipes);
  };

  return (
    <div
      key={ favorite.id }
      className="max-w-sm rounded overflow-hidden shadow-lg"
    >
      <div className="flex justify-around">
        <p
          data-testid={ `${index}-horizontal-name` }
          className="text-gray-900 font-bold text-xl mb-2 text-center"
        >
          {favorite.name}
        </p>
        <p
          data-testid={ `${index}-horizontal-top-text` }
          className="text-gray-900 font-bold text-xl mb-2 text-center"
        >
          {`${favorite.alcoholicOrNot}`}
        </p>
      </div>
      <img
        className="rounded-xl w-5/6 mx-auto"
        alt={ favorite.name }
        src={ favorite.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <div className="flex justify-around">
        <button onClick={ () => handleCopy(setCopied, favorite.id) }>
          <img
            src={ shareIcon }
            alt={ favorite.name }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        {copied && <span>Link copied!</span>}
        <button onClick={ () => removeFromLocalStorage(favorite.id) }>
          <img
            src={ blackHeartIcon }
            alt={ favorite.name }
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  favorite: PropTypes.arrayOf().isRequired,
  index: PropTypes.number.isRequired,
};
