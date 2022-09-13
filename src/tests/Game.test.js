import App from '../App'
import { screen } from '@testing-library/react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';

const initialState = {
  reducerTrivia: {
    trivia: {
      response_code: 0,
      results: [
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What five letter word is the motto of the IBM Computer company?',
          correct_answer: 'Think',
          incorrect_answers: [
            'Click',
            'Logic',
            'Pixel'
          ]
        },
        {
          category: 'Entertainment: Film',
          type: 'multiple',
          difficulty: 'hard',
          question: 'In the 1979 British film &quot;Quadrophenia&quot; what is the name of the seaside city the mods are visiting?',
          correct_answer: 'Brighton',
          incorrect_answers: [
            'Eastbourne',
            'Mousehole',
            'Bridlington'
          ]
        },
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'easy',
          question: 'Which year was the album &quot;Floral Shoppe&quot; by Macintosh Plus released?',
          correct_answer: '2011',
          incorrect_answers: [
            '2014',
            '2013',
            '2012'
          ]
        },
        {
          category: 'Entertainment: Music',
          type: 'multiple',
          difficulty: 'medium',
          question: 'Which one of these rappers is NOT a member of the rap group Wu-Tang Clan?',
          correct_answer: 'Dr.Dre',
          incorrect_answers: [
            'Ol&#039; Dirty Bastard',
            'GZA',
            'Method Man'
          ]
        },
        {
          category: 'Science: Computers',
          type: 'multiple',
          difficulty: 'medium',
          question: 'How fast is USB 3.1 Gen 2 theoretically?',
          correct_answer: '10 Gb/s',
          incorrect_answers: [
            '5 Gb/s',
            '8 Gb/s',
            '1 Gb/s'
          ]
        }
      ]
    },
    token: '73c91281427572dd212f48e1449df769db7d757c3c195a278d79ef83d52da3ca'
  },
  name: {
    name: 'teste'
  },
  gravatarEmail: {
    email: 'teste@teste.com'
  },
  player: {
    score: 0,
    assertions: 0
  }
}

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

  test('2 - Verifica progressão da pontuação no jogo e redirecionamento para feedback', () => {
    userEvent.click(screen.getByRole('button', { name: 'Think' }));
    expect(screen.getAllByText('70')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }))

    userEvent.click(screen.getByRole('button', { name: 'Brighton' }));
    expect(screen.getAllByText('170')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }))

    userEvent.click(screen.getByRole('button', { name: '2011' }));
    expect(screen.getAllByText('210')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }))

    userEvent.click(screen.getByRole('button', { name: 'Dr.Dre' }));
    expect(screen.getAllByText('280')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }))

    userEvent.click(screen.getByRole('button', { name: '10 Gb/s' }));
    expect(screen.getAllByText('350')).toHaveLength(2);
    userEvent.click(screen.getByRole('button', { name: 'Next' }))

    expect(screen.getByText('Well Done!')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: '350' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: '5' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play again' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Ranking' })).toBeInTheDocument();

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