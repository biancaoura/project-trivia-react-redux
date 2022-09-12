import React, { Component } from 'react';
import { shape } from 'prop-types';

export default class Ranking extends Component {
  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape().isRequired,
};
