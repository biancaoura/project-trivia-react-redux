import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import initialState from './helpers/mockResults';
import { mockScores } from './helpers/mockStorage';

const gameRoute = '/game';

describe('Testa a página do jogo', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, initialState, gameRoute);
  });

  describe('1 - Testando renderização de elementos', () => {
    test('1 - Testa renderização do cabeçalho', () => {
      expect(screen.getByRole('img', { name: /avatar/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: 'teste' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 4, name: /score: 0/i })).toBeInTheDocument();
    });
    
    test('2 - Testa renderização dos elementos da pergunta', () => {
      expect(screen.getByText(/science: computers/i)).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText(/what five letter word is the motto of the IBM computer company?/i)).toBeInTheDocument();
      expect(screen.getAllByRole('button')).toHaveLength(4);
    });
  });

  describe('2 - Testa interação com interface do jogo', () => {
    test('1 - Testa mudança de cores nos botões depois da resposta', () => {
      userEvent.click(screen.getByRole('button', { name: /think/i }));
      expect(screen.getByRole('button', { name: /think/i }).className).toContain('correct');
      expect(screen.getByRole('button', { name: /click/i }).className).toContain('wrong');
      expect(screen.getByRole('button', { name: /logic/i }).className).toContain('wrong');
      expect(screen.getByRole('button', { name: /pixel/i }).className).toContain('wrong');
    });

    test('2 - Testa se perguntas e respostas são renderizadas', async () => {
      const question = await screen.findByText(/What five letter word is the motto of the IBM Computer company?/);
      const correctAnswer = await screen.findByText(/think/i);
      
      expect(question).toBeInTheDocument();
      expect(correctAnswer).toBeInTheDocument();

      userEvent.click(correctAnswer);

      const nextBtn = screen.getByRole('button', { name: /next/i });
      userEvent.click(nextBtn);
    });

    test('3 - Testa progressão da pontuação no jogo, localStorage e redirecionamento para feedback', async () => {
      expect(localStorage.getItem('ranking')).toBeNull();

      userEvent.click(await screen.findByRole('button', { name: /think/i }));
      expect(screen.getAllByText('70')).toHaveLength(2);
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /brighton/i }));
      expect(screen.getAllByText('170')).toHaveLength(2);
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /2011/ }));
      expect(screen.getAllByText('210')).toHaveLength(2);
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /dr.dre/i }));
      expect(screen.getAllByText('280')).toHaveLength(2);
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /1 gb\/s/i }));
      expect(screen.getAllByText('280')).toHaveLength(2);
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      expect(screen.getByRole('heading', { level: 3, name: /well done!/i })).toBeInTheDocument();
      expect(screen.getAllByText('280')).toHaveLength(2);
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /play again/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /ranking/i })).toBeInTheDocument();

      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([mockScores[0]]));
    });

    test('4 - Testa se a pontuação é somada no localStorage', async () => {
      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([mockScores[0]]));

      userEvent.click(await screen.findByRole('button', { name: /think/i }));
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /brighton/i }));
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: '2011' }));
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /dr.dre/i }));
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      userEvent.click(await screen.findByRole('button', { name: /1 gb\/s/i }));
      userEvent.click(screen.getByRole('button', { name: /next/i }));

      expect(screen.getByText(/well done!/i)).toBeInTheDocument();
      expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([...mockScores]));
    });
  });

  describe('3 - Testa se o timer funciona', () => {
    test('1 - Testa se existe um timer', () => {
      const timer = screen.getByText('30');
      expect(timer).toBeInTheDocument();
    });

    test('2 - Testa se é possível clicar na resposta após 5 segundos', async () => {
      const correctAnswer = screen.getByRole('button', { name: /think/i });

      expect(correctAnswer).toBeEnabled();

      await new Promise(res => setTimeout(res, 5000));
      expect(correctAnswer).toBeEnabled();

    }, 10000);

    test('3 - Testa se o botão está desabilitado após 30 segundos', async () => {
      const correctAnswer = screen.getByRole('button', { name: /think/i });
      expect(correctAnswer).toBeEnabled();

      await new Promise(res => setTimeout(res, 32000));
      expect(correctAnswer).toBeDisabled();

    }, 50000);
  });
});