import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
// import { handleCopy } from '../services/utils';

export default function FavoriteRecipesCard(props) {
  const { favorite, index } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = (callback, id) => {
    callback(true);
    const url = window.location.href.replace('/favorite-recipes', `/meals/${id}`);
    navigator.clipboard.writeText(url);
  };

  return (
    <div key={ favorite.id }>
      <p data-testid={ `${index}-horizontal-name` }>
        {favorite.name}
      </p>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`${favorite.nationality} - ${favorite.category}`}
      </p>
      <img
        alt={ favorite.name }
        src={ favorite.image }
        data-testid={ `${index}-horizontal-image` }
      />
      <button onClick={ () => handleCopy(setCopied, favorite.id) }>
        <img
          src={ shareIcon }
          alt={ favorite.name }
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {copied && <span>Link copied!</span>}
      <button>
        <img
          src={ blackHeartIcon }
          alt={ favorite.name }
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

FavoriteRecipesCard.propTypes = {
  favorite: PropTypes.arrayOf().isRequired,
  index: PropTypes.number.isRequired,
};
