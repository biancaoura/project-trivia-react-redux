import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape } from 'prop-types';

class Header extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (

      <header>
        <img
          src={ gravatarEmail.email }
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
