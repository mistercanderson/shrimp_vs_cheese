// Data Model
let game;
let player;

// DOM Elements
const gameDisplay = document.getElementById('gameDisplay');
const gameBoard = document.getElementById('gameBoard');
const spaces = gameBoard.children;
const player1Column = document.getElementById('playerOne');
const player2Column = document.getElementById('playerTwo');

// Event Listeners
window.addEventListener('load', checkStorage);
gameBoard.addEventListener('click', playGame);

// Functions
function createGame(player1, player2) {
  const ticTacToe = new Game(3, 3);
  const p1 = new Player(player1, true);
  const p2 = new Player(player2);
  ticTacToe.addPlayers(p1, p2);
  return ticTacToe;
}

function startButton() {
  if (event.target.id === 'startButton') {
    game = createGame('shrimp', 'cheese');
    player = checkCurrentPlayer();
    indicateCurrentPlayer();
    hideButtons();
  }
}

function clear() {
  if (event.target.id === 'clearButton') {
    if (window.confirm('Are you sure you want to clear the saved game?')) {
      if (window.confirm('Like, seriously?')) {
        window.alert('THE WATERS HAVE BEEN CLEANSED');
        load();
        localStorage.clear();
        checkStorage();
        event.target.style.color = 'coral';
      }
    }
  }
}

function hideButtons() {
  const buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].style.display = 'none';
  }
  player1Column.style.opacity = 1;
  player2Column.style.opacity = 1;
}

function checkStorage() {
  if (localStorage.length < 1) {
    document.getElementById('loadButton').disabled = true;
    document.getElementById('clearButton').disabled = true;
  }
}

function buttonFunctions() {
  startButton();
  clear();
  load();
  playAgain();
  reset();
  saveGame();
}

function checkEmptySpace() {
  for (let i = 0; i < spaces.length; i++) {
    if (!spaces[i].innerHTML) {
      hideButtons();
    }
  }
}

function playGame() {
  buttonFunctions();
  player = checkCurrentPlayer();
  if (event.target.classList.contains('squares') && game) {
    checkEmptySpace();
    const space = checkCurrentSpace();
    move(player, space);
    indicateCurrentPlayer();
    changeGameHeader(player);
    if (game.isWon || game.isDraw) {
      gameWon();
      gameDraw();
    } else {
      renderBoard();
    }
  }
}

function gameWon() {
  if (game.isWon) {
    renderBoard();
    gameEndAnimation();
    indicateCurrentPlayer();
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
  }
}

function gameDraw() {
  if (game.isDraw) {
    renderBoard();
    gameEndAnimation();
    indicateCurrentPlayer();
    disableBoard();
    setTimeout(function() {
      clearBoard();
    }, 2400);
    setTimeout(function() {
      playAgainButton();
      resetButton();
      saveButton();
    }, 2500);
  }
}

function move(player, space) {
  if (!game.board[space]) {
    game.makeMove(player, space);
  }
}

function checkCurrentPlayer() {
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].isTurn) {
      return game.players[i];
    }
  }
}

function checkCurrentSpace() {
  let currentSpace;
  for (let i = 0; i < spaces.length; i++) {
    if (event.target === spaces[i]) {
      currentSpace = i;
    }
  }
  return currentSpace;
}

function checkWinner() {
  return game.checkForWin(player);
}

function changeGameHeader() {
  if (checkWinner()) {
    gameDisplay.innerText = checkWinner().toUpperCase();
    wobbleText();
    return;
  }
  gameDisplay.innerText = 'SHRIMP VS. CHEESE';
  wobbleText();
}

function indicateCurrentPlayer() {
  const activePlayer = checkCurrentPlayer();
  const shrimp = document.getElementById('shrimp');
  const cheese = document.getElementById('cheese');
  const dotOne = document.getElementById('playerOneDot');
  const dotTwo = document.getElementById('playerTwoDot');
  if (activePlayer.token === 'shrimp' && !game.isWon && !game.isDraw) {
    shrimp.classList.add('wiggle');
    cheese.classList.remove('wiggle');
    dotOne.classList.add('player-one-dot');
    dotTwo.classList.remove('player-two-dot');
  } else if (activePlayer.token === 'cheese' && !game.isWon && !game.isDraw) {
    shrimp.classList.remove('wiggle');
    cheese.classList.add('wiggle');
    dotOne.classList.remove('player-one-dot');
    dotTwo.classList.add('player-two-dot');
  } else {
    shrimp.classList.remove('wiggle');
    cheese.classList.remove('wiggle');
    dotOne.classList.remove('player-one-dot');
    dotTwo.classList.remove('player-two-dot');
  }
}

function gameEndAnimation() {
  indicateCurrentPlayer();
  if (game.isWon) {
    for (let i = 0; i < spaces.length; i++) {
      if (spaces[i].children[0] &&
        spaces[i].children[0].className === player.token) {
        spaces[i].children[0].classList.add('winner');
      }
    }
  } else if (game.isDraw) {
    for (i = 0; i < spaces.length; i++) {
      spaces[i].children[0].classList.add('draw');
    }
  }
}

