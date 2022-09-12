import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

describe('Testa a página de Ranking da aplicação', () => {
  test('Testa se o botão é renderizado', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const btn_go_home = screen.getByTestId('btn-go-home');

    expect(btn_go_home).toBeInTheDocument();
  });

  test('Testa se a listagem de pessoas que jogaram é exibida na tela com nome e pontuação', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/ranking');

    const names = screen.getByTestId('player-name-0');
    const scores = screen.getByTestId('player-score-0');

    expect(names).toBeInTheDocument();
    expect(scores).toBeInTheDocument();
  });
})