import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndredux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';

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
    expect(inputEmail).toBeDefined();
  });

  test('5- Testa se a página contém um botão de "Configurações" e se, ao clicar'
  + 'nele, ocorre o redirecionamento para a página "Configurações"', () => {
    const { history } = renderWithRouterAndredux(<App />);

    const settingsButton = screen.getByTestId('btn-settings');
    expect(settingsButton).toBeInTheDocument();
    userEvent.click(settingsButton);
    expect(history.location.pathname).toBe('/settings');
  });

  test('6- Testa se a página contém um botão "Play" e ela inicialmente está desabilitada', () => {
    renderWithRouterAndredux(<App />);

    const loginButton = screen.getByTestId('btn-play');
    expect(loginButton.disabled).toBeTruthy();
  });

  test('7- Testa se nome e email preenchidos corretamente, o botão "Play" habilita e'
+ 'se clicado, redireciona a página para a página do jogo "<Game />"', async () => {
  const { history } = renderWithRouterAndredux(<App />);

  const inputName = screen.getByTestId('input-player-name');
  const inputEmail = screen.getByTestId('input-gravatar-email');
  const loginButton = screen.getByTestId('btn-play');
//  console.log(loginButton);

  userEvent.type(inputName, 'nome');
  userEvent.type(inputEmail, 'email@email.com');
  
  expect(loginButton.disabled).toBeFalsy();
  
  userEvent.click(loginButton);
//  const { pathname } = history.location;
//  console.log(pathname);
  expect(screen.getByAltText('imagem do avatar')).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByAltText('imagem do avatar')).toBeInTheDocument();
    expect(history.location.pathname).toBe('/game') 
  })  
});
});
