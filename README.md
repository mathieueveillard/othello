# othello-js

## Rules

Othello is a board game for two players. This kata requires you to write a function that, given the current board and the current color, computes the list of all cells where a disk of the given color can be placed.

[Othello (Wikipedia)](https://en.wikipedia.org/wiki/Reversi#Rules)

Assuming the given board:

```text
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

Blacks start and can place a disk in the following cells:

```text
D3, F5, E6, C4
```

## Installation

```text
git clone https://github.com/mathieueveillard/othello-js.git
cd othello-js
npm install
```

## Development

```text
npm test
```
