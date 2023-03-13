import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

export default function FoodCard({
  pathname = null,
  idMeal = null,
  idDrink = null,
  index = null,
  strMealThumb = null,
  strDrinkThumb = null,
  strMeal = null,
  strDrink = null,
}) {
  // console.log(props);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link
        to={ `${pathname}/${idMeal || idDrink}` }
        data-testid={ `${index}-recipe-card` }
      >
        <img
          className="w-full h-64 object-cover"
          src={ strMealThumb || strDrinkThumb }
          alt="Foto de Comida"
          data-testid={ `${index}-card-img` }
        />
        <div className="px-6 py-4">
          <p
            className="text-gray-900 font-bold text-xl mb-2 text-center"
            data-testid={ `${index}-card-name` }
          >
            {strMeal || strDrink}
          </p>
        </div>
      </Link>
    </div>
  );
}

FoodCard.propTypes = {
  idDrink: PropTypes.string,
  idMeal: PropTypes.string,
  index: PropTypes.number,
  pathname: PropTypes.string,
  strDrink: PropTypes.string,
  strDrinkThumb: PropTypes.string,
  strMeal: PropTypes.string,
  strMealThumb: PropTypes.string,
};
