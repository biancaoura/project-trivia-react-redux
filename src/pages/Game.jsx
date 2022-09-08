import { shape } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <div>
        <header>
          <img
            src={ gravatarEmail.email }
            alt="imagem do avatar"
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">{name.name}</h4>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

Game.propTypes = {
  name: shape(),
  gravatarEmail: shape(),
};

Game.defaultProps = {
  name: '',
  gravatarEmail: '',
};

export default connect(mapStateToProps)(Game);
