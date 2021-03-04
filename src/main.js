var game = createGame();
var gameBoard = document.querySelector('.game-board');
var spaces = gameBoard.children;
var player1Column = document.getElementById('playerOne');
var player2Column = document.getElementById('playerTwo')

gameBoard.addEventListener('click', playGame);
window.addEventListener('load', checkCurrentPlayer);

function createGame() {
  var ticTacToe = new Game(3, 3);
  var shrimp = new Player('shrimp', true);
  var cheese = new Player('cheese');
  ticTacToe.board = ticTacToe.createBoard();
  ticTacToe.addPlayers(shrimp, cheese);
  return ticTacToe
};

function playGame() {
  if (event.target.classList.contains('squares')) {
    move();
  };
};

function move() {
  var player = checkCurrentPlayer();
  var space = checkCurrentSpace();
  if (!game.board[space]) {
    game.makeMove(player, space);
    toggleWiggle(player);
    renderBoard();
  };
};

function checkCurrentPlayer() {
  for (var i = 0; i < game.players.length; i++) {
    if (game.players[i].isTurn) {
      return game.players[i];
    };
  };
};

function checkCurrentSpace() {
  var currentSpace;
  for (var i = 0; i < spaces.length; i++) {
    if (event.target === spaces[i]) {
      currentSpace = i;
    };
  };
  return currentSpace
};

function toggleWiggle(player) {
  if (player.token === 'shrimp') {
    playerOne.classList.remove('current-player');
    playerTwo.classList.add('current-player')
  } else if (player.token === 'cheese') {
    playerTwo.classList.remove('current-player');
    playerOne.classList.add('current-player')
  };
};

function renderBoard() {
  clearBoard();
  for (var i = 0; i < game.board.length; i++) {
    if (game.board[i] === 'shrimp') {
      spaces[i].innerHTML += '<img src="./assets/shrimp.svg" alt="shrimp">'
    } else if (game.board[i] === 'cheese') {
      spaces[i].innerHTML += '<img src="./assets/cheese.svg" alt="cheese">'
    };
  };
};

// function renderSpace(space) {
//   var token = game.board[space];
//   event.target.innerHTML += `<img src="./assets/${token}.svg" alt="${token}">`;
// };

function clearBoard() {
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = ''
  };
};
// shrimp tag:
// `<img src="./assets/shrimp.svg" alt="shrimp">`
// cheese tag:
// `<img src="./assets/cheese.svg" alt="cheese">`
