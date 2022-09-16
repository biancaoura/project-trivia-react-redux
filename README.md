# Trivia Project

## Goals

### Develop a trivia game application:

#### Login page:

- Login and redirect to `/game`
- Retrieve avatar from `Gravatar`
- Fetch token for the trivia game

#### Header component:

- User info:
  - name;
  - Gravatar's avatar;
  - score

#### Game page:

- Render the game
- When clicking the answer, its border turns to green if correct, or red if wrong
- 30 seconds timer, when it's over, answer buttons become disabled
- Score is calculated following the formula: `10 + (timer * difficulty)`
- `Next` button only shows after clicking an aswer
- After the 5th question, redirect to `/feedback`

#### Feedback page:

- Displays a message according to user's score
- Displays total score and amount of correct answers
- `Play Again` button to redirect to `/`
- `Rankings` button to redirect to `/ranking`

#### Rankings page:

- `Home` button to redirect to `/`
- Displays rankings with players' name, avatar and score (info kept in localStorage)

#### Develop tests for all pages
- With _jest / RTL_
#### using APIs:
- Open Trivia DB: `https://opentdb.com/api_config.php`
- Gravatar: `https://br.gravatar.com/site/implement/images/`

[Check it out!](https://biancaoura.github.io/project-trivia-react-redux/)

##

> Project developed with React, Redux, Jest and RTL

> _image_ and _renderWithRouterAndRedux_ files provided by Trybe

> Developed with Alexsandro Jr, Danilo Isaac, Miguel Inácio and Ricardo Leite