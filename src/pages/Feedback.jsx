import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape } from 'prop-types';

class Feedback extends Component {
  checkAnswer = () => {
    const { correctAnswers } = this.props;
    const minAnswer = 3;

    if (correctAnswers < minAnswer) return 'Could be better...';
    return 'Well Done!';
  };

  handlePlayAgain = () => {
    const { history: { push } } = this.props;
    push('/');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <main>
        <p data-testid="feedback-text">{ this.checkAnswer()}</p>

        <h1
          data-testid="feedback-total-score"
        >
          {score}
        </h1>
        <h3
          data-testid="feedback-total-question"
        >
          {assertions}
        </h3>
        <button
          type="button"
          onChange={ this.handlePlayAgain() }
          data-testid="btn-play-again"
        >
          Play again
        </button>
      </main>
    );
  }
}

Feedback.propTypes = {
  score: number.isRequired,
  assertions: number.isRequired,
  correctAnswers: number.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
  correctAnswers: /* estado dos acertos */ state,
});

export default connect(mapStateToProps)(Feedback);
