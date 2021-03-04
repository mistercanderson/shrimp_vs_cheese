class Player {

  constructor(id, token, wins) {
    this.id = id || Math.floor(Date.now() * Math.random());
    this.token = token;
    this.isWinner = false;
    this.wins = wins || [];
  };

  makeMove(space) {
    space.push(this.name)
  };

  saveWinsToStorage(game) {
    if (this.isWinner) {
      this.wins.push(game)
    };
  };

  retreiveWinsFromStorage(wins) {
    this.wins.push(wins);
  };
  
};
