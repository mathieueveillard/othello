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

export const DIRECTION = {
  TOP: {
    dX: 0,
    dY: -1
  },
  TOP_RIGHT: {
    dX: 1,
    dY: -1
  },
  RIGHT: {
    dX: 1,
    dY: 0
  },
  BOTTOM_RIGHT: {
    dX: 1,
    dY: 1
  },
  BOTTOM: {
    dX: 0,
    dY: 1
  },
  BOTTOM_LEFT: {
    dX: -1,
    dY: 1
  },
  LEFT: {
    dX: -1,
    dY: 0
  },
  TOP_LEFT: {
    dX: -1,
    dY: -1
  }
};

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
  return (
    isValidMoveForDirection(board, player, position, DIRECTION.TOP) ||
    isValidMoveForDirection(board, player, position, DIRECTION.TOP_RIGHT) ||
    isValidMoveForDirection(board, player, position, DIRECTION.RIGHT) ||
    isValidMoveForDirection(board, player, position, DIRECTION.BOTTOM_RIGHT) ||
    isValidMoveForDirection(board, player, position, DIRECTION.BOTTOM) ||
    isValidMoveForDirection(board, player, position, DIRECTION.BOTTOM_LEFT) ||
    isValidMoveForDirection(board, player, position, DIRECTION.LEFT) ||
    isValidMoveForDirection(board, player, position, DIRECTION.TOP_LEFT)
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
