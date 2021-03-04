var game = createGame();
var gameSection = document.querySelector('.game')
var gameHeader = gameSection.children[0];
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
  ticTacToe.addPlayers(shrimp, cheese);
  return ticTacToe
};

function playGame() {



  if (event.target.classList.contains('squares')) {
    var player = checkCurrentPlayer();
    var space = checkCurrentSpace();
    move(player, space);
    changeGameHeader(player);
    if (game.isWon) {
      renderBoard();
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
    playerOne.classList.remove('current-player');
    playerTwo.classList.add('current-player')
  } else if (player.token === 'cheese') {
    playerTwo.classList.remove('current-player');
    playerOne.classList.add('current-player')
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
  for (var i = 0; i < spaces.length; i++) {
    spaces[i].innerHTML = ''
  };
  game.resetBoard();
};
