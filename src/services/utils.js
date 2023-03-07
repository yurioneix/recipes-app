export function getIngredients(obj) {
  const ingredients = [];

  for (let key in obj) {
    if (
      obj.hasOwnProperty(key) &&
      obj[key] !== "" &&
      obj[key] !== null &&
      key.startsWith("strIngredient")
    ) {
      ingredients.push(obj[key]);
    }
  }

  return ingredients;
}

export const isInArray = (item, arr) => arr.some((el) => el === item)
export const removeItem = (string, array) => array.filter(item => item !== string);


export const addLocalStorage = (item,type,id, arr) => {
      
    let obj = { 
      [type] : {
        [id] : {checkedIngredients: [...arr, item]}
      }
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj))
}

export const removeLocalStorage = (item,type,id, arr) => {
  let obj = { 
    [type] : {
      [id] : {checkedIngredients: arr.filter((el) => el !== item)}
    }
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj))
}