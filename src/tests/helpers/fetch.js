import meals from '../../../cypress/mocks/meals';
import oneMeal from '../../../cypress/mocks/oneMeal';
import soupMeals from '../../../cypress/mocks/soupMeals';
import beefMeals from '../../../cypress/mocks/beefMeals';
import breakfastMeals from '../../../cypress/mocks/breakfastMeals';
import chickenMeals from '../../../cypress/mocks/chickenMeals';
import dessertMeals from '../../../cypress/mocks/dessertMeals';
import goatMeals from '../../../cypress/mocks/goatMeals';
import emptyMeals from '../../../cypress/mocks/emptyMeals';
import mealCategories from '../../../cypress/mocks/mealCategories';
import mealIngredients from '../../../cypress/mocks/mealIngredients';
import mealsByIngredient from '../../../cypress/mocks/mealsByIngredient';
import drinks from '../../../cypress/mocks/drinks';
import oneDrink from '../../../cypress/mocks/oneDrink';
import ginDrinks from '../../../cypress/mocks/ginDrinks';
import ordinaryDrinks from '../../../cypress/mocks/ordinaryDrinks';
import cocktailDrinks from '../../../cypress/mocks/cocktailDrinks';
import milkDrinks from '../../../cypress/mocks/milkDrinks';
import otherDrinks from '../../../cypress/mocks/otherDrinks';
import cocoaDrinks from '../../../cypress/mocks/cocoaDrinks';
import emptyDrinks from '../../../cypress/mocks/emptyDrinks';
import drinkCategories from '../../../cypress/mocks/drinkCategories';
import drinkIngredients from '../../../cypress/mocks/drinkIngredients';
import drinksByIngredient from '../../../cypress/mocks/drinksByIngredient';
import areas from '../../../cypress/mocks/areas';
import japaneseMeals from '../../../cypress/mocks/japaneseMeals';
import italianMeals from '../../../cypress/mocks/italianMeals';
import oneDrinkId15997 from './oneDrinkId15997';
import drinkFirstLetterS from './drinkFirstLetterS';
import mealFirstLetterB from './mealFirstLetterB';

const validUrls = {
  'https://www.themealdb.com/api/json/v1/1/list.php?c=list': mealCategories,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list': drinkCategories,
  'https://www.themealdb.com/api/json/v1/1/list.php?i=list': mealIngredients,
  'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken': mealsByIngredient,
  'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list': drinkIngredients,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum': drinksByIngredient,
  'https://www.themealdb.com/api/json/v1/1/list.php?a=list': areas,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese': japaneseMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian': italianMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata': oneMeal,
  'https://www.themealdb.com/api/json/v1/1/random.php': oneMeal,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771': oneMeal,
  'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52977': oneMeal,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine': oneDrink,
  'https://www.thecocktaildb.com/api/json/v1/1/random.php': oneDrink,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319': oneDrink,
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15997': oneDrinkId15997,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=soup': soupMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef': beefMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast': breakfastMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken': chickenMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert': dessertMeals,
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat': goatMeals,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau': emptyMeals,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin': ginDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink': ordinaryDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail': cocktailDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Shake': milkDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown': otherDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa': cocoaDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau': emptyDrinks,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=': drinks,
  'https://www.themealdb.com/api/json/v1/1/search.php?s=': meals,
  'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=s': drinkFirstLetterS,
  'https://www.themealdb.com/api/json/v1/1/search.php?f=b': mealFirstLetterB,
};

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    const validUrl = validUrls[url];
    if (validUrl) {
      return Promise.resolve(validUrl);
    }
    return Promise.reject(new Error('Invalid url'));
  },
});

export default fetch;
