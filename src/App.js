import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Recipes from './pages/Recipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals" component={ Recipes } />
        <Route path="/drinks" component={ Recipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
