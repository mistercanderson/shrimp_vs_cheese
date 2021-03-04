var game = createGame();
var gameBoard = document.querySelector('.game-board');

gameBoard.addEventListener('click', playGame);

function createGame() {
  var ticTacToe = new Game(3, 3);
  var shrimp = new Player('shrimp', true);
  var cheese = new Player('cheese');
  ticTacToe.board = ticTacToe.createBoard();
  ticTacToe.addPlayers(shrimp, cheese);
  return ticTacToe
};

function playGame() {
  var board = event.currentTarget;
  var space = event.target;
  console.log(this)
  console.log(board)
  console.log(space)
}
