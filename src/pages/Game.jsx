import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, func, shape } from 'prop-types';
import Header from '../components/Header';
import { actionScorePlayer } from '../redux/actions';
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
      this.setState((preventState) => ({ secondTimer: preventState.secondTimer - 1 }));
    }, ONE_SECOND);
  };

  setColor = (index) => {
    const { correctAnswer } = this.state;
    return index === correctAnswer ? 'correct' : 'wrong';
  };

  handleClick = (className) => {
    this.setState({ selectedAnswer: true });
    const { secondTimer, index } = this.state;
    const { resultApi, dispatch } = this.props;

    const THREE = 3;
    const TEN = 10;

    let difficulty = 0;
    if (resultApi[index].difficulty === 'easy') {
      difficulty += 1;
    } else if (resultApi[index].difficulty === 'medium') {
      difficulty += 2;
    } else {
      difficulty += THREE;
    }
    console.log(difficulty);
    let scores = 0;
    if (className === 'correct') {
      (scores += TEN + (secondTimer * difficulty));
    }
    this.setState((prevState) => ({ scorePlayer: prevState.scorePlayer + scores }));
    dispatch(actionScorePlayer(scores));
  };

  nextQuestion = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      selectedAnswer: false,
    });
  };

  render() {
    const { resultApi } = this.props;
    const { index, allAnswers, selectedAnswer, secondTimer, scorePlayer } = this.state;

    const MINUS_ONE = -1;

    return (
      <div>
        <Header />
        <p data-testid="question-category">
          {resultApi[index].category}
        </p>

        <div>
          { secondTimer}
        </div>

        <div>
          { scorePlayer}
        </div>

        <p data-testid="question-text">
          {resultApi[index].question}

        </p>
        <div data-testid="answer-options">
          {allAnswers
            .map(
              (v, i) => (
                <button
                  data-testid={ this.setTestId(v, i) }
                  key={ i }
                  className={ selectedAnswer && this.setColor(v) }
                  onClick={ (e) => this.handleClick(this.setColor(v), e) }
                  type="button"
                  disabled={ secondTimer <= MINUS_ONE }
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
            >
              Next
            </button>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ reducerTrivia: { trivia: { results } } }) => ({
  resultApi: results,
});

Game.propTypes = {
  resultApi: arrayOf(shape()).isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Game);
