import React, { useEffect, useState } from 'react';
import { fetchFoodsOrDrinks, fetchCategories } from '../services/fetchRecipes';

function Drinks() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getRecipes = async () => {
      const response = await fetchFoodsOrDrinks('cocktail');
      setRecipes(response);
    };
    getRecipes();
    const getCategories = async () => {
      const response = await fetchCategories('cocktail');
      setCategories(response);
    };
    getCategories();
  }, []);

  // console.log('recipessasdfasdfsas', recipes[0]);

  return (
    <div>
      {categories.map((item) => (
        <button data-testid={ `${item}-category-filter` } key={ item }>{item}</button>))}
      <div>
        {recipes.map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>
              {strDrink}
            </p>
            <img
              src={ strDrinkThumb }
              alt="Foto de Comida"
              data-testid={ `${index}-card-img` }
            />
          </div>))}

      </div>
    </div>
  );
}

export default Drinks;
