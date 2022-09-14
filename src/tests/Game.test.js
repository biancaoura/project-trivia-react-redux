import App from '../App'
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import initialState from './helpers/mockResults';
import mockStorage from './helpers/mockStorage';

const route = '/game';

describe('Verifica renderização da página de jogo', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, initialState, route);
  });

  test('1 - Verifica renderização do cabeçalho', () => {
    expect(screen.getByRole('img', { name: 'imagem do avatar' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: "teste" })).toBeInTheDocument();
    expect(screen.getByTestId('header-score')).toBeInTheDocument();
  });

  test('2 - Verifica renderização dos elementos da pergunta', () => {
    expect(screen.getByTestId('question-category')).toBeInTheDocument();
    expect(screen.getByTestId('timer')).toBeInTheDocument();
    expect(screen.getByTestId('score')).toBeInTheDocument();
    expect(screen.getByTestId('question-text')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });
});

describe('Verifica interação com interface do jogo', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, initialState, route);
  });

  test('1 - Verifica mudança de cores nos botões depois da resposta', () => {
    userEvent.click(screen.getByRole('button', { name: 'Think' }));
    expect(screen.getByRole('button', { name: 'Think' }).className).toContain('correct');
    expect(screen.getByRole('button', { name: 'Click' }).className).toContain('wrong');
    expect(screen.getByRole('button', { name: 'Logic' }).className).toContain('wrong');
    expect(screen.getByRole('button', { name: 'Pixel' }).className).toContain('wrong');
  });

  test('2 - Verifica se perguntas e respostas são renderizadas', async () => {
    const question = await screen.findByText('What five letter word is the motto of the IBM Computer company?');
    const correctAnswer = await screen.findByText('Think');
    
    expect(question).toBeInTheDocument();
    expect(correctAnswer).toBeInTheDocument();
    
    userEvent.click(correctAnswer);
    const nextBtn = screen.getByRole('button', { name: 'Next' });
    userEvent.click(nextBtn);
  });

  test('3 - Verifica progressão da pontuação no jogo e redirecionamento para feedback', async () => {
    userEvent.click(await screen.findByRole('button', { name: 'Think' }));
    expect(screen.getAllByText('70')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Brighton' }));
    expect(screen.getAllByText('170')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '2011' }));
    expect(screen.getAllByText('210')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Dr.Dre' }));
    expect(screen.getAllByText('280')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '1 Gb/s' }));
    expect(screen.getAllByText('280')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Well Done!')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: '280' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ranking' })).toBeInTheDocument();

    localStorage.clear();
  });

  test('4 - Verifica se a pontuação é adicionada no localStorage', async () => {
    expect(localStorage.getItem('ranking')).toBeNull();

    userEvent.click(await screen.findByRole('button', { name: 'Think' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Brighton' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '2011' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Dr.Dre' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '1 Gb/s' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Well Done!')).toBeInTheDocument();
    expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([mockStorage]));
  });

  test('5 - Verifica se a pontuação é somada no localStorage', async () => {
    expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([mockStorage]));

    userEvent.click(await screen.findByRole('button', { name: 'Think' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Brighton' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '2011' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: 'Dr.Dre' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    userEvent.click(await screen.findByRole('button', { name: '1 Gb/s' }));
    userEvent.click(screen.getByRole('button', { name: 'Next' }));

    expect(screen.getByText('Well Done!')).toBeInTheDocument();
    expect(localStorage.getItem('ranking')).toEqual(JSON.stringify([mockStorage, mockStorage]));
  });
});

describe('Verifica se o timer funciona', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, initialState, route);
  });

  test('1 - Verifica se existe um timer', () => {
    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  test('2 - Verifica se pode clicar na resposta após 5 segundos', async () => {
    const correctAnswer = screen.getByTestId('correct-answer');

    expect(correctAnswer).toBeEnabled();

    await new Promise(res => setTimeout(res, 5000));
    expect(correctAnswer).toBeEnabled();

  }, 10000);

  test('3 - Verifica se o botão está desabilitado após 30 segundos', async () => {
    const correctAnswer = screen.getByTestId('correct-answer');

    expect(correctAnswer).toBeEnabled();

    await new Promise(res => setTimeout(res, 32000));
    expect(correctAnswer).toBeDisabled();

  }, 50000);
});