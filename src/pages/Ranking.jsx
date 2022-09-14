import React, { Component } from 'react';
import { shape } from 'prop-types';
import '../css/Ranking.css';

export default class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const MINUS_ONE = -1;
    const sortedRanking = ranking.sort((a, b) => (a.score > b.score ? MINUS_ONE : 1));
    this.setState({ ranking: sortedRanking });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-main">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="ranking-card">
          {
            ranking.map((position, index) => (
              <section className="player-ranking-info" key={ position.picture }>
                <div>
                  <img
                    className="player-ranking-image"
                    src={ position.picture }
                    alt={ position.name }
                  />
                  <h6 data-testid={ `player-name-${index}` }>{ position.name }</h6>
                </div>
                <div>
                  <span>Score:</span>
                  <h6
                    className="player-ranking-score"
                    data-testid={ `player-score-${index}` }
                  >
                    { position.score }
                  </h6>
                </div>
              </section>
            ))
          }
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.handleClick }
            className="home-button"
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: shape().isRequired,
};
