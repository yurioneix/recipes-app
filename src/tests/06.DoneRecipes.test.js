import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
// import fetch from '../../cypress/mocks/fetch';
import fetch from './helpers/fetch';
import storage from './helpers/mockLocalStorage';

describe('Testa o componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  const searchInputTag = 'search-input';
  const searchTop = 'search-top-btn';
  it('Verifica se aparece o resultado da busca de comida com um único elemento', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/done-recipes'] });

    localStorage.setItem('doneRecipes', JSON.stringify(storage));

    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeInTheDocument();

    // const searchTopButton = screen.getByTestId(searchTop);

    // userEvent.click(searchTopButton);

    // const radioName = screen.getByLabelText(/name/i);
    // const searchInput = screen.getByTestId(searchInputTag);
    // const buttonSearch = screen.getByTestId('exec-search-btn');

    // userEvent.click(radioName);
    // userEvent.type(searchInput, 'Arrabiata');
    // userEvent.click(buttonSearch);

    // await waitFor(() => {
    //   const titleArrabiata = screen.getByText('Spicy Arrabiata Penne');
    //   expect(titleArrabiata).toBeInTheDocument();
    // });

    // const { pathname } = history.location;
    // expect(pathname).toBe('/meals/52771');
  });
});
