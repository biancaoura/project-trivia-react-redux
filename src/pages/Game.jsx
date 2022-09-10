import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import Header from '../components/Header';
import '../App.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      questionApi: [],
      selectedAnswer: false,
      correctAnswer: '',
    };
  }

  componentDidMount() {
    this.random();
  }

  random = () => {
    const { resultApi } = this.props;
    const { index } = this.state;
    // console.log(resultApi);
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

  handleClick = () => this.setState({ selectedAnswer: true });

  setColor = (index) => {
    const { correctAnswer } = this.state;
    return index === correctAnswer ? 'correct' : 'wrong';
  };

  render() {
    const { resultApi } = this.props;
    const { index, questionApi, selectedAnswer } = this.state;
    // const questionApi = resultApi[index].incorrect_answers.map((v) => v);
    // questionApi.push(resultApi[index].correct_answer);
    return (
      <div>
        <Header />
        <p data-testid="question-category">
          {resultApi[index].category}
        </p>

        <p data-testid="question-text">
          {resultApi[index].question}

        </p>
        <div data-testid="answer-options">
          {/* <button
            data-testid="correct-answer"
            type="button"
          >
            {resultApi[index].correct_answer}

          </button> */}
          {questionApi
            .map(
              (v, i) => (
                <button
                  data-testid={ this.setTestId(v, i) }
                  id={ this.setTestId(v, i) }
                  key={ i }
                  onClick={ this.handleClick }
                  className={ selectedAnswer ? this.setColor(v) : '' }
                  type="button"
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
