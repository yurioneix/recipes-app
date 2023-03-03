import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchFoodsOrDrinks,
  fetchCategories, filterMeals } from '../services/fetchRecipes';

function Foods(props) {
  const { pathname } = props;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      if (!isFiltered) {
        const response = await fetchFoodsOrDrinks('meal');
        setRecipes(response);
      }
    };
    getRecipes();

    const getCategories = async () => {
      const response = await fetchCategories('meal');
      setCategories(response);
    };
    getCategories();

    const filterByCategory = async () => {
      if (isFiltered) {
        const response = await filterMeals('meal', isFiltered);
        setRecipes(response);
      }
    };
    filterByCategory();
  }, [isFiltered]);

  console.log('filtered: ', isFiltered);

  return (
    <div>
      {categories.map((item) => (
        <button
          data-testid={ `${item}-category-filter` }
          key={ item }
          onClick={ () => setIsFiltered(item) }
        >
          {item}
        </button>))}
      <button
        data-testid="All-category-filter"
        onClick={ () => setIsFiltered('') }
      >
        All
      </button>

      <div>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link
            to={ `${pathname}/${idMeal}` }
            key={ idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>
              {strMeal}
            </p>
            <img
              src={ strMealThumb }
              alt="Foto de Comida"
              data-testid={ `${index}-card-img` }
            />
          </Link>))}

      </div>
    </div>
  );
}

Foods.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Foods;
