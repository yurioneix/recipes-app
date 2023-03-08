import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
// import fetch from '../../cypress/mocks/fetch';
import fetch from './helpers/fetch';

describe('Testa o componente SearchBar', () => {
  afterEach(() => jest.clearAllMocks());
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  const searchInputTag = 'search-input';
  const searchTop = 'search-top-btn';
  it('Verifica se aparece o resultado da busca de comida com um único elemento', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopButton = screen.getByTestId(searchTop);

    userEvent.click(searchTopButton);

    const radioName = screen.getByLabelText(/name/i);
    const searchInput = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(radioName);
    userEvent.type(searchInput, 'Arrabiata');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleArrabiata = screen.getByText('Spicy Arrabiata Penne');
      expect(titleArrabiata).toBeInTheDocument();
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52771');
  });
  it('Verifica se após digitar Aquamarine na barra de busca ira aparecer na tela o título Aquamarine', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const searchTopButton = screen.getByTestId(searchTop);
    const titleDrinks = screen.getByRole('heading', { name: 'Drinks', level: 1 });

    expect(titleDrinks).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();

    userEvent.click(searchTopButton);

    const radioName = screen.getByLabelText(/name/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.type(searchInput2, 'Aquamarine');
    userEvent.click(radioName);
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleAquamarine = screen.getByText('Aquamarine');
      expect(titleAquamarine).toBeInTheDocument();
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/178319');
  });
  it('Verificando a busca de meals através do radio button ingredient', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const searchTopButton = screen.getByTestId(searchTop);
    userEvent.click(searchTopButton);

    const radioIngredient = screen.getByLabelText(/ingredient/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.click(radioIngredient);
    userEvent.type(searchInput2, 'Chicken');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleBrownStewChicken = screen.getByText('Brown Stew Chicken');
      expect(titleBrownStewChicken).toBeInTheDocument();
    });
  });
  it('Verificando a busca de drinks através do radio button ingredient', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const searchTopButton = screen.getByTestId(searchTop);
    userEvent.click(searchTopButton);

    const radioIngredient = screen.getByLabelText(/ingredient/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.click(radioIngredient);
    userEvent.type(searchInput2, 'Light rum');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleFloridaBushwacker = screen.getByText('151 Florida Bushwacker');
      expect(titleFloridaBushwacker).toBeInTheDocument();
    });
  });
  it('Verificando a busca de drinks através do radio button first letter', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');

    const searchTopButton = screen.getByTestId(searchTop);
    userEvent.click(searchTopButton);

    const radioFirstLetter = screen.getByLabelText(/first letter/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.click(radioFirstLetter);
    userEvent.type(searchInput2, 's');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleSmut = screen.getByText('Smut');
      expect(titleSmut).toBeInTheDocument();
    });
  });
  it('Verificando a busca de meals através do radio button first letter', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const searchTopButton = screen.getByTestId(searchTop);
    userEvent.click(searchTopButton);

    const radioFirstLetter = screen.getByLabelText(/first letter/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.click(radioFirstLetter);
    userEvent.type(searchInput2, 'b');
    userEvent.click(buttonSearch);

    await waitFor(() => {
      const titleBakewellTart = screen.getByText('Bakewell tart');
      expect(titleBakewellTart).toBeInTheDocument();
    });
  });
  it('Verificando o global.alert', async () => {
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchTopButton = screen.getByTestId(searchTop);
    userEvent.click(searchTopButton);

    const radioFirstLetter = screen.getByLabelText(/first letter/i);
    const searchInput2 = screen.getByTestId(searchInputTag);
    const buttonSearch = screen.getByText('Search');

    userEvent.click(radioFirstLetter);
    userEvent.type(searchInput2, 'ba');
    userEvent.click(buttonSearch);

    expect(global.alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');

    await waitFor(() => {
      const beef = screen.getByText(/beef/i);
      expect(beef).toBeInTheDocument();
    });
  });
});
