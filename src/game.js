class Game {

  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.players = [];
    this.board = this.createBoard();
  };

  createBoard() {
    var board = [];
    var boardArea = this.height * this.width;
    for (var i = 0; i < boardArea; i++) {
      var space = '';
      board.push(space);
    };
    return board;
  };

  addPlayers(player1, player2) {
    this.players.push(player1, player2)
  };

  makeMove(player, space) {
    if (!this.board[space]) {
      this.board[space] = player.token;
      for (var i = 0; i < this.players.length; i++) {
        this.players[i].exchangeTurns();
      };
      return this.checkForWin(player);
    } else {
      return 0;
    };
  };

  checkForWin(player) {
    if (this.horizontalCheck(player)) {
      player.wins++;
      this.resetGame();
      return `${player.token} wins!`
    } else if (this.verticalCheck(player)) {
      player.wins++;
      this.resetGame();
      return `${player.token} wins!`
    } else if (this.diagonalCheck(player)) {
      player.wins++;
      this.resetGame();
      return `${player.token} wins!`
    } else if (this.board.every(this.drawCheck)) {
      this.resetGame();
      return `It's a Draw`
    } else {
      return false
    };
  };

  horizontalCheck(player) {
    if (this.board[0] === player.token &&
      this.board[1] === player.token &&
      this.board[2] === player.token) {
      return true
    } else if (this.board[3] === player.token &&
      this.board[4] === player.token &&
      this.board[5] === player.token) {
      return true
    } else if (this.board[6] === player.token &&
      this.board[7] === player.token &&
      this.board[8] === player.token) {
      return true
    } else {
      return false;
    };
  };

  verticalCheck(player) {
    if (this.board[0] === player.token &&
      this.board[3] === player.token &&
      this.board[6] === player.token) {
      return true
    } else if (this.board[1] === player.token &&
      this.board[4] === player.token &&
      this.board[7] === player.token) {
      return true
    } else if (this.board[2] === player.token &&
      this.board[5] === player.token &&
      this.board[8] === player.token) {
      return true
    } else {
      return false;
    };
  };

  diagonalCheck(player) {
    if (this.board[0] === player.token &&
      this.board[4] === player.token &&
      this.board[8] === player.token) {
      return true
    } else if (this.board[2] === player.token &&
      this.board[4] === player.token &&
      this.board[6] === player.token) {
      return true
    } else {
      return false;
    };
  };

  drawCheck(space) {
    return space.length > 0;
  };


  resetGame() {
    for (var i = 0; i < this.board.length; i++) {
      this.board[i] = '';
    };
  };
};
