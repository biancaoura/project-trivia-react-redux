import React, { Component } from 'react';
import { connect } from 'react-redux';

class Game extends Component {
  render() {
    return (
      <div>
        <header>
          <img
            src=""
            alt=""
            data-testid="header-profile-picture"
          />
          <h4 data-testid="header-player-name">bla</h4>
          <p data-testid="header-score">0</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(Game);
