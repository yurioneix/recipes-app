import { screen, waitFor } from '@testing-library/react';
import Recipes from '../pages/Recipes';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa tela de receitas', () => {
  it('Testa renderização dos botões na tela de bebidas', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/drinks');
    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/category-filter/i);
      expect(categoryButtons).toHaveLength(5);
    });
  });

  it('Testa renderização dos botões na tela de comidas', async () => {
    const { history } = renderWithRouter(<Recipes />);
    history.push('/meals');
    await waitFor(() => {
      const categoryButtons = screen.getAllByTestId(/category-filter/i);
      expect(categoryButtons).toHaveLength(5);
      screen.logTestingPlaygroundURL();
    });
  });

  it('Deve renderizar 12 cards de receitas', async () => {
    renderWithRouter(<Recipes />);
    await waitFor(() => {
      expect(screen.getAllByTestId(/-recipe-card$/i)).toHaveLength(12);
    });
  });
});
