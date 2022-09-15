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
  userInfo: {
    email: 'teste@teste.com',
    name: 'teste',
  },
  player: {
    score: 0,
    assertions: 0
  }
};

export default initialState;