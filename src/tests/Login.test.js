import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, findByRole, screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndredux, { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import initialState from './helpers/mockResults';

const mockTokenAPI = {
  trivia: {
  response_code: 0,
  token: '73c91281427572dd212f48e1449df769db7d757c3c195a278d79ef83d52da3ca',
  }
};

describe('Testando o componente <Login.jsx />', () => {
  beforeEach(cleanup);

  test('1- Testa se a página de "Login" é renderizada corretamente na rota "/"', () => {
    const { history } = renderWithRouterAndredux(<Login />);

    expect(history.location.pathname).toBe('/');
  });

  test('2- Testa se existe um "h2" na tela com o título "Sua Vez de Jogar"', () => {
    renderWithRouterAndredux(<App />);

    const loginTittle = screen.getByRole('heading', { level: 2,
      name: 'Sua Vez de Jogar' });
    expect(loginTittle).toBeInTheDocument();
  });

  test('3- Testa se a página contém um input para inserção do nome', () => {
    renderWithRouterAndredux(<App />);

    const inputName = screen.getByTestId('input-player-name');
    expect(inputName).toBeInTheDocument();
  });

  test('4- Testa se a página contém um input para inserção de email', () => {
    renderWithRouterAndredux(<App />);

    const inputEmail = screen.getByTestId('input-gravatar-email');
    expect(inputEmail).toBeInTheDocument();
  });

  test('5- Testa se a página contém um botão de "Configurações" e se, ao clicar nele, ocorre o redirecionamento para a página "Configurações"', () => {
    const { history } = renderWithRouterAndredux(<App />);

    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();
    userEvent.click(settingsButton);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');
  });

  test('6- Testa se a página contém um botão "Play" e ela inicialmente está desabilitada', () => {
    renderWithRouterAndredux(<App />);

    const loginButton = screen.getByTestId('btn-play');
    expect(loginButton).toBeDisabled();
  });

  test('7- Testa se nome e email preenchidos corretamente, o botão "Play" habilita', () => {
    renderWithRouterAndredux(<App />);

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

describe('Testando chamada de API', () => {
  test('1 - Verifica se o fetch foi chamado', async () => {
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
