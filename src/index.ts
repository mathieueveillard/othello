type Empty = " ";

type Player = "B" | "W";

type CellContent = Empty | Player;

export type Board = CellContent[][];

interface IterableBoard {
  board: Board;
  reduce: <T>(
    reducer: (accumulator: T, current: CellContent, index: Position, source: Board) => T,
    initialAccumulator: T
  ) => T;
}

function toIterableBoard(board: Board): IterableBoard {
  return {
    board,
    reduce: function(reducer, initialBoardAccumulator) {
      return board.reduce(function(boardAccumulator, line, lineIndex) {
        return line.reduce(function(lineAccumulator, cell, columnIndex) {
          return reducer(lineAccumulator, cell, { X: columnIndex, Y: lineIndex }, board);
        }, boardAccumulator);
      }, initialBoardAccumulator);
    }
  };
}

export interface Position {
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

export function getPossibleMoves(board: Board, player: Player): Position[] {
  return toIterableBoard(board).reduce<Position[]>(
    (possibleMoves, _, position) =>
      isValidMove(board, player, position) ? [...possibleMoves, position] : possibleMoves,
    []
  );
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
