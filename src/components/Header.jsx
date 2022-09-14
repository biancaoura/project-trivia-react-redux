import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, number } from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  hashEmail = (email) => {
    const hashedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hashedEmail}`;
  };

  render() {
    const { name: { name }, gravatarEmail: { email }, score } = this.props;
    return (
      <header>
        <img
          src={ this.hashEmail(email) }
          alt="imagem do avatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{ name }</h4>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
  score: state.player.score,
});

Header.propTypes = {
  name: shape(),
  gravatarEmail: shape(),
  score: number,
};

Header.defaultProps = {
  name: '',
  gravatarEmail: '',
  score: 0,
};

export default connect(mapStateToProps)(Header);
