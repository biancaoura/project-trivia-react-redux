import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { actionScorePlayer, increaseCorrect } from '../redux/actions';
import '../css/Game.css';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      index: 0,
      allAnswers: [],
      milliseconds: 30,
      isSelected: false,
      correctAnswer: '',
      score: 0,
    };
  }

  async componentDidMount() {
    await this.shuffleAnswers();
    this.setTimer();
  }

  shuffleAnswers = async () => {
    const { reducerTrivia: { trivia: { results } } } = this.props;
    const { index } = this.state;

    const apiReturn = await results[index];

    const wrongAnswers = apiReturn.incorrect_answers.map((v) => v);
    const correctAnswer = apiReturn.correct_answer;
    const allAnswers = [...wrongAnswers, correctAnswer];

    this.setState({ correctAnswer });

    let answersLength = allAnswers.length;
    let randomNum;

    while (answersLength !== 0) {
      randomNum = Math.floor(Math.random() * answersLength);
      answersLength -= 1;

      [allAnswers[answersLength], allAnswers[randomNum]] = [
        allAnswers[randomNum], allAnswers[answersLength]];
      this.setState({ allAnswers });
    }
  };

  setTimer = () => {
    const ONE_SECOND = 1000;
    setInterval(() => {
      this.setState((prevState) => ({ milliseconds: prevState.milliseconds - 1 }));
    }, ONE_SECOND);
  };

  setColor = (index) => {
    const { correctAnswer } = this.state;
    return index === correctAnswer ? 'correct' : 'wrong';
  };

  toggleSelected = () => this.setState({ isSelected: true });

  setDifficulty = () => {
    const { index } = this.state;
    const { reducerTrivia: { trivia: { results } } } = this.props;
    const THREE = 3;

    let difficulty = 0;
    if (results[index].difficulty === 'easy') {
      difficulty += 1;
    } else if (results[index].difficulty === 'medium') {
      difficulty += 2;
    } else {
      difficulty += THREE;
    }
    return difficulty;
  };

  setScore = (className) => {
    const { milliseconds } = this.state;
    const { dispatch } = this.props;

    const TEN = 10;
    const difficulty = this.setDifficulty();

    let sumScore = 0;
    let assertions = 0;

    if (className === 'correct') {
      (sumScore += TEN + (milliseconds * difficulty));
      assertions += 1;
    }

    this.setState((prevState) => ({ score: prevState.score + sumScore }));
    dispatch(actionScorePlayer(sumScore));
    dispatch(increaseCorrect(assertions));
  };

  handleClick = (className) => {
    this.toggleSelected();
    this.setScore(className);
  };

  nextQuestion = () => {
    const { index, score } = this.state;
    const { history, player: { email, name } } = this.props;

    const FOUR = 4;
    this.setState({
      index: index + 1,
      isSelected: false,
      milliseconds: 30,
    }, () => this.shuffleAnswers());
    if (index === FOUR) {
      const hashedEmail = md5(email).toString();
      const url = `https://www.gravatar.com/avatar/${hashedEmail}`;
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      const playerResults = { name, score, picture: url };

      if (ranking) {
        ranking.push(playerResults);
        localStorage.setItem('ranking', JSON.stringify(ranking));
      } else {
        localStorage.setItem('ranking', JSON.stringify([playerResults]));
      }
      history.push('/feedback');
    }
  };

  decodeEntity = (inputStr) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = inputStr;
    return textarea.value;
  };

  render() {
    const { reducerTrivia: { trivia: { results } } } = this.props;
    const { index, allAnswers, isSelected, milliseconds, score } = this.state;

    return (
      <div>
        <Header />
        <main className="game-main">

          <section className="question-section">

            <section className="category">
              <p className="question-category">
                {results[index].category}
              </p>
            </section>

            <p className="question-text">
              { this.decodeEntity(results[index].question) }
            </p>

            <section className="rt-game-info">
              <div>
                { milliseconds < 0 ? 'time\'s out' : milliseconds }
              </div>

              <div>
                { score }
              </div>
            </section>
          </section>

          <div className="game-buttons">
            <div className="answers">
              { allAnswers
                .map(
                  (answer, i) => (
                    <button
                      key={ i }
                      className={ `${isSelected ? this.setColor(answer) : undefined}
                     answer-option` }
                      onClick={ () => this.handleClick(this.setColor(answer)) }
                      type="button"
                      disabled={ milliseconds <= 0 }
                    >
                      { this.decodeEntity(answer)}
                    </button>),
                ) }
            </div>
            {
              isSelected
              && (
                <button
                  type="button"
                  onClick={ this.nextQuestion }
                  className="next-question"
                >
                  Next
                </button>
              )
            }
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ ...state });

Game.propTypes = {
  reducerTrivia: shape().isRequired,
  dispatch: func.isRequired,
  history: shape().isRequired,
  player: shape().isRequired,
};

export default connect(mapStateToProps)(Game);
