import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape } from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  checkAnswer = () => {
    const { assertions } = this.props;
    const minAnswer = 3;

    if (assertions < minAnswer) return 'Could be better...';
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
        <Header />
        <p data-testid="feedback-text">{ this.checkAnswer()}</p>

        <h1
          data-testid="feedback-total-score"
        >
          { score }
        </h1>
        <h3
          data-testid="feedback-total-question"
        >
          { assertions === 0 ? 0 : assertions }
        </h3>
        <button
          type="button"
          onClick={ this.handlePlayAgain }
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
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
