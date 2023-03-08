import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente SearchBar', () => {
  it('Verifica se os input é limpo após cliccar no botão Search', async () => {
    renderWithRouter(<SearchBar />);

    const searchInput = screen.getByTestId('search-input');
    const radioName = screen.getByLabelText(/name/i);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(searchInput, 'Gin');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    expect(searchInput.value).toBe('');
  });
});