function renderBoard() {
  for (let i = 0; i < game.board.length; i++) {
    spaces[i].innerHTML = '';
    if (game.board[i] === 'shrimp') {
      spaces[i].innerHTML += '<img class="shrimp" src="./assets/shrimp.svg" alt="shrimp">';
    } else if (game.board[i] === 'cheese') {
      spaces[i].innerHTML += '<img class="cheese" src="./assets/cheese.svg" alt="cheese">';
    }
  }
}

function clearBoard() {
  indicateCurrentPlayer();
  enableBoard();
  if (game.isWon) {
    displayWinnerMobile(player);
    game.resetBoard();
    changeGameHeader(player);
    renderBoard();
  } else {
    game.resetBoard();
    changeGameHeader(player);
    renderBoard();
  }
}

function disableBoard() {
  gameBoard.classList.add('disable-board');
}

function enableBoard() {
  gameBoard.classList.remove('disable-board');
}

function displayWinTotal(player) {
  const playerOneWins = document.getElementById('playerOneWins');
  const playerTwoWins = document.getElementById('playerTwoWins');
  if (player.winTotal) {
    if (player.token === 'shrimp') {
      playerOneWins.innerHTML = '';
      playerOneWins.innerHTML += `<p>${player.winTotal}</p>`;
    } else if (player.token === 'cheese') {
      playerTwoWins.innerHTML = '';
      playerTwoWins.innerHTML += `<p>${player.winTotal}</p>`;
    }
  } else {
    playerOneWins.innerHTML = '';
    playerTwoWins.innerHTML = '';
  }
}

function displayWinnerMobile(player) {
  if (player.token === 'shrimp') {
    player1Column.classList.add('mobile-win');
    player2Column.classList.remove('mobile-win');
  } else if (player.token === 'cheese') {
    player1Column.classList.remove('mobile-win');
    player2Column.classList.add('mobile-win');
  }
  setTimeout(function() {
    hideWinMobile();
  }, 1500);
}

function hideWinMobile() {
  player1Column.classList.remove('mobile-win');
  player2Column.classList.remove('mobile-win');
}

function wobbleText() {
  if (gameDisplay.innerText !== 'SHRIMP VS. CHEESE') {
    gameDisplay.classList.add('wobble');
  } else {
    gameDisplay.classList.remove('wobble');
  }
}

function playAgainButton() {
  const topSquare = document.getElementById('topCenter');
  topSquare.innerHTML += '<button class="again" id="againButton">AGAIN?</button>';
}

function playAgain() {
  if (event.target.id === 'againButton') {
    indicateCurrentPlayer();
    hideButtons();
  }
}

function resetButton() {
  const bottomLeftSquare = document.getElementById('bottomLeft');
  bottomLeftSquare.innerHTML += '<button class="reset" id="resetButton">RESET</button>';
}

function reset() {
  if (event.target.id === 'resetButton') {
    for (let i = 0; i < game.players.length; i++) {
      game.players[i].winTotal = 0;
      game.players[i].wins = [];
      displayWinTotal(game.players[i]);
    }
    indicateCurrentPlayer();
    hideButtons();
  }
}

function saveButton() {
  const bottomRightSquare = document.getElementById('bottomRight');
  bottomRightSquare.innerHTML += '<button id="saveButton">SAVE</button>';
}

function save() {
  for (let i = 0; i < game.players.length; i++) {
    localStorage.setItem(`${game.players[i].token}`, JSON.stringify(game.players[i]));
  }
  event.target.innerText = 'SAVED';
  event.target.style.color = 'coral';
  event.target.disabled = true;
}

function confirmSave() {
  if (window.confirm('This will overwrite previously stored game data. Are you sure?')) {
    save();
  }
}

function saveGame() {
  if (event.target.id === 'saveButton') {
    if (localStorage.length) {
      confirmSave();
    } else {
      save();
    }
  }
}

function load() {
  if (event.target.id === 'loadButton') {
    const keys = Object.keys(localStorage);
    const playerProfiles = [];
    for (let i = 0; i < keys.length; i++) {
      const playerData = JSON.parse(localStorage.getItem(keys[i]));
      playerProfiles.push(playerData);
    }
    game = createGame('shrimp', 'cheese');
    for (i = 0; i < game.players.length; i++) {
      game.players[i].retrieveDataFromStorage(playerProfiles[i]);
    }
    displayWinTotalOnLoad();
    indicateCurrentPlayer();
    hideButtons();
  } else if (event.target.id === 'clearButton') {
    game = createGame('shrimp', 'cheese');
  }
}

function displayWinTotalOnLoad() {
  let shrimp;
  let cheese;
  for (let i = 0; i < game.players.length; i++) {
    if (game.players[i].token === 'shrimp') {
      shrimp = game.players[i];
    } else if (game.players[i].token === 'cheese') {
      cheese = game.players[i];
    }
  }
  if (shrimp.winTotal) {
    const playerOneCounter = document.getElementById('playerOneWins');
    playerOneCounter.innerHTML += `<p>${shrimp.winTotal}</p>`;
  }
  if (cheese.winTotal) {
    const playerTwoCounter = document.getElementById('playerTwoWins');
    playerTwoCounter.innerHTML += `<p>${cheese.winTotal}</p>`;
  }
}
