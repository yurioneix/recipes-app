// função que pega todos os ingredientes
export function getIngredients(obj) {
  const ingredients = Object.keys(obj)
    .filter((key) => key.startsWith('strIngredient'))
    .map((key) => obj[key])
    .filter((value) => value !== '' && value !== null && value !== ' ');

  return ingredients;
}

// função que pega todos os ingredientes
export function getMeasurements(obj) {
  const ingredients = Object.keys(obj)
    .filter((key) => key.startsWith('strMeasure'))
    .map((key) => obj[key])
    .filter((value) => value && value.trim() !== '');

  return ingredients;
}

// função que confere se o item está no array
export const isInArray = (item, arr) => arr.some((el) => el === item);

export const isInArrayOfObj = (item, arr) => arr.some((el) => el.id === item);

// função que retorna o array sem o primeiro parametro
export const removeItem = (string, array) => array.filter((item) => item !== string);

export const removeFromArrayOfObj = (string, array) => array
  .filter((item) => item.id !== string);

// função que adiciona no local storage ao marcar
export const addLocalStorage = (item, type, id, arr) => {
  const obj = {
    [type]: {
      [id]: { checkedIngredients: [...arr, item] },
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

// função que remove os ingredientes do local storage ao desmarcar
export const removeLocalStorage = (item, type, id, arr) => {
  const obj = {
    [type]: {
      [id]: { checkedIngredients: arr.filter((el) => el !== item) },
    },
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
};

// função que copia o url para compartilhar
export const handleCopy = (callback) => {
  callback(true);
  const url = window.location.href.replace('/in-progress', '');
  navigator.clipboard.writeText(url);
};

export const getFavoritesRecipes = () => {
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (Array.isArray(favorites)) {
    return favorites;
  }
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  return [];
};

export const makeObjectToSave = (recipe, type) => ({
  id: recipe.idDrink || recipe.idMeal,
  type,
  nationality: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strDrink || recipe.strMeal,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
});

export const handleFavorite = (recipe, type) => {
  const favorites = getFavoritesRecipes();

  const objToSave = makeObjectToSave(recipe, type);

  if (isInArrayOfObj(objToSave.id, favorites)) {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(removeFromArrayOfObj(objToSave.id, favorites)),
    );
  } else {
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([...favorites, objToSave]),
    );
  }
};

export const getDoneRecipes = (recipe, type) => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const objToSave = makeObjectToSave(recipe, type);
  console.log(recipe);
  objToSave.doneDate = new Date().toISOString();
  if (type === 'meal') {
    objToSave.tags = recipe.strTags.split(',');
  } else {
    objToSave.tags = [];
  }
  if (!Array.isArray(doneRecipes)) {
    localStorage.setItem('doneRecipes', JSON.stringify([objToSave]));
  } else {
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipes, objToSave]),
    );
  }
};

export const instructionsClear = (instructions) => {
  const formatedText = instructions.split('\n');
  return formatedText;
};
