import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <main>
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
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Feedback);
