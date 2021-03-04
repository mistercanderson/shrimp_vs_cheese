class Player {

  constructor(token, isTurn, wins, id) {
    this.id = id || Math.floor(Date.now() * Math.random());
    this.token = token;
    this.isTurn = isTurn || false;
    this.isWinner = false;
    this.wins = wins || [];
  };

  saveWinsToStorage(game) {
    if (this.isWinner) {
      this.wins.push(game)
    };
  };

  retreiveWinsFromStorage(wins) {
    this.wins.push(wins);
  };

  exchangeTurns() {
    if (!this.isTurn) {
      this.isTurn = true;
    } else {
      this.isTurn = false;
    };
  };
};
