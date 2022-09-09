import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  hashEmail = (email) => {
    const hashedEmail = md5(email).toString();
    return `https://www.gravatar.com/avatar/${hashedEmail}`;
  };

  render() {
    const { name, gravatarEmail: { email } } = this.props;
    return (

      <header>
        <img
          src={ this.hashEmail(email) }
          alt="imagem do avatar"
          data-testid="header-profile-picture"
        />
        <h4 data-testid="header-player-name">{name.name}</h4>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Header.propTypes = {
  name: shape(),
  gravatarEmail: shape(),
};

Header.defaultProps = {
  name: '',
  gravatarEmail: '',
};

export default connect(mapStateToProps)(Header);
