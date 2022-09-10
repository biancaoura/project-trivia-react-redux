import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actionApiTrivia } from '../redux/actions';
import { getApiTriva } from '../data/APITrivia';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      isDisabled: true,
    };
  }

  enableButton = () => {
    const { name, email } = this.state;
    const validName = name.length > 0;
    const validEmail = email.length > 0;
    const validForm = validName && validEmail;
    this.setState({
      isDisabled: !validForm,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  login = async (event) => {
    event.preventDefault();
    const { dispatch, history } = this.props;
    const APITrivia = await getApiTriva();
    const validAPI = APITrivia.trivia.response_code;
    const THREE = 3;
    await dispatch(actionApiTrivia(), validAPI);
    if (validAPI === THREE) {
      console.log('oi');
      history.push('/');
      localStorage.clear();
    } else {
      history.push('/game');
    }
    // history.push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <form onSubmit={ this.login }>
        <input
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          name="name"
          value={ name }
          placeholder="Digite seu nome"
        />
        <input
          type="email"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          name="email"
          value={ email }
          placeholder="Digite seu email"
        />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ isDisabled }
        >
          Play
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Login);
