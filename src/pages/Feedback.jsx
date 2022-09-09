import { number } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Feedback extends Component {
  checkAnswer = () => {
    const { correctAnswers } = this.props;
    const minAnswer = 3;
    if (correctAnswers < minAnswer) return 'Could be better...';
    return 'Well Done!';
  };

  render() {
    return (
      <main>
        <p data-testid="feedback-text">{ this.checkAnswer()}</p>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  correctAnswers: /* estado dos acertos */ state,
});

Feedback.propTypes = {
  correctAnswers: number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
