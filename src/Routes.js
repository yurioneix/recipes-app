import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import HeaderContext from './context/HeaderContext';
import Recipe from './pages/Recipe';
import RecipeInProgress from './pages/RecipeInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function Routes() {
  const { showHeader } = useContext(HeaderContext);
  return (
    <div>
      {showHeader && <Header />}
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id" component={ Recipe } />
        <Route exact path="/meals/:id" component={ Recipe } />
        <Route exact path="/meals" component={ Recipes } />
        <Route exact path="/drinks" component={ Recipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </div>
  );
}
export default Routes;
