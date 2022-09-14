import React, { Component } from 'react';
import { shape } from 'prop-types';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // const MINUS_ONE = -1;
    const sortedRanking = ranking === null
      ? [] : ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedRanking });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((position, index) => (
            <section key={ position.picture }>
              <img src={ position.picture } alt={ position.name } />
              <h6 data-testid={ `player-name-${index}` }>{ position.name }</h6>
              <h6 data-testid={ `player-score-${index}` }>{ position.score }</h6>
            </section>
          ))
        }
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
