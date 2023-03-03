import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Testa componente Header', () => {
  it('Testa se o Header não é renderizado na pagina de login', async () => {
    renderWithRouter(<App />);
    const headerIcon = screen.queryByAltText('user Icon');
    expect(headerIcon).not.toBeInTheDocument();
  });

  it('Testa se o componente Header é renderizado corretamente na rota Meals', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.click(button);

    const searchBtn = screen.getByAltText('user Icon');
    const searchBar = screen.queryByTestId('search-input');
    expect(searchBar).not.toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchBar).toBeInTheDocument();
    userEvent.click(searchBtn);
    expect(searchBar).not.toBeInTheDocument();
  });
});
