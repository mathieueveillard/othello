type Empty = " ";

type Player = "B" | "W";

type CellContent = Empty | Player;

export type Board = CellContent[][];

type IsPlayable = "x";

type PlayableCellContent = Empty | IsPlayable;

export type PlayableBoard = PlayableCellContent[][];

interface Position {
  X: number;
  Y: number;
}

interface Direction {
  dX: number;
  dY: number;
}

const DIMENSION = 8;

const TOP: Direction = {
  dX: 0,
  dY: -1
};

const TOP_RIGHT: Direction = {
  dX: 1,
  dY: -1
};

const RIGHT: Direction = {
  dX: 1,
  dY: 0
};

const BOTTOM_RIGHT: Direction = {
  dX: 1,
  dY: 1
};

const BOTTOM: Direction = {
  dX: 0,
  dY: 1
};

const BOTTOM_LEFT: Direction = {
  dX: -1,
  dY: 1
};

const LEFT: Direction = {
  dX: -1,
  dY: 0
};

const TOP_LEFT: Direction = {
  dX: -1,
  dY: -1
};

export const Direction = {
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
  TOP_LEFT
};

const DIRECTIONS = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];

export function getPossibleMoves(board: Board, player: Player): PlayableBoard {
  const possibleMoves: PlayableBoard = [
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "]
  ];
  for (let rowIndex = 0; rowIndex < DIMENSION; rowIndex++) {
    for (let columnIndex = 0; columnIndex < DIMENSION; columnIndex++) {
      possibleMoves[rowIndex][columnIndex] = isValidMove(board, player, { X: columnIndex, Y: rowIndex }) ? "x" : " ";
    }
  }
  return possibleMoves;
}

export function isValidMove(board: Board, player: Player, position: Position): boolean {
  return DIRECTIONS.reduce(
    (result, direction) => result || isValidMoveForDirection(board, player, position, direction),
    false
  );
}

export function isValidMoveForDirection(
  board: Board,
  player: Player,
  position: Position,
  direction: Direction
): boolean {
  return cellIsEmpty(board, position) && canTakeCellsToOpponent(board, player, position, direction);
}

function cellIsEmpty(board: Board, position: Position): boolean {
  return getCell(board, position) === " ";
}

function canTakeCellsToOpponent(board: Board, player: Player, position: Position, direction: Direction): boolean {
  const nextCell: Position = computeNextCellPosition(position, direction);
  const secondNextCell: Position = computeNextCellPosition(nextCell, direction);
  return (
    cellIsOpponent(board, player, nextCell) &&
    (cellIsPlayer(board, player, secondNextCell) || canTakeCellsToOpponent(board, player, nextCell, direction))
  );
}

function getCell(board: Board, { X, Y }: Position): CellContent {
  if (Y < 0 || Y >= DIMENSION) {
    return undefined;
  }
  return board[Y][X];
}

function computeNextCellPosition({ X, Y }: Position, { dX, dY }: Direction): Position {
  return {
    X: X + dX,
    Y: Y + dY
  };
}

function cellIsPlayer(board: Board, player: Player, position: Position): boolean {
  return getCell(board, position) === player;
}

function cellIsOpponent(board: Board, player: Player, position: Position): boolean {
  return getCell(board, position) === opponent(player);
}

function opponent(player: Player): Player {
  return player === "B" ? "W" : "B";
}
