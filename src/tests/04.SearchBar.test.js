import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../services/renderWithRouter';
import mockDrinkMargarita from './helpers/mockData';

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
  it('Verifica se os input e botões estão presentes no componente', async () => {
    renderWithRouter(<SearchBar />);
    jest.spyOn(global, 'fetch')
      .mockImplementation(async () => ({
        json: async () => mockDrinkMargarita,
      }));

    const searchInput = screen.getByTestId('search-input');
    // const radioIngredient = screen.getByLabelText(/ingredient/i);
    // const radioFirstLetter = screen.getByLabelText(/first letter/i);
    const radioName = screen.getByLabelText(/name/i);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'margarita');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => expect(mockDrinkMargarita).toHaveBeenCalled);
  });
});
