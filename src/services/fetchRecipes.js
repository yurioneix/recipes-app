export const fetchRecipes = async (url) => {
  const request = await fetch(url);
  const response = await request.json();
  return response;
};

export const fetchFoodsOrDrinks = async (query, limit) => {
  try {
    const request = await fetchRecipes(
      `https://www.the${query}db.com/api/json/v1/1/search.php?s=`,
    );
    const result = (request.meals || request.drinks).filter((_, index) => index < limit);
    return result;
  } catch ({ message }) {
    return message;
  }
};

export const fetchCategories = async (query) => {
  const limit = 5;
  try {
    const request = await fetch(
      `https://www.the${query}db.com/api/json/v1/1/list.php?c=list`,
    );
    const response = await request.json();
    const result = (response.meals || response.drinks).filter(
      (_, index) => index < limit,
    );
    return result.map((item) => Object.values(item)[0]);
  } catch ({ message }) {
    return message;
  }
};

export const filterMeals = async (query, category) => {
  const limit = 12;
  try {
    const request = await fetchRecipes(
      `https://www.the${query}db.com/api/json/v1/1/filter.php?c=${category}`,
    );
    const result = (request.meals || request.drinks).filter((_, index) => index < limit);
    return result;
  } catch ({ message }) {
    return message;
  }
};

export const fetchRecipesDeetailsMeals = async (id) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();
    return data;
  } catch ({ message }) {
    return message;
  }
};

export const fetchRecipesDeetailsDrinks = async (id) => {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
    );
    const data = await response.json();
    return data;
  } catch ({ message }) {
    return message;
  }
};
