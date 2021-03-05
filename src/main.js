// Data Model
var game;
var player;

// DOM Elements
var gameSection = document.getElementById('game')
var gameDisplay = document.getElementById('gameDisplay');
var gameBoard = document.getElementById('gameBoard');
var spaces = gameBoard.children;
var player1Column = document.getElementById('playerOne');
var player2Column = document.getElementById('playerTwo')

// Event Listeners
window.addEventListener('load', checkStorage);
gameBoard.addEventListener('click', playGame);

// Functions
function createGame(player1, player2) {
  var ticTacToe = new Game(3, 3);
  var p1 = new Player(player1, true);
  var p2 = new Player(player2);
  ticTacToe.addPlayers(p1, p2);
  return ticTacToe
};

function startButton() {
  if (event.target.id === 'startButton') {
    game = createGame('shrimp', 'cheese');
    player = checkCurrentPlayer();
    toggleWiggleAnimation();
    hideButtons();
  };
};

function clear() {
  if (event.target.id === "clearButton") {
    load();
    localStorage.clear();
    checkStorage();
  };
};

function hideButtons() {
  var buttons = document.querySelectorAll('button');
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'none';
  };
  player1Column.style.opacity = 1;
  player2Column.style.opacity = 1;
};

function checkStorage() {
  if (localStorage.length < 1) {
    document.getElementById('loadButton').disabled = true
    document.getElementById('clearButton').disabled = true
  };
};

function buttonFunctions() {
  startButton();
  clear();
  load();
  playAgain();
  reset();
  save();
};

function playGame() {
  buttonFunctions();
  player = checkCurrentPlayer();
  if (event.target.classList.contains('squares') && game) {
    var space = checkCurrentSpace();
    move(player, space);
    toggleWiggleAnimation();
    changeGameHeader(player);
    if (game.isWon || game.isDraw) {
      gameWon();
      gameDraw();
    } else {
      renderBoard();
    };
  };
};

function gameWon() {
  if (game.isWon) {
    renderBoard();
    gameEndAnimation();
    toggleWiggleAnimation();
    disableBoard();
    player.saveWinsToStorage(game);
    setTimeout(function() {
      displayWinTotal(player);
      clearBoard();
    }, 2400);
    setTimeout(function() {
      playAgainButton();
      resetButton();
      saveButton();
    }, 2500);
  };
};

function gameDraw() {
  if (game.isDraw) {
    renderBoard();
    gameEndAnimation();
    toggleWiggleAnimation();
    disableBoard();
    setTimeout(function() {
      clearBoard();
    }, 2400);
    setTimeout(function() {
      playAgainButton();
      resetButton();
      saveButton();
    }, 2500);
  };
};

