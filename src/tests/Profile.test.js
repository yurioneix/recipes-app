import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa tela de receitas', () => {
  it('Testa renderização do header', async () => {
    renderWithRouter(<Profile />);
    const profileHeader = screen.getByText(/profile/i);
    expect(profileHeader).toBeInTheDocument();
  });
});
