import React, { Component } from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

class Feedback extends Component {
  checkAnswer = () => {
    const { score } = this.props;
    const minAnswer = 3;

    if (score < minAnswer) return 'Could be better...';
    return 'Well Done!';
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

      </main>
    );
  }
}

Feedback.propTypes = {
  score: number.isRequired,
  assertions: number.isRequired,
  // correctAnswers: number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
  // correctAnswers: /* estado dos acertos */ state,
});

export default connect(mapStateToProps)(Feedback);
