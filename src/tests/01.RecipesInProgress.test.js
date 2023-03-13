import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import { makeObjectToSave } from '../services/utils';
import { Aquamarine } from './helpers/Aquamarine';

describe('', () => {
  const urlDrink = '/drinks/178319/in-progress';
  it('Testa renderização dos botões na tela de bebidas', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals/52772/in-progress'] });

    await screen.findByRole('heading', { name: /Teriyaki Chicken Casserole/i });

    const favoriteBtn = screen.getByAltText('favorite');

    expect(favoriteBtn.src.includes('whiteHeartIcon')).toBe(true);

    act(() => {
      userEvent.click(favoriteBtn);
    });

    expect(favoriteBtn.src.includes('blackHeartIcon')).toBe(true);
  });

  it('verifica se o botão começa desabilitado e é habilitado após marcar todos ingredientes', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: [urlDrink] });
    const submitButton = screen.getByRole('button', { name: /Finish Recipe/i });
    expect(submitButton.disabled).toBe(true);
    const arrOfIngredients = await screen.findAllByRole('checkbox');
    arrOfIngredients.forEach((el) => userEvent.click(el));
    expect(submitButton.disabled).toBe(false);
    act(() => {
      userEvent.click(submitButton);
    });
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se salva no local Storage corretamente', async () => {
    localStorage.clear();
    renderWithRouter(<App />, { initialEntries: [urlDrink] });
    await screen.findByRole('heading', { name: /Aquamarine/i });
    const arrOfIngredients = await screen.findAllByRole('checkbox');
    act(() => {
      userEvent.click(arrOfIngredients[0]);
    });
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    expect(storage).toEqual({ drink: { 178319: { checkedIngredients: ['Hpnotiq', 'Hpnotiq'] } } });

    act(() => {
      userEvent.click(arrOfIngredients[0]);
    });
  });
  it('Testando se mantem o favorito após reiniciar a pagina', async () => {
    const objToSave = makeObjectToSave(Aquamarine, 'drink');
    localStorage.setItem('favoriteRecipes', JSON.stringify([objToSave]));
    renderWithRouter(<App />, { initialEntries: [urlDrink] });

    const favoriteBtn = await screen.findByAltText('favorite');
    expect(favoriteBtn.src.includes('blackHeartIcon')).toBe(true);
  });
});
