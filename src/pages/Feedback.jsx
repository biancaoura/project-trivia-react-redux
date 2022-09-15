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

  handleClick = ({ target: { id } }) => {
    const { history: { push } } = this.props;

    if (id === 'play-again') push('/');
    else push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <main>
        <Header />
        <h4 data-testid="feedback-text">{ this.checkAnswer()}</h4>

        <h1 data-testid="feedback-total-score">
          { score }
        </h1>
        <h3 data-testid="feedback-total-question">
          { assertions }
        </h3>
        <button
          type="button"
          id="play-again"
          onClick={ (e) => this.handleClick(e) }
          data-testid="btn-play-again"
        >
          Play again
        </button>
        <button
          type="button"
          id="ranking"
          onClick={ (e) => this.handleClick(e) }
          data-testid="btn-ranking"
        >
          Ranking
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
