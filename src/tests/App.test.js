import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa componente Login', () => {
  beforeEach(() => {
    render(<App />);
  });
  it('Testa se é exibido na tela de Login os campos de email, senha e o botão de Enter', () => {
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Testa se o botão de Entrar só é habilitado quando é digitado um email válido e senha', () => {
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /Enter/i });

    expect(button).not.toBeEnabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, '12345678');
    expect(button).toBeEnabled();

    // userEvent.click(button);
  });
});
