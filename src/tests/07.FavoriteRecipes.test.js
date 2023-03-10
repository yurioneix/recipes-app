import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import storage from './helpers/mockLocalStorage';

describe('Testa página de Receitas Favoritas', () => {
  const favoriteRecipesRoute = '/favorite-recipes';
  it('Testa se ao entrar na tela de FavoriteRecipes, com localStorage setado, é renderizado as comidas corretamente', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [favoriteRecipesRoute] });

    const favoriteTitle = screen.getByRole('heading', {
      name: /favorite recipes/i,
    });
    expect(favoriteTitle).toBeInTheDocument();

    const arrabiata = screen.getByText(/arrabiata/i);
    expect(arrabiata).toBeInTheDocument();
    const category = screen.getByText(/italian - Vegetarian/i);
    expect(category).toBeInTheDocument();
  });
});
