# othello-js

## Rules

Othello is a board game for two players. This kata requires you to write a function that, given the current board and the current player, computes the list of all possible moves.

[Othello (Wikipedia)](https://en.wikipedia.org/wiki/Reversi#Rules)

Assuming the given board:

```
  A B C D E F G H
1 . . . . . . . .
2 . . . . . . . .
3 . . . . . . . .
4 . . . W B . . .
5 . . . B W . . .
6 . . . . . . . .
7 . . . . . . . .
8 . . . . . . . .
```

Blacks start; the possibles moves are:

```
(D,3), (F,5), (E,6), (C,4)
```

## Installation

```
git clone https://github.com/mathieueveillard/othello-js.git
cd othello-js
npm install
```

## Development

```
npm test
```
