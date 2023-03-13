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
    <div key={ item.id }>
      <div className="flex w-full justify-around">

        <Link to={ `${item.type}s/${item.id}` }>
          <p
            data-testid={ `${index}-horizontal-name` }
            className="bold text-xl"
          >
            {item.name}
          </p>
        </Link>
        <p data-testid={ `${index}-horizontal-top-text` } className="italic">
          {item.type === 'drink'
            ? `${item.nationality} - ${item.category} - ${item.alcoholicOrNot}`
            : `${item.nationality} - ${item.category}`}
        </p>
      </div>

      <Link to={ `${item.type}s/${item.id}` }>
        <img
          src={ item.image }
          data-testid={ `${index}-horizontal-image` }
          alt={ `${item.name}` }
          className="w-5/6 rounded-xl mx-auto"
        />
      </Link>

      <div className="flex justify-between">

        {item.type === 'meal'
        && item.tags
          .filter((_, index2) => index2 < 2)
          .map((tagName) => (
            <p key={ tagName } data-testid={ `${index}-${tagName}-horizontal-tag` }>
              {tagName}
            </p>
          ))}
        <p data-testid={ `${index}-horizontal-done-date` }>{item.doneDate}</p>
      </div>

      <div className="w-full flex justify-center py-4">
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
