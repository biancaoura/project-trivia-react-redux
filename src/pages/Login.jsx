import { shape, func } from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitEmail, submitName, actionApiTrivia } from '../redux/actions';

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

  handleClick = () => {
    const { history: { push } } = this.props;
    push('/settings');
  };

  login = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const {
      history: { push }, dispatchName, dispatchAPItrivia, dispatchEmail } = this.props;
    dispatchAPItrivia();
    dispatchName(name);
    dispatchEmail(email);

    push('/game');
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <main>
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
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleClick }
        >
          Configurações
        </button>
      </main>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAPItrivia: () => dispatch(actionApiTrivia()),
  dispatchName: (name) => dispatch(submitName(name)),
  dispatchEmail: (email) => dispatch(submitEmail(email)),
});

Login.propTypes = {
  history: shape().isRequired,
  dispatchName: func.isRequired,
  dispatchEmail: func.isRequired,
  dispatchAPItrivia: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
