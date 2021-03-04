class Player {

  constructor(token, isTurn, wins, id) {
    this.id = id || Math.floor(Date.now() * Math.random());
    this.token = token;
    this.isTurn = isTurn || false;
    this.wins = wins || [];
    this.winTotal = 0;
  };

  saveWinsToStorage(game) {
    var board = Array.from(game.board);
    this.wins.push(board);
    this.winTotal++
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
