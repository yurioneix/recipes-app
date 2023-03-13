import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('Testa se ao clicar no botão de desfavoritar, a comida some', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [favoriteRecipesRoute] });

    const favoriteButton0 = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favoriteButton0).toBeInTheDocument();

    userEvent.click(favoriteButton0);
    const arrabiata = screen.queryByText(/arrabiata/i);

    expect(arrabiata).not.toBeInTheDocument();
  });

  it.skip('Testa se ao clicar no botão de compartilhar de uma comida, é exibida a mensagem "Link copied!"', async () => {
    window.document.execCommand = jest.fn(() => true);
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [favoriteRecipesRoute] });

    const corbaShare = screen.getByTestId('1-horizontal-share-btn');
    expect(corbaShare).toBeInTheDocument();

    userEvent.click(corbaShare);
    await waitFor(() => {
      const linkCopied = screen.findByText(/Link copied!/i);
      expect(linkCopied).toBeInTheDocument();
    });
  });
  it('Testa se ao clicar no botão de desfavoritar de um drink, o drink some', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [favoriteRecipesRoute] });

    const favoriteButton2 = screen.getByTestId('2-horizontal-favorite-btn');
    expect(favoriteButton2).toBeInTheDocument();

    userEvent.click(favoriteButton2);
    const arrabiata = screen.queryByText(/GG/i);

    expect(arrabiata).not.toBeInTheDocument();
  });
});
