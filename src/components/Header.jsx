import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, number } from 'prop-types';
import md5 from 'crypto-js/md5';
import '../css/Header.css';
import triviaLogo from '../css/images/logo trivia.png';

class Header extends Component {
  hashEmail = (email) => {
    const hashedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hashedEmail}`;
  };

  render() {
    const { player: { email, name }, score } = this.props;
    return (
      <header>
        <img className="trivia-img" src={ triviaLogo } alt="trivia logo" />
        <div>
          <div className="player-info">
            <img
              src={ this.hashEmail(email) }
              alt="avatar"
              className="user-image"
            />
            <h4>{ name }</h4>
          </div>
          <h4>
            Score:
            <span className="score">{ score }</span>
          </h4>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  score: state.player.score,
});

Header.propTypes = {
  player: shape(),
  score: number,
};

Header.defaultProps = {
  player: '',
  score: 0,
};

export default connect(mapStateToProps)(Header);
