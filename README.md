# SHRIMP VS. CHEESE (a tic-tac-toe experience)

### Description

It's a rivalry as old as time, the battle between shrimp & cheese. In this game, you can finally settle the score once & for all of who is the ULTIMATE APPETIZER!!! 

### How it Works

Shrimp vs. Cheese is a fun twist on the classic game of tic-tac-toe. The first player to get three of their pieces lined up horizontally, vertically, or diagonally wins! If nobody can get three in a row, the game is ruled a draw and the players go head to head again.

### Gameplay

- On page load, users can either start a `new game` from scratch, `load` a previously saved game, or `clear` the saved game data (`load`/`clear` can only be selected if there is a saved game in `localStorage`).
- When `new game` or `load` is selected, the game begins. The current player's turn is indicated by the animation of the player icons on either side of the board. On mobile, this animation is replaced by a white dot that appears on either side of the game board's display when a move is made. The player who goes first alternates every game.
- To play, simply click on an empty space to make your move!
- If either player gets 3 spaces in a row, their respective name (shrimp/cheese) will appear in the game display. The player columns will be updated to reflect the total number of games won. On mobile, the win totals are only displayed after a player wins the game.
- Once a game is either won/is a draw, users can select to play `again`, `reset` the scores, or `save` the current game to `localStorage`.
- If a `save` is confirmed, the current game can be accessed again with the `load` button on page refresh.
- Only one game can be saved at a time. Users will be given a warning whenever data in `localStorage` is updated/changed.

### Technologies Implemented
- Javascript
- HTML
- CSS

### Future Updates

- Ability to save multiple games at once
- Online play
- Ability to select different appetizer-centric player icons (olives, bruschetta, meat, etc.)
- Sharing scores on social media

***

#### Contributors:
- Chris Anderson (https://github.com/mistercanderson)

### Demos:

##### Starting a game:
![](https://media.giphy.com/media/80IDKTGWyWwxeWkhzt/giphy.gif)

##### Playing a game:
![](https://media.giphy.com/media/j444eTuLLf6xkEugKI/giphy.gif)

##### Game save/load:
![](https://media.giphy.com/media/ph1rHgkiOs7K0M63nV/giphy.gif)
