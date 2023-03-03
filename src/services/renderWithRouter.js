// src/renderWithRouter.js
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import HeaderProvider from '../context/HeaderProvider';
import RecipesProvider from '../context/RecipesProvider';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={ history }>
        <RecipesProvider>
          <HeaderProvider>{component}</HeaderProvider>
        </RecipesProvider>
        ,
      </Router>,
    ),
    history,
  };
};
export default renderWithRouter;
