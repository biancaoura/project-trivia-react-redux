import React, { Component } from 'react';
import { connect } from 'react-redux';
import { shape, func } from 'prop-types';
import { submitEmail, submitName, actionApiTrivia } from '../redux/actions';
import { getApiTrivia } from '../services/APITrivia';
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

  login = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    const {
      history: { push }, dispatchName, dispatchAPITrivia, dispatchEmail,
    } = this.props;

    const APITrivia = await getApiTrivia();
    const validAPI = APITrivia.trivia.response_code;

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
        <img className="img-balao" src={ logoTrivia } alt="imagem de um balão" />
        <form onSubmit={ this.login }>
          <h2>Time to play</h2>
          <input
            type="text"
            className="inputs"
            onChange={ this.handleChange }
            name="name"
            value={ name }
            placeholder="Name"
          />
          <input
            type="email"
            className="inputs"
            onChange={ this.handleChange }
            name="email"
            value={ email }
            placeholder="Email"
          />
          <button
            type="submit"
            className={ isDisabled ? 'buttons disabled' : 'buttons' }
            disabled={ isDisabled }
          >
            Play
          </button>
        </form>
      </main>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchAPITrivia: () => dispatch(actionApiTrivia()),
  dispatchName: (name) => dispatch(submitName(name)),
  dispatchEmail: (email) => dispatch(submitEmail(email)),
});

Login.propTypes = {
  history: shape(),
  dispatchName: func.isRequired,
  dispatchEmail: func.isRequired,
  dispatchAPITrivia: func.isRequired,
};

Login.defaultProps = {
  history: {},
};

export default connect(null, mapDispatchToProps)(Login);
