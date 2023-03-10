import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
// import fetch from '../../cypress/mocks/fetch';
import fetch from './helpers/fetch';
import storage from './helpers/mockLocalStorage';

describe('Testa o componente DoneRecipes', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('doneRecipes');
  });
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    // localStorage.setItem('doneRecipes', JSON.stringify(storage));
  });
  const routeDoneRecipes = '/done-recipes';
  const filterByMealBtn = 'filter-by-meal-btn';
  const filterByDrinkBtn = 'filter-by-drink-btn';
  it('Verifica o resultado ao clicar no botão All', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    const arrabiataName = screen.getByText(/spicy arrabiata penne/i);
    const ggName = screen.getByText(/gg/i);
    const corbaName = screen.getByText(/corba/i);

    expect(arrabiataName).toBeInTheDocument();
    expect(ggName).toBeInTheDocument();
    expect(corbaName).toBeInTheDocument();
  });
  it('Verifica o resultado ao clicar no botão Meal', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonMeal = screen.getByTestId(filterByMealBtn);

    userEvent.click(buttonMeal);

    const arrabiataName = screen.getByText(/spicy arrabiata penne/i);
    const corbaName = screen.getByText(/corba/i);

    expect(arrabiataName).toBeInTheDocument();
    expect(corbaName).toBeInTheDocument();
  });
  it('Verifica o resultado ao clicar no botão Drink', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonDrink = screen.getByTestId(filterByDrinkBtn);

    userEvent.click(buttonDrink);

    const ggName = screen.getByText(/gg/i);

    expect(ggName).toBeInTheDocument();
  });
  it('Verifica ao clicar no nome de um alimento se redireciona para sua respectiva rota de detalhes', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    const { history } = renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    const corbaName = screen.getByText(/corba/i);

    userEvent.click(corbaName);

    await waitFor(() => {
      const ingredienteOne = screen.getByTestId('instructions');
      expect(ingredienteOne.innerHTML).toBe('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/meals/52977');
  });
  it('Verifica ao clicar no nome de um alimento se redireciona para sua respectiva rota de detalhes', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    const { history } = renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    const corbaImage = screen.getByTestId('1-horizontal-image');

    userEvent.click(corbaImage);

    await waitFor(() => {
      const ingredienteOne = screen.getByTestId('instructions');
      expect(ingredienteOne.innerHTML).toBe('Bring a large pot of water to a boil. Add kosher salt to the boiling water, then add the pasta. Cook according to the package instructions, about 9 minutes. In a large skillet over medium-high heat, add the olive oil and heat until the oil starts to shimmer. Add the garlic and cook, stirring, until fragrant, 1 to 2 minutes. Add the chopped tomatoes, red chile flakes, Italian seasoning and salt and pepper to taste. Bring to a boil and cook for 5 minutes. Remove from the heat and add the chopped basil. Drain the pasta and add it to the sauce. Garnish with Parmigiano-Reggiano flakes and more basil and serve warm.');
    });

    const { pathname } = history.location;

    expect(pathname).toBe('/meals/52977');
  });
  it('Verifica se ao clicar no botão de compartilhar é demonstrada na tela a frase "Link copied!"', async () => {
    window.document.execCommand = jest.fn(() => true);
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    const corbaShare = screen.getByTestId('1-horizontal-share-btn');

    await waitFor(() => {
      userEvent.click(corbaShare);
      const linkCopied = screen.getByText(/link copied!/i);
      expect(linkCopied).toBeInTheDocument();
    });
  });
  it('Verifica o que retorna do LocalStorage aoclicar no botão All', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual(storage);
  });
  it('Verifica o que retorna do LocalStorage aoclicar no botão Meal', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonMeal = screen.getByTestId(filterByMealBtn);

    userEvent.click(buttonMeal);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual(storage);
  });
  it('Verifica o que retorna do LocalStorage aoclicar no botão Drink', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonDrink = screen.getByTestId(filterByDrinkBtn);

    userEvent.click(buttonDrink);

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual(storage);
  });
  it('Verifica o resultado ao clicar no botão Meal e posteriormente no botão Drink, e por fim no botão All', () => {
    localStorage.setItem('doneRecipes', JSON.stringify(storage));
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    const buttonMeal = screen.getByTestId(filterByMealBtn);

    userEvent.click(buttonMeal);

    const arrabiataName = screen.getByText(/spicy arrabiata penne/i);
    const corbaName = screen.getByText(/corba/i);

    expect(arrabiataName).toBeInTheDocument();
    expect(corbaName).toBeInTheDocument();
    expect(screen.queryByText(/gg/i)).not.toBeInTheDocument();

    const buttonDrink = screen.getByTestId(filterByDrinkBtn);

    userEvent.click(buttonDrink);

    const ggName = screen.getByText(/gg/i);

    expect(ggName).toBeInTheDocument();
    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/corba/i)).not.toBeInTheDocument();

    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    expect(screen.getByText(/spicy arrabiata penne/i)).toBeInTheDocument();
    expect(screen.getByText(/corba/i)).toBeInTheDocument();
    expect(screen.getByText(/gg/i)).toBeInTheDocument();
    expect(screen.queryByText('arrivederci, this word is not in the document')).not.toBeInTheDocument();
  });
  it('Verifica, ao entrar na tela de receitas feitas, se retorna sem cards de receitas caso não seja populado ou criada a chave doneRecipes', () => {
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });

    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
  });
  it('Verifica, após clicar no botão All, se retorna sem cards de receitas caso não seja populado ou criada a chave doneRecipes', () => {
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });
    const buttonAll = screen.getByRole('button', { name: /all/i });

    userEvent.click(buttonAll);

    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
  });
  it('Verifica, após clicar no botão Meal, se retorna sem cards de receitas caso não seja populado ou criada a chave doneRecipes', () => {
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });
    const buttonMeal = screen.getByTestId(filterByMealBtn);

    userEvent.click(buttonMeal);

    expect(screen.queryByText(/spicy arrabiata penne/i)).not.toBeInTheDocument();
  });
  it('Verifica, após clicar no botão Drink, se retorna sem cards de receitas caso não seja populado ou criada a chave doneRecipes', () => {
    renderWithRouter(<App />, { initialEntries: [routeDoneRecipes] });
    const buttonDrink = screen.getByTestId(filterByDrinkBtn);

    userEvent.click(buttonDrink);

    expect(screen.queryByText(/gg/i)).not.toBeInTheDocument();
  });
});
