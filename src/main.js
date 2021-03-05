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
    if (game.isWon || game.isDraw) {
      renderBoard();
      toggleWiggleAnimation(player);
      gameEndAnimation();
      disableBoard();
      player.saveWinsToStorage(game);
      setTimeout(function() {
        clearBoard()
      }, 2500);
    } else {
      renderBoard();

    };
  };
};

function move(player, space) {
  if (!game.board[space]) {
    game.makeMove(player, space);
    toggleWiggleAnimation(player);
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

function toggleWiggleAnimation(player) {
  var shrimp = document.getElementById('shrimp');
  var cheese = document.getElementById('cheese');
  if (player.token === 'shrimp' && !game.isWon) {
    shrimp.classList.remove('wiggle');
    cheese.classList.add('wiggle')
  } else if (player.token === 'cheese' && !game.isWon) {
    shrimp.classList.add('wiggle');
    cheese.classList.remove('wiggle')
  } else if (game.isWon || game.isDraw) {
    shrimp.classList.remove('wiggle');
    cheese.classList.remove('wiggle')
  };
};

function gameEndAnimation() {
  if (game.isWon) {
    for (var i = 0; i < spaces.length; i++) {
      if (spaces[i].children[0] &&
        spaces[i].children[0].className === player.token)
        spaces[i].children[0].classList.add('winner')
    };
  } else if (game.isDraw) {
    for (var i = 0; i < spaces.length; i++) {
      if (spaces[i].children[0]) {
        spaces[i].children[0].classList.add('draw')
      };
    };
  };
};

function renderBoard() {
  for (var i = 0; i < game.board.length; i++) {
    spaces[i].innerHTML = '';
    if (game.board[i] === 'shrimp') {
      spaces[i].innerHTML += '<img class="shrimp" src="./assets/shrimp.svg" alt="shrimp">'
    } else if (game.board[i] === 'cheese') {
      spaces[i].innerHTML += '<img class="cheese" src="./assets/cheese.svg" alt="cheese">'
    };
  };
};

function clearBoard() {
  game.resetBoard();
  changeGameHeader(player)
  renderBoard();
  toggleWiggleAnimation(player);
  enableBoard();
  displayWin(player);
  displayWinMobile(player);
};

function disableBoard() {
  gameBoard.classList.add('disable-board')
};

function enableBoard() {
  gameBoard.classList.remove('disable-board')
};

function displayWin(player) {
  var playerOneWins = document.getElementById('playerOneWins');
  var playerTwoWins = document.getElementById('playerTwoWins');
  if (player.token === 'shrimp') {
    playerOneWins.innerHTML = '';
    playerOneWins.innerHTML += `<p>${player.winTotal}</p>`;
  } else if (player.token === 'cheese') {
    playerTwoWins.innerHTML = '';
    playerTwoWins.innerHTML += `<p>${player.winTotal}</p>`;
  };
};

function displayWinMobile(player) {
  if (player.token === 'shrimp') {
    player1Column.classList.add('mobile-win')
    player2Column.classList.remove('mobile-win')
  } else if (player.token === 'cheese') {
    player1Column.classList.remove('mobile-win')
    player2Column.classList.add('mobile-win')
  };
  setTimeout(function() {
    hideWinMobile()
  }, 1500)
};

function hideWinMobile() {
  player1Column.classList.remove('mobile-win');
  player2Column.classList.remove('mobile-win')
};
