import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import initialState from './helpers/mockResults';

const rankingRoute = '/ranking';

describe('Testa a página de ranking', () => {
  let renderHistory;
  beforeEach(() => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, rankingRoute);
    renderHistory = history;
  });

  test('1 - Testa se o botão é renderizado', () => {
    const homeBtn = screen.getByTestId('btn-go-home');
    expect(homeBtn).toBeInTheDocument();
  });

  test('2 - Testa se ao clicar no botão a pagina é redirecionada para a home', () => {    
    const homeBtn = screen.getByTestId('btn-go-home');
    expect(homeBtn).toBeInTheDocument();

    userEvent.click(homeBtn);

    const { location: { pathname } } = renderHistory;
    expect(pathname).toBe('/');
  });
});
