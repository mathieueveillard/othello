import { Iterable } from "./util/Iterable";
import { ALL_DIRECTIONS } from "./directions";
import { partial } from "ramda";

export const _ = " ";

export const B = "B";

export const W = "W";

type Empty = typeof _;

type Color = typeof B | typeof W;

type CellContent = Empty | Color;

export type Board = CellContent[][];

/*
 *         A B C D E F G H (external)
 *         0 1 2 3 4 5 6 7 (internal: X)
 *    1 0  _ _ _ _ _ _ _ _
 *    2 1  _ _ _ _ _ _ _ _
 *    3 2  _ _ _ _ _ _ _ _
 *    4 3  _ _ _ W B _ _ _
 *    5 4  _ _ _ B W _ _ _
 *    6 5  _ _ _ _ _ _ _ _
 *    7 6  _ _ _ _ _ _ _ _
 *    8 7  _ _ _ _ _ _ _ _
 *     (Y)
 */

export type Coordinates = string;

export interface InternalCoordinates {
  X: number;
  Y: number;
}

export interface Direction {
  dX: number;
  dY: number;
}

const DIMENSION = 8;

const X_COORDINATES: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];

const Y_COORDINATES: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

type IterableBoard<T> = Iterable<T, CellContent, InternalCoordinates, Board>;

function toIterableBoard<T>(board: Board): IterableBoard<T> {
  return {
    reduce: function(reducer, initialValue) {
      return board.reduce(function(lineAccumulator, line, lineIndex) {
        return line.reduce(function(columnAccumulator, cell, columnIndex) {
          return reducer(columnAccumulator, cell, { X: columnIndex, Y: lineIndex }, board);
        }, lineAccumulator);
      }, initialValue);
    }
  };
}

export function getCoordinatesOfPlayableCells(board: Board, color: Color): Coordinates[] {
  return getInternalCoordinatesOfPlayableCells(board, color).map(toCoordinates);
}

export function getInternalCoordinatesOfPlayableCells(board: Board, color: Color): InternalCoordinates[] {
  return toIterableBoard<InternalCoordinates[]>(board).reduce(
    (accumulator, _, internalCoordinates) =>
      isPlayableCell(board, color, internalCoordinates) ? [...accumulator, internalCoordinates] : accumulator,
    []
  );
}

export function isPlayableCell(board: Board, color: Color, coordinates: InternalCoordinates): boolean {
  return (
    cellIsEmpty(board, coordinates) &&
    ALL_DIRECTIONS.some(partial(canCaptureDisksInDirection, [board, color, coordinates]))
  );
}

function cellIsEmpty(board: Board, coordinates: InternalCoordinates): boolean {
  return getCellContent(board, coordinates) === _;
}

export function canCaptureDisksInDirection(
  board: Board,
  color: Color,
  coordinates: InternalCoordinates,
  direction: Direction
): boolean {
  const nextCell: InternalCoordinates = computeNextCellCoordinates(coordinates, direction);
  const secondNextCell: InternalCoordinates = computeNextCellCoordinates(nextCell, direction);
  return (
    cellIsOpponentColor(board, color, nextCell) &&
    (cellIsColor(board, color, secondNextCell) || canCaptureDisksInDirection(board, color, nextCell, direction))
  );
}

function getCellContent(board: Board, { X, Y }: InternalCoordinates): CellContent {
  if (Y < 0 || Y >= DIMENSION) {
    return undefined;
  }
  return board[Y][X];
}

function computeNextCellCoordinates({ X, Y }: InternalCoordinates, { dX, dY }: Direction): InternalCoordinates {
  return {
    X: X + dX,
    Y: Y + dY
  };
}

function cellIsColor(board: Board, color: Color, coordinates: InternalCoordinates): boolean {
  return getCellContent(board, coordinates) === color;
}

function cellIsOpponentColor(board: Board, color: Color, coordinates: InternalCoordinates): boolean {
  return getCellContent(board, coordinates) === opponent(color);
}

function opponent(color: Color): Color {
  return color === B ? W : B;
}

export function toCoordinates({ X, Y }: InternalCoordinates): Coordinates {
  return X_COORDINATES[X] + Y_COORDINATES[Y];
}
