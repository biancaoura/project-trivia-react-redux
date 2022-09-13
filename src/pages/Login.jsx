import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { submitEmail, submitName, actionApiTrivia, actionTrivia } from '../redux/actions';
import { getApiTrivia } from '../data/APITrivia';
import '../css/login.css';
import logoTrivia from '../img/logotrivia.png';

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

    const THREE = 3;

    await dispatchTrivia();
    await dispatchAPITrivia();

    dispatchName(name);
    dispatchEmail(email);

    if (validAPI === THREE) {
      push('/');
      localStorage.clear();
    } else {
      push('/game');
    }
  };

  render() {
    const { name, email, isDisabled } = this.state;
    console.log(logoTrivia);
    return (
      <main>

        <img className="img-balao" src={ logoTrivia } alt="imagem de um balão" />

        <form onSubmit={ this.login }>
          <input
            type="text"
            data-testid="input-player-name"
            className="inputs"
            onChange={ this.handleChange }
            name="name"
            value={ name }
            placeholder="Digite seu nome"
          />
          <input
            type="email"
            data-testid="input-gravatar-email"
            className="inputs"
            onChange={ this.handleChange }
            name="email"
            value={ email }
            placeholder="Digite seu email"
          />
          <button
            type="submit"
            data-testid="btn-play"
            className="buttons"
            id={ isDisabled ? 'button-block' : undefined }
            disabled={ isDisabled }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            className="buttons"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
        </form>
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
  history: shape().isRequired,
  dispatchName: func.isRequired,
  dispatchEmail: func.isRequired,
  dispatchAPITrivia: func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
