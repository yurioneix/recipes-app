import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipesCard(props) {
  const { favorite, index } = props;
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
      <button>
        <img
          src={ shareIcon }
          alt={ favorite.name }
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
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
