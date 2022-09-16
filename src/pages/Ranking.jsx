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
    const rankStorage = JSON.parse(localStorage.getItem('ranking'));
    const ranking = rankStorage ? rankStorage.sort((a, b) => b.score - a.score) : [];
    this.setState({ ranking });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking-main">
        <h1>Ranking</h1>
        <div className="ranking-card">
          {
            ranking.map((position) => (
              <section className="player-ranking-info" key={ position.picture }>
                <div>
                  <img
                    className="player-ranking-image"
                    src={ position.picture }
                    alt={ position.name }
                  />
                  <h6>{ position.name }</h6>
                </div>
                <div>
                  <span>Score:</span>
                  <h6
                    className="player-ranking-score"
                  >
                    { position.score }
                  </h6>
                </div>
              </section>
            ))
          }
          <button
            type="button"
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
