import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import initialState from './helpers/mockResults';

const mockTokenAPI = {
  trivia: {
  response_code: 0,
  token: '73c91281427572dd212f48e1449df769db7d757c3c195a278d79ef83d52da3ca',
  }
};

describe('Testa a página de login', () => {
  describe('1 - Testa renderização', () => {
    let renderHistory;
    beforeEach(() => {
      const { history } = renderWithRouterAndRedux(<App />);
      renderHistory = history;
    });
    test('1 - Testa se a página de login é renderizada corretamente na rota "/"', () => {
      const { location: { pathname } } = renderHistory;
      expect(pathname).toBe('/');
    });

    test('2 - Testa se existe um título na tela', () => {
      const loginTitle = screen.getByRole('heading', { level: 2, name: /time to play/i });
      expect(loginTitle).toBeInTheDocument();
    });

    test('3 - Testa se a página contém inputs para inserção do nome e email', () => {
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      
      expect(inputName).toBeInTheDocument();
      expect(inputEmail).toBeInTheDocument();
    });

    test('4 - Testa o redirecionamento do botão Settings', () => {
      const settingsButton = screen.getByTestId('btn-settings');
      userEvent.click(settingsButton);

      const { location: { pathname } } = renderHistory;
      expect(pathname).toBe('/settings');
    });

    test('5 - Testa se o botão Play está desabilitado, e se o formulário for preenchido, ele é habilitado', () => {
      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const loginButton = screen.getByTestId('btn-play');

      expect(loginButton).toBeDisabled();

      userEvent.type(inputName, 'nome');
      expect(loginButton).toBeDisabled();

      userEvent.type(inputEmail, 'email@email.com');
      expect(loginButton).toBeEnabled();
    });
  });

  describe('2 - Testa a chamada da API', () => {
    test('1 - Testa se o fetch foi chamado', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(mockTokenAPI)
          }));

      renderWithRouterAndRedux(<App />);

      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const loginButton = screen.getByTestId('btn-play');

      userEvent.type(inputName, 'nome');
      userEvent.type(inputEmail, 'email@email.com');
      userEvent.click(loginButton);

      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://opentdb.com/api_token.php?command=request');
    });

    test('2 - Testa se o jogo é iniciado', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest
          .fn()
          .mockResolvedValueOnce(mockTokenAPI)
          .mockResolvedValue(initialState.reducerTrivia.trivia)
      });
      
      const { history } = renderWithRouterAndRedux(<App />);
      jest.spyOn(history, 'push');

      const inputName = screen.getByTestId('input-player-name');
      const inputEmail = screen.getByTestId('input-gravatar-email');
      const loginButton = screen.getByTestId('btn-play');
          
      userEvent.type(inputName, 'nome');
      userEvent.type(inputEmail, 'email@email.com');
      expect(loginButton).toBeEnabled();

      userEvent.click(loginButton);

      await waitFor(() => {
        expect(history.push).toHaveBeenCalledWith('/game');
      });
    });
  });
});
