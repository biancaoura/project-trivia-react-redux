import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { mockScores } from './helpers/mockStorage';

const feedbackRoute = '/feedback';

describe('Testa a página de feedback', () => {
  describe('1 - Testa renderização e botões', () => {
    beforeEach(() => {
      renderWithRouterAndRedux(<App />, {}, feedbackRoute);
      localStorage.setItem('ranking', JSON.stringify(mockScores));
    });

    afterEach(() => {
      localStorage.clear();
    });

    test('1 - Testa se todos os itens estão na tela', () => {
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
      ];
      array.map((e) => expect(e).toBeInTheDocument());
    });

    test('2 - Testa o redirecionamento do botão Play Again', () => {
      const playAgainBtn = screen.getByTestId('btn-play-again');
      userEvent.click(playAgainBtn);

      expect(screen.getByText(/time to play/i)).toBeInTheDocument();
    });

    test('3 - Testa o redirecionamento do botão Ranking', async () => {
      const rankingBtn = screen.getByTestId('btn-ranking');
      userEvent.click(rankingBtn);

      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify(mockScores));
      
      const rankingTitle = await screen.findByRole('heading', { name: /ranking/i, level: 1});
      expect(rankingTitle).toBeInTheDocument();
    });
  });

  describe('2 - Testa mensagens', () => {
    test('Testa se a mensagem "Could be better" é mostrada caso o número de acerto seja menor que 3', () => {
      renderWithRouterAndRedux(<App />, { player: { score: 0, assertions: 0 }}, feedbackRoute);
  
      const message = screen.getByText(/could be better.../i);
      expect(message).toBeInTheDocument();
    });
  
    test('Testa se a mensagem "Well Done!" é mostrada caso o número de acerto seja maior ou igual a 3', () => {
      renderWithRouterAndRedux(<App />, {
        player: { score: 0, assertions: 3 }}, feedbackRoute);
  
      const message = screen.getByText(/well done!/i);
      expect(message).toBeInTheDocument();
    });
  });
});
