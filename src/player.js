class Player {

  constructor(token, isTurn) {
    this.id = Math.floor(Date.now() * Math.random());
    this.token = token;
    this.isTurn = isTurn || false;
    this.wins = [];
    this.winTotal = 0;
  }

  saveWinsToStorage(game) {
    var board = Array.from(game.board);
    this.wins.push(board);
    this.winTotal++;
  }

  retrieveDataFromStorage(playerProfile) {
    this.id = playerProfile.id;
    this.token = playerProfile.token;
    this.isTurn = playerProfile.isTurn;
    this.wins = playerProfile.wins;
    this.winTotal = playerProfile.winTotal;
  }

  exchangeTurns() {
    if (!this.isTurn) {
      this.isTurn = true;
    } else {
      this.isTurn = false;
    }
  }
}
