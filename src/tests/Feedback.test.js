import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { mockScores } from './helpers/mockStorage';
import initialState from './helpers/mockResults';

const feedbackRoute = '/feedback';

describe('Testa a página de feedback', () => {
  describe('1 - Testa renderização e botões', () => {
    beforeEach(() => {
      renderWithRouterAndRedux(<App />, initialState, feedbackRoute);
      localStorage.setItem('ranking', JSON.stringify(mockScores));
    });

    afterEach(() => {
      localStorage.clear();
    });

    test('1 - Testa se todos os itens estão na tela', () => {
      const profilePicture = screen.getByRole('img', { name: /avatar/i });
      const playerName = screen.getByRole('heading', { level: 4, name: /teste/i });
      const headerScore = screen.getByRole('heading', { level: 4, name: /score: 0/i });
      const feedbackText = screen.getByRole('heading', { level: 4, name: /could be better.../i });
      const totalScore = screen.getAllByRole('heading', { level: 2, name: '0' });
      const playAgainBtn = screen.getByRole('button', { name: /play again/i });
      const rankingBtn = screen.getByRole('button', { name: /ranking/i });

      const array = [
        profilePicture,
        playerName,
        headerScore,
        feedbackText,
        ...totalScore,
        playAgainBtn,
        rankingBtn,
      ];
      array.map((e) => expect(e).toBeInTheDocument());
    });

    test('2 - Testa o redirecionamento do botão Play Again', () => {
      const playAgainBtn = screen.getByRole('button', { name: /play again/i });
      userEvent.click(playAgainBtn);

      expect(screen.getByText(/time to play/i)).toBeInTheDocument();
    });

    test('3 - Testa o redirecionamento do botão Ranking', async () => {
      const rankingBtn = screen.getByRole('button', { name: /ranking/i });
      userEvent.click(rankingBtn);

      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify(mockScores));
      
      const rankingTitle = await screen.findByRole('heading', { name: /ranking/i, level: 1});
      expect(rankingTitle).toBeInTheDocument();
    });
  });

  describe('2 - Testa mensagens', () => {
    test('Testa se a mensagem "Could be better" é mostrada caso o número de acerto seja menor que 3', () => {
      renderWithRouterAndRedux(<App />, { player: { score: 0, assertions: 0 }}, feedbackRoute);
  
      const message = screen.getByRole('heading', { level: 4, name: /could be better.../i });
      expect(message).toBeInTheDocument();
    });
  
    test('Testa se a mensagem "Well Done!" é mostrada caso o número de acerto seja maior ou igual a 3', () => {
      renderWithRouterAndRedux(<App />, {
        player: { score: 0, assertions: 3 }}, feedbackRoute);
  
      const message = screen.getByRole('heading', { level: 4, name: /well done!/i });
      expect(message).toBeInTheDocument();
    });
  });
});
