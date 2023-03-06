import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../services/renderWithRouter';
import { mockDrinkMargarita, mockDataArrabiata, mockDataAquamarine } from './helpers/mockData';

describe('Testa o componente SearchBar', () => {
  // beforeEach(() => {
  //   // global.fetch = jest.fn().mockResolvedValue({
  //   //   json: jest.fn().mockResolvedValue(mockData2),
  //   // });
  //   jest.spyOn(global, 'fetch')
  //   .mockImplementation(async () => ({
  //     json: async () => mockDrinkMargarita,
  //   }));
  // });
  const searchInputTag = 'search-input';
  it('Verifica se os input e botões estão presentes no componente', async () => {
    renderWithRouter(<SearchBar />);
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockDrinkMargarita,
      }));

    const searchInput = screen.getByTestId(searchInputTag);
    // const radioIngredient = screen.getByLabelText(/ingredient/i);
    // const radioFirstLetter = screen.getByLabelText(/first letter/i);
    const radioName = screen.getByLabelText(/name/i);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'margarita');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(mockDrinkMargarita).toHaveBeenCalled);
  });
  it('Verifica se aparece o resultado da busca de comida com um único elemento', async () => {
    renderWithRouter(<App />);
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockDataArrabiata,
      }));

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.click(button);

    const searchTopButton = screen.getByTestId('search-top-btn');
    const titleMeals = screen.getByRole('heading', { name: 'Meals', level: 1 });

    expect(titleMeals).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const radioName = screen.getByLabelText(/name/i);
    const searchInput = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(radioName);

    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleArrabiata = screen.getByText('Spicy Arrabiata Penne');
      expect(titleArrabiata).toBeInTheDocument();
    });
  });
  it('', async () => {
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockDataAquamarine,
      }));

    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const searchTopButton = screen.getByTestId('search-top-btn');
    const titleDrinks = screen.getByRole('heading', { name: 'Drinks', level: 1 });

    expect(titleDrinks).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const radioName = screen.getByLabelText(/name/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.type(searchInput2, 'Aquamarine');
    userEvent.click(radioName);

    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleAquamarine = screen.getByText('Aquamarine');
      expect(titleAquamarine).toBeInTheDocument();
    });
  });
});
