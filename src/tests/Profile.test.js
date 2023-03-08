import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa tela de receitas', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'fabiano@trybe.com' }));
  });

  it('Testa comportamento botão Done Recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    expect(history.location.pathname).toBe('/profile');

    const doneButton = screen.getByRole('button', {
      name: /done recipes/i,
    });

    expect(doneButton).toBeInTheDocument();

    act(() => {
      userEvent.click(doneButton);
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa comportamento botão Favorite Recipes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    expect(history.location.pathname).toBe('/profile');

    const favoriteButton = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    expect(favoriteButton).toBeInTheDocument();

    act(() => {
      userEvent.click(favoriteButton);
    });
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Testa comportamento botão Logout', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    expect(history.location.pathname).toBe('/profile');
    const logoutButton = screen.getByRole('button', {
      name: /logout/i,
    });

    expect(logoutButton).toBeInTheDocument();

    act(() => {
      userEvent.click(logoutButton);
    });
    expect(history.location.pathname).toBe('/');
    expect(localStorage.getItem('user')).toBe(null);
  });
});
