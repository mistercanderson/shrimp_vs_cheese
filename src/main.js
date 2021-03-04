// Data Model
var game = createGame('shrimp', 'cheese');
var player = checkCurrentPlayer();

// DOM Elements
var gameSection = document.querySelector('.game')
var gameHeader = gameSection.children[0];
var gameBoard = document.querySelector('.game-board');
var spaces = gameBoard.children;
var player1Column = document.getElementById('playerOne');
var player2Column = document.getElementById('playerTwo')

// Event Listeners
gameBoard.addEventListener('click', playGame);

// Functions
function createGame(player1, player2) {
  var ticTacToe = new Game(3, 3);
  var p1 = new Player(player1, true);
  var p2 = new Player(player2);
  ticTacToe.addPlayers(p1, p2);
  return ticTacToe
};

function playGame() {
  if (event.target.classList.contains('squares')) {
    player = checkCurrentPlayer();
    var space = checkCurrentSpace();
    move(player, space);
    changeGameHeader(player);
    if (game.isWon) {
      renderBoard();
      player.saveWinsToStorage(game);
      setTimeout(function(){clearBoard()}, 2500);
    } else {
      renderBoard();
    };
  };
};


function move(player, space) {
  if (!game.board[space]) {
    game.makeMove(player, space);
    toggleWiggle(player);
  };
};

function changeGameHeader(player) {
  var hasWinner = game.checkForWin(player);
  var gameDisplay = 'SHRIMP VS. CHEESE';
  if (hasWinner) {
    gameDisplay = hasWinner;
    gameHeader.innerText = hasWinner
  };
  gameHeader.innerText = gameDisplay.toUpperCase()
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
    player1Column.classList.remove('current-player');
    player2Column.classList.add('current-player')
  } else if (player.token === 'cheese') {
    player1Column.classList.add('current-player');
    player2Column.classList.remove('current-player')
  };
};

function renderBoard() {
  for (var i = 0; i < game.board.length; i++) {
    spaces[i].innerHTML = '';
    if (game.board[i] === 'shrimp') {
      spaces[i].innerHTML += '<img src="./assets/shrimp.svg" alt="shrimp">'
    } else if (game.board[i] === 'cheese') {
      spaces[i].innerHTML += '<img src="./assets/cheese.svg" alt="cheese">'
    };
  };
};

function clearBoard() {
  game.resetBoard();
  changeGameHeader(player)
  renderBoard();
};
