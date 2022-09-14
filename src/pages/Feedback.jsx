import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, number, shape } from 'prop-types';
import Header from '../components/Header';
import '../css/Feedback.css';
import triviaLogo from '../css/images/logo trivia.png';

class Feedback extends Component {
  checkAnswer = () => {
    const { assertions } = this.props;
    const minAnswer = 3;

    if (assertions < minAnswer) return 'Could be better...';
    return 'Well Done!';
  };

  handleClick = (e) => {
    const { history: { push } } = this.props;

    if (e.target.id === 'play-again') push('/');
    else push('/ranking');
  };

  render() {
    const { score, assertions } = this.props;
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">{ this.checkAnswer()}</p>
        <img src={ triviaLogo } alt="logo" className="trivia-logo-feedback" />
        <div className="match-info">
          <span>Pontuação</span>
          <h2
            data-testid="feedback-total-score"
          >
            { score }
          </h2>
          <span>Número de acertos</span>
          <h2
            data-testid="feedback-total-question"
          >
            { assertions }
          </h2>
        </div>
        <button
          type="button"
          id="play-again"
          onClick={ (e) => this.handleClick(e) }
          data-testid="btn-play-again"
          className="feedback-btn"
        >
          Play again
        </button>
        <button
          type="button"
          id="ranking"
          onClick={ (e) => this.handleClick(e) }
          data-testid="btn-ranking"
          className="feedback-btn"
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
