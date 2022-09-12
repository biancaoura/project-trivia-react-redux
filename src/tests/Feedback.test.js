import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";


describe('Testa a página de feedback', () => {
  test('Testa se todos os itens estão na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    
    const profilePicture = screen.getByTestId('header-profile-picture');
    const playerName = screen.getByTestId('header-player-name');
    const headerScore = screen.getByTestId('header-score');
    const feedbackText = screen.getByTestId('feedback-text');
    const totalScore = screen.getByTestId('feedback-total-score');
    const totalQuestion = screen.getByTestId('feedback-total-question');
    const play_again_button = screen.getByTestId('btn-play-again');
    const ranking_button = screen.getByTestId('btn-ranking');

    const array = [
      profilePicture,
      playerName,
      headerScore,
      feedbackText,
      totalScore,
      totalQuestion,
      play_again_button,
      ranking_button,
    ]

    array.map((e) => expect(e).toBeInTheDocument());
  });

  test('Testa o Redirecionamento do botão Play again', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { location: { pathname } } = history;

    const play_again_button = screen.getByTestId('btn-play-again');

    userEvent.click(play_again_button);

    expect(pathname).toBe("/feedback");
  });

  test('Testa o Redirecionamento do botão Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
    const { location: { pathname } } = history;

    const ranking_button = screen.getByTestId('btn-ranking');

    userEvent.click(ranking_button);

    expect(pathname).toBe("/feedback");
  });

  test('Testa se a mensagem "Could be better" é mostrada caso o número de acerto seja menor que 3', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { score: 0, assertions: 0 },
    });
    history.push('/feedback');

    const mensagem = screen.getByText(/could be better.../i);
  });

  test('Testa se a mensagem "Well Done!" é mostrada caso o número de acerto seja maior ou igual a 3', () => {
    const { history } = renderWithRouterAndRedux(<App />, {
      player: { score: 0, assertions: 3 },
    });
    history.push('/feedback');

    const mensagem = screen.getByText(/well done!/i);
  });
})