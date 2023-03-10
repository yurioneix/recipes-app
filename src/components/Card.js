import React, { useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
// import RecipesContext from '../context/RecipesContext';

export default function Card(props) {
  // const { doneRecipesStorage } = useContext(RecipesContext);
  const { item, index } = props;
  const [copyBol, setCopyBol] = useState(false);
  const url = window.location.href.replace('/done-recipes', '');
  return (
    <div
      key={ item.id }
    >
      <Link to={ (`${item.type}s/${item.id}`) }>
        <img
          style={ { width: '80px' } }
          src={ item.image }
          data-testid={ `${index}-horizontal-image` }
          alt={ `${item.name}` }
        />
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { item.type === 'drink' ? (
          `${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`
        ) : (
          `${item.nationality} - ${item.category}`
        )}
      </p>
      <Link to={ (`${item.type}s/${item.id}`) }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { item.name }
        </p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { item.doneDate }
      </p>
      { item.type === 'meal' && (
        item.tags
          .filter((_, index2) => (
            index2 < 2
          )).map((tagName) => (
            <p
              key={ tagName }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              { tagName }
            </p>
          ))
      )}
      <button
        type="button"
        onClick={ () => {
          copy(`${url}/${item.type}s/${item.id}`);
          setCopyBol(true);
        } }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
      </button>
      {copyBol && <span>Link copied!</span>}
    </div>
  );
}

Card.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf([]),
  }).isRequired,
  index: PropTypes.number.isRequired,
}.isRequired;
