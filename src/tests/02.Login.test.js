import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa tela de Login', () => {
  it('Testa se ao realizar login, redireciona para página de Receitas', async () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '12345678');
    userEvent.click(button);

    const recipes = screen.getByText('Receitas');

    expect(recipes).toBeInTheDocument();
    // await waitFor(() => {
    //   const { pathname } = history.location;
    //   expect(pathname).toMatch('/meals');
    // });
  });
});
