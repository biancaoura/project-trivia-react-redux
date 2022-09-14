import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { mockStorage, bino } from './helpers/mockStorage';

import initialState from './helpers/mockResults';

const mockTokenAPI = {
  trivia: {
  response_code: 0,
  token: '73c91281427572dd212f48e1449df769db7d757c3c195a278d79ef83d52da3ca',
  }
};

describe('Testa a página de Ranking da aplicação', () => {
  test('Testa se o botão é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn_go_home = screen.getByTestId('btn-go-home');

    expect(btn_go_home).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão a pagina é redirecionada para a home', () => {
    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest
    //     .fn()
    //     .mockResolvedValueOnce(mockTokenAPI)
    //     .mockResolvedValue(initialState.reducerTrivia.trivia)
    // });
    
    const { history } = renderWithRouterAndRedux(<App />, initialState );
    // jest.spyOn(history, 'push');
    history.push('/ranking');

    const btn_go_home = screen.getByTestId('btn-go-home');
    expect(btn_go_home).toBeInTheDocument();

    userEvent.click(btn_go_home)

    const { pathname } = history.location
    expect(pathname).toBe('/')
});

test('Teste', () => {
    //   jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest
    //     .fn()
    //     .mockResolvedValueOnce(mockTokenAPI)
    //     .mockResolvedValue(initialState)
    // });
    localStorage.setItem('ranking', JSON.stringify([...mockStorage, bino]));
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/ranking');
 
    expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([...mockStorage, bino]));
   
    
  // localStorage.setItem('ranking', JSON.stringify(mockStorage));
  // expect(localStorage.getItem('ranking')).toEqual(JSON.stringify(mockStorage));


  
});
})