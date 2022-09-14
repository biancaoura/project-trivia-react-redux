import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { mockScores, mockPlayer3 } from './helpers/mockStorage';

import initialState from './helpers/mockResults';

describe('Testa a página de Ranking da aplicação', () => {
  test('Testa se o botão é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn_go_home = screen.getByTestId('btn-go-home');

    expect(btn_go_home).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão a pagina é redirecionada para a home', () => {    
    const { history } = renderWithRouterAndRedux(<App />, initialState );
    history.push('/ranking');

    const btn_go_home = screen.getByTestId('btn-go-home');
    expect(btn_go_home).toBeInTheDocument();

    userEvent.click(btn_go_home)

    const { pathname } = history.location
    expect(pathname).toBe('/')
});
});

  test('a', () => {
    localStorage.setItem('ranking', JSON.stringify(mockScores));
    renderWithRouterAndRedux(<App />);

    expect(localStorage.getItem('ranking')).toEqual(JSON.stringify(mockScores));
  });

  test('Teste', () => {
      const test = JSON.parse(localStorage.getItem('ranking'));
      test.push(mockPlayer3);
      localStorage.setItem('ranking', JSON.stringify(test));

      renderWithRouterAndRedux(<App />);
      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([...mockScores, mockPlayer3]));

  });