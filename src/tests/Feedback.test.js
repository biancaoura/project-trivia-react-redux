import React from "react";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import mockStorage from './helpers/mockStorage';

describe('Testa a página de feedback', () => {
  describe('Testa renderização e cliques', () => {
    test('Testa se todos os itens estão na tela', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      
      const profilePicture = screen.getByTestId('header-profile-picture');
      const playerName = screen.getByTestId('header-player-name');
      const headerScore = screen.getByTestId('header-score');
      const feedbackText = screen.getByTestId('feedback-text');
      const totalScore = screen.getByTestId('feedback-total-score');
      const totalQuestion = screen.getByTestId('feedback-total-question');
      const playAgainBtn = screen.getByTestId('btn-play-again');
      const rankingBtn = screen.getByTestId('btn-ranking');

      const array = [
        profilePicture,
        playerName,
        headerScore,
        feedbackText,
        totalScore,
        totalQuestion,
        playAgainBtn,
        rankingBtn,
      ]

      array.map((e) => expect(e).toBeInTheDocument());
    });

    test('Testa o Redirecionamento do botão Play again', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');
      const { location: { pathname } } = history;

      const playAgainBtn = screen.getByTestId('btn-play-again');

      userEvent.click(playAgainBtn);

      expect(pathname).toBe('/feedback');
    });

    test.only('Testa o Redirecionamento do botão Ranking', async () => {
      localStorage.setItem('ranking', JSON.stringify(mockStorage));

      const { history } = renderWithRouterAndRedux(<App />);
      history.push('/feedback');

      const rankingBtn = screen.getByTestId('btn-ranking');
      expect(rankingBtn).toBeInTheDocument();
      userEvent.click(rankingBtn);
      
      const { location: { pathname } } = history;
      expect(pathname).toBe('/ranking');

      expect(localStorage.getItem('ranking')).toEqual(mockStorage);
      
      const title = await screen.findByRole('heading', { name: /ranking/i, level: 1});
      expect(title).toBeInTheDocument();

    });
  });

  describe('Testa mensagens', () => {
    test('Testa se a mensagem "Could be better" é mostrada caso o número de acerto seja menor que 3', () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        player: { score: 0, assertions: 0 },
      });
      history.push('/feedback');
  
      const message = screen.getByText(/could be better.../i);
      expect(message).toBeInTheDocument();
    });
  
    test('Testa se a mensagem "Well Done!" é mostrada caso o número de acerto seja maior ou igual a 3', () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        player: { score: 0, assertions: 3 },
      });
      history.push('/feedback');
  
      const message = screen.getByText(/well done!/i);
      expect(message).toBeInTheDocument();
    });
  });

})