function move(player, space) {
  if (!game.board[space]) {
    game.makeMove(player, space);
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

function checkWinner() {
  return game.checkForWin(player);
};

function changeGameHeader(player) {
  if (checkWinner()) {
    gameDisplay.innerText = checkWinner().toUpperCase();
    wobbleText();
    return
  };
  gameDisplay.innerText = 'SHRIMP VS. CHEESE';
  wobbleText();
};

function toggleWiggleAnimation() {
  var activePlayer = checkCurrentPlayer();
  var shrimp = document.getElementById('shrimp');
  var cheese = document.getElementById('cheese');
  if (activePlayer.token === 'shrimp' && !game.isWon && !game.isDraw) {
    shrimp.classList.add('wiggle');
    cheese.classList.remove('wiggle')
  } else if (activePlayer.token === 'cheese' && !game.isWon && !game.isDraw) {
    shrimp.classList.remove('wiggle');
    cheese.classList.add('wiggle')
  } else {
    shrimp.classList.remove('wiggle');
    cheese.classList.remove('wiggle')
  };
};

function gameEndAnimation() {
  toggleWiggleAnimation()
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
  toggleWiggleAnimation();
  enableBoard();
  if (game.isWon) {
    displayWinnerMobile(player);
    game.resetBoard();
    changeGameHeader(player)
    renderBoard();
  } else {
    game.resetBoard();
    changeGameHeader(player)
    renderBoard();
  };
};

function disableBoard() {
  gameBoard.classList.add('disable-board')
};

function enableBoard() {
  gameBoard.classList.remove('disable-board')
};

function displayWinTotal(player) {
  var playerOneWins = document.getElementById('playerOneWins');
  var playerTwoWins = document.getElementById('playerTwoWins');
  if (player.winTotal) {
    if (player.token === 'shrimp') {
      playerOneWins.innerHTML = '';
      playerOneWins.innerHTML += `<p>${player.winTotal}</p>`;
    } else if (player.token === 'cheese') {
      playerTwoWins.innerHTML = '';
      playerTwoWins.innerHTML += `<p>${player.winTotal}</p>`;
    };
  } else {
    playerOneWins.innerHTML = '';
    playerTwoWins.innerHTML = '';
  };
};

function displayWinnerMobile(player) {
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

function wobbleText() {
  if (gameDisplay.innerText !== 'SHRIMP VS. CHEESE') {
    gameDisplay.classList.add('wobble')
  } else {
    gameDisplay.classList.remove('wobble')
  };
};

function playAgainButton() {
  var topSquare = document.getElementById('topCenter');
  topSquare.innerHTML += `<button class="again" id="againButton">AGAIN?</button>`;
};

function playAgain() {
  if (event.target.id === 'againButton') {
    toggleWiggleAnimation();
    hideButtons();
  };
};

function resetButton() {
  var bottomLeftSquare = document.getElementById('bottomLeft');
  bottomLeftSquare.innerHTML += `<button class="reset" id="resetButton">RESET</button>`
};

function reset() {
  if (event.target.id === 'resetButton') {
    for (var i = 0; i < game.players.length; i++) {
      game.players[i].winTotal = 0;
      game.players[i].wins = [];
      displayWinTotal(game.players[i])
    };
    toggleWiggleAnimation();
    hideButtons();
  };
};

function saveButton() {
  var bottomRightSquare = document.getElementById('bottomRight');
  bottomRightSquare.innerHTML += `<button id="saveButton">SAVE</button>`
};

function save() {
  if (event.target.id === 'saveButton') {
    for (var i = 0; i < game.players.length; i++) {
      localStorage.setItem(`${game.players[i].token}`, JSON.stringify(game.players[i]))
    };
    event.target.innerText = 'SAVED';
    event.target.style.color = 'coral'
    event.target.disabled = true;
  };
};

function load() {
  if (event.target.id === 'loadButton') {
    var keys = Object.keys(localStorage);
    var playerFiles = [];
    for (var i = 0; i < keys.length; i++) {
      var playerData = JSON.parse(localStorage.getItem(keys[i]));
      playerFiles.push(playerData)
    };
    game = createGame('shrimp', 'cheese');
    for (var i = 0; i < game.players.length; i++) {
      game.players[i].wins = playerFiles[i].wins;
      game.players[i].winTotal = playerFiles[i].winTotal;
      game.players[i].id = playerFiles[i].id;
      game.players[i].isTurn = playerFiles[i].isTurn;
      game.players[i].token = playerFiles[i].token;
    };
    displayWinTotalOnLoad();
    toggleWiggleAnimation();
    hideButtons();
  } else if (event.target.id === 'clearButton') {
    game = createGame('shrimp', 'cheese');
  };
};

function displayWinTotalOnLoad() {
  var shrimp;
  var cheese;
  for (var i = 0; i < game.players.length; i++) {
    if (game.players[i].token === 'shrimp') {
      shrimp = game.players[i];
    } else if (game.players[i].token === 'cheese') {
      cheese = game.players[i];
    };
  };
  if (shrimp.winTotal) {
    player1Column.children[1].innerHTML += `<p>${shrimp.winTotal}</p>`
  };
  if (cheese.winTotal) {
    player2Column.children[1].innerHTML += `<p>${cheese.winTotal}</p>`
  };
};
