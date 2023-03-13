import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import {
  fetchFoodsOrDrinks,
  fetchCategories,
  filterMeals,
} from '../services/fetchRecipes';
import HeaderContext from '../context/HeaderContext';
import FoodCard from './FoodCard';

function Foods(props) {
  const { pathname } = props;
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState('');
  const { result } = useContext(HeaderContext);

  useEffect(() => {
    const getRecipes = async () => {
      const number = 12;
      if (!isFiltered) {
        const response = await fetchFoodsOrDrinks('meal', number);
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

  // perguntar o que é isso
  const teste = (item) => {
    if (isFiltered === item) setIsFiltered('');
    else setIsFiltered(item);
  };

  useEffect(() => {
    const limit = 12;
    if (
      result.meals !== undefined
      && result.meals !== null
      && result.meals.length > 1
    ) {
      const resultado = result.meals?.filter((_, index) => index < limit);
      setRecipes(resultado);
    } else if (result.meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [result, setRecipes]);

  return (
    <div className="mt-5 ">
      <div className="w-full flex justify-around ">
        {categories.length > 0
          && categories.map((item) => (
            <button
              data-testid={ `${item}-category-filter` }
              key={ item }
              onClick={ () => teste(item) }
              className="cursor-pointer"
            >
              {item}
            </button>
          ))}

        <button
          data-testid="All-category-filter"
          onClick={ () => setIsFiltered('') }
        >
          All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 w-5/6 mx-auto mt-4">
        {recipes.map((meal, index) => (
          <FoodCard { ...meal } index={ index } pathname={ pathname } key={ index } />
        ))}
      </div>
    </div>
  );
}

Foods.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Foods;
