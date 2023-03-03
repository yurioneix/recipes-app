import React, { useEffect, useState } from 'react';
import { fetchFoodsOrDrinks, fetchCategories } from '../services/fetchRecipes';

function Foods() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetchFoodsOrDrinks('meal');
      setRecipes(response);
    };
    getRecipes();
    const getCategories = async () => {
      const response = await fetchCategories('meal');
      setCategories(response);
    };
    getCategories();
  }, []);

  // console.log('recipessasdfasdfsas', categories);

  return (
    <div>
      {categories.map((item) => (
        <button data-testid={ `${item}-category-filter` } key={ item }>{item}</button>))}
      <div>
        {recipes.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>
              {strMeal}
            </p>
            <img
              src={ strMealThumb }
              alt="Foto de Comida"
              data-testid={ `${index}-card-img` }
            />
          </div>))}

      </div>
    </div>
  );
}

export default Foods;
