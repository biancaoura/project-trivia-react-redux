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
        <div className="score-container">
          <img src={ triviaLogo } alt="logo" className="trivia-logo-feedback" />
          <div className="match-info">
            <h3>{ this.checkAnswer()}</h3>
            <h4>Score</h4>
            <p>{ score }</p>
            <h4>Correct answers</h4>
            <p>{ assertions }</p>
          </div>
        </div>
        <div className="feedback-buttons-container">
          <button
            type="button"
            id="play-again"
            onClick={ (e) => this.handleClick(e) }
            className="feedback-btn"
          >
            Play again
          </button>
          <button
            type="button"
            id="ranking"
            onClick={ (e) => this.handleClick(e) }
            className="feedback-btn"
          >
            Ranking
          </button>
        </div>
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
