const setTimer = () => {
  const ONE_SECOND = 1000;
  setInterval(() => {
    this.setState((preventState) => ({ secondTimer: preventState.secondTimer - 1 }));
  }, ONE_SECOND);
};

module.exports = setTimer;