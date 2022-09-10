import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questionApi: [],
      secondTimer: 30,
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

    questionApi.push(resultApi[index].correct_answer);

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
    // this.intervalId =
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((preventState) => ({ secondTimer: preventState.secondTimer - 1 }));
    }, ONE_SECOND);
  };

  render() {
    const { resultApi } = this.props;
    const { index, questionApi, secondTimer } = this.state;
    const ONE_LESS = -1;
    console.log(secondTimer);
    return (
      <div>
        <Header />
        <p data-testid="question-category">
          {resultApi[index].category}
        </p>

        <div>
          { secondTimer}
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
                  key={ i }
                  type="button"
                  disabled={ secondTimer <= ONE_LESS }
                >
                  {v}
                </button>),
            )}

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultApi: state.reducerTrivia.trivia.results,
});

Game.propTypes = {
  resultApi: shape.isRequired,
};

export default connect(mapStateToProps)(Game);
