import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { submitEmail, submitName, actionApiTrivia, actionTrivia } from '../redux/actions';
import { getApiTrivia } from '../data/APITrivia';

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
      history: { push }, dispatchName, dispatchAPITrivia, dispatchEmail, dispatchTrivia,
    } = this.props;

    const APITrivia = await getApiTrivia();
    const validAPI = APITrivia.trivia.response_code;

    await dispatchTrivia();
    await dispatchAPITrivia();

    dispatchName(name);
    dispatchEmail(email);

    if (validAPI === 0) {
      push('/game');
    } else {
      localStorage.clear();
      push('/');
    }
  };

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <main>
        <form onSubmit={ this.login }>
          <h2>Sua Vez de Jogar</h2>
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
  dispatchTrivia: () => dispatch(actionTrivia()),
  dispatchAPITrivia: () => dispatch(actionApiTrivia()),
  dispatchName: (name) => dispatch(submitName(name)),
  dispatchEmail: (email) => dispatch(submitEmail(email)),
});

Login.propTypes = {
  dispatchTrivia: func.isRequired,
  history: shape(),
  dispatchName: func.isRequired,
  dispatchEmail: func.isRequired,
  dispatchAPITrivia: func.isRequired,
};

Login.defaultProps = {
  history: {},
};

export default connect(null, mapDispatchToProps)(Login);
