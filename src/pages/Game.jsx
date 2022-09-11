import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import Header from '../components/Header';
import { actionScorePlayer } from '../redux/actions';
import '../App.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questionApi: [],

      secondTimer: 30,

      selectedAnswer: false,
      correctAnswer: '',
      scorePlayer: 0,
    };
  }

  componentDidMount() {
    this.random();
    this.timer();
  }

  random = () => {
    const { resultApi } = this.props;
    const { index } = this.state;
    const questionApi = resultApi[index].incorrect_answers.map((v) => v);

    const correctAnswer = resultApi[index].correct_answer;

    questionApi.push(correctAnswer);
    this.setState({ correctAnswer });

    let lengthQuestion = questionApi.length;
    let assortedNumber;

    while (lengthQuestion !== 0) {
      assortedNumber = Math.floor(Math.random() * lengthQuestion);
      lengthQuestion -= 1;

      [questionApi[lengthQuestion], questionApi[assortedNumber]] = [
        questionApi[assortedNumber], questionApi[lengthQuestion]];

      this.setState({ questionApi });
    }
  };

  setTestId = (v, i) => {
    const { resultApi } = this.props;
    const { index } = this.state;

    const correctAnswer = resultApi[index].correct_answer;
    return v === correctAnswer ? 'correct-answer' : `wrong-answer-${i}`;
  };

  timer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((preventState) => ({ secondTimer: preventState.secondTimer - 1 }));
    }, ONE_SECOND);
  };

  setColor = (index) => {
    const { correctAnswer } = this.state;
    return index === correctAnswer ? 'correct' : 'wrong';
  };


  handleClick = (test) => {
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
    if (test === 'correct') {
      (scores += TEN + (secondTimer * difficulty));
    }
    this.setState((preventState) => ({ scorePlayer: preventState.scorePlayer + scores }));
    dispatch(actionScorePlayer(scores));

  nextQuestion = () => {
    const { index } = this.state;
    this.setState({
      index: index + 1,
      selectedAnswer: false,
    });

  };

  render() {
    const { resultApi } = this.props;
    const { index, questionApi, selectedAnswer, secondTimer, scorePlayer } = this.state;

    const ONE_LESS = -1;
    // console.log(secondTimer);

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
          {questionApi
            .map(
              (v, i) => (
                <button
                  data-testid={ this.setTestId(v, i) }
                  id={ this.setTestId(v, i) }
                  key={ i }
                  className={ selectedAnswer ? this.setColor(v) : '' }
                  onClick={ (e) => this.handleClick(this.setColor(v), e) }
                  type="button"
                  disabled={ secondTimer <= ONE_LESS }
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

const mapStateToProps = (state) => ({
  resultApi: state.reducerTrivia.trivia.results,
});

Game.propTypes = {
  resultApi: shape.isRequired,
  dispatch: func.isRequired,
};

export default connect(mapStateToProps)(Game);
