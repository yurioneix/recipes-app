import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa componente Login', () => {
  it('Testa se o botão de Entrar só é habilitado quando é digitado um email válido e senha', () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email1@email.com');
    userEvent.type(passwordInput, '12345678');
    expect(button).toBeEnabled();
  });

  it('Testa se ao realizar o login, o email é salvo no LocalStorage', async () => {
    renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email2@email.com');
    userEvent.type(passwordInput, '12345678');
    act(() => {
      userEvent.click(button);
    });

    expect(JSON.parse(localStorage.getItem('user'))).toStrictEqual({ email: 'email2@email.com' });
  });

  // it('Testa se ao realizar login, redireciona para página de Receitas', () => {
  //   renderWithRouter(<App />);
  //   const emailInput = screen.getByLabelText(/Email/i);
  //   const passwordInput = screen.getByLabelText(/Password/i);
  //   const button = screen.getByRole('button', { name: /Enter/i });

  //   expect(button).not.toBeEnabled();

  //   userEvent.type(emailInput, 'email@email.com');
  //   userEvent.type(passwordInput, '12345678');
  //   userEvent.click(button);

  //   const recipes = screen.getByText('Receitas');
  //   expect(recipes).toBeInTheDocument();
  // });
});
