import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, shape } from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { actionScorePlayer, increaseCorrect } from '../redux/actions';
import '../App.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      allAnswers: [],
      secondTimer: 30,
      selectedAnswer: false,
      correctAnswer: '',
      scorePlayer: 0,
    };
  }

  componentDidMount() {
    this.shuffleAnswers();
    this.setTimer();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.secondTimer === 0) {
  //     this.setState({ secondTimer: 30 });
  //   }
  // }

  shuffleAnswers = () => {
    const { resultApi } = this.props;
    const { index } = this.state;
    const wrongAnswers = resultApi[index].incorrect_answers.map((v) => v);
    const correctAnswer = resultApi[index].correct_answer;

    const allAnswers = [...wrongAnswers, correctAnswer];

    this.setState({ correctAnswer });

    let answersLength = allAnswers.length;
    let randomNum;

    while (answersLength !== 0) {
      randomNum = Math.floor(Math.random() * answersLength);
      answersLength -= 1;

      [allAnswers[answersLength], allAnswers[randomNum]] = [
        allAnswers[randomNum], allAnswers[answersLength]];
      this.setState({ allAnswers });
    }
  };

  setTestId = (v, i) => {
    const { resultApi } = this.props;
    const { index } = this.state;

    const correctAnswer = resultApi[index].correct_answer;
    return v === correctAnswer ? 'correct-answer' : `wrong-answer-${i}`;
  };

  setTimer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ secondTimer: prevState.secondTimer - 1 }));
    }, ONE_SECOND);
  };

  setColor = (index) => {
    const { correctAnswer } = this.state;
    return index === correctAnswer ? 'correct' : 'wrong';
  };

  toggleSelected = () => this.setState({ selectedAnswer: true });

  setDifficulty = () => {
    const { index } = this.state;
    const { resultApi } = this.props;
    const THREE = 3;

    let difficulty = 0;
    if (resultApi[index].difficulty === 'easy') {
      difficulty += 1;
    } else if (resultApi[index].difficulty === 'medium') {
      difficulty += 2;
    } else {
      difficulty += THREE;
    }

    return difficulty;
  };

  setScore = (className) => {
    const { secondTimer } = this.state;
    const { dispatch } = this.props;

    const TEN = 10;
    const difficulty = this.setDifficulty();

    let scores = 0;
    let assertions = 0;

    if (className === 'correct') {
      (scores += TEN + (secondTimer * difficulty));
      assertions += 1;
    }

    this.setState((prevState) => ({ scorePlayer: prevState.scorePlayer + scores }));
    dispatch(actionScorePlayer(scores));
    dispatch(increaseCorrect(assertions));
  };

  handleClick = (className) => {
    this.toggleSelected();
    this.setScore(className);
  };

  nextQuestion = () => {
    const { index, scorePlayer } = this.state;
    const { history, name: { name }, gravatarEmail } = this.props;
    const FOUR = 4;
    this.setState({
      index: index + 1,
      selectedAnswer: false,
      secondTimer: 30,
    }, () => this.shuffleAnswers());
    // this.shuffleAnswers();
    if (index === FOUR) {
      const hashedEmail = md5(gravatarEmail.email).toString();
      const url = `https://www.gravatar.com/avatar/${hashedEmail}`;
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const playerResults = { name, score: scorePlayer, picture: url };
      // if (ranking.length > 1) {
      if (ranking) {
        ranking.push(playerResults);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      } else {
        localStorage.setItem('ranking', JSON.stringify([playerResults]));
      }
      history.push('/feedback');
    }
  };

  render() {
    const { resultApi } = this.props;
    const { index, allAnswers, selectedAnswer, secondTimer, scorePlayer } = this.state;

    // const MINUS_ONE = 0;
    return (
      <div>
        <Header />
        <main>

          <section className="question-section">

            <section className="category">
              <p data-testid="question-category">
                {resultApi[index].category}
              </p>
            </section>

            <p data-testid="question-text">
              {resultApi[index].question}
            </p>

            <section className="rt-game-info">
              <div data-testid="timer">
                { secondTimer }
              </div>

              <div data-testid="score">
                { scorePlayer }
              </div>
            </section>

          </section>

          <div className="buttons">
            <div className="answers" data-testid="answer-options">
              {allAnswers
                .map(
                  (v, i) => (
                    <button
                      data-testid={ this.setTestId(v, i) }
                      key={ i }
                      className={ `${selectedAnswer ? this.setColor(v) : undefined}
                     answer-option` }
                      onClick={ () => this.handleClick(this.setColor(v)) }
                      type="button"
                      disabled={ secondTimer <= 0 }
                    >
                      {v}
                    </button>),
                )}
            </div>
            {
              selectedAnswer
          && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.nextQuestion }
              className="next-question"
            >
              Next
            </button>
          )
            }
          </div>

        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultApi: state.reducerTrivia.trivia.results,
  name: state.name,
  gravatarEmail: state,
});

Game.propTypes = {
  resultApi: arrayOf(shape()).isRequired,
  dispatch: func.isRequired,
  history: shape().isRequired,
  name: shape().isRequired,
  gravatarEmail: shape().isRequired,
};

export default connect(mapStateToProps)(Game);
