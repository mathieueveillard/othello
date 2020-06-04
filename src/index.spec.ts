import {
  B,
  W,
  _,
  canCaptureDisksInDirection,
  isPlayableCell,
  getCoordinatesOfPlayableCells,
  Board,
  Coordinates
} from ".";
import { DIRECTION } from "./directions";

describe("Analysis of a single cell in a single direction: canCaptureDisksInDirection()", function() {
  it("A cell which has no next cell should not be playable", function() {
    const board: Board = [
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 7, Y: 0 }, DIRECTION.RIGHT)).toEqual(false);
  });

  it("A cell whose next cell is empty should not be playable", function() {
    const board: Board = [
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 0, Y: 0 }, DIRECTION.RIGHT)).toEqual(false);
  });

  it("A cell whose next cell contains a disk of the same color should not be playable", function() {
    const board: Board = [
      [_, B, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 0, Y: 0 }, DIRECTION.RIGHT)).toEqual(false);
  });

  it("A cell whose next cell contains a disk of the opponent's color but which has no second next cell should not be playable", function() {
    const board: Board = [
      [_, _, _, _, _, _, _, W],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 6, Y: 0 }, DIRECTION.RIGHT)).toEqual(false);
  });

  it("A cell whose next cell contains a disk of the opponent's color but the one after is empty should not be playable", function() {
    const board: Board = [
      [_, W, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 0, Y: 0 }, DIRECTION.RIGHT)).toEqual(false);
  });

  it("A cell should be playable for a given color if it allows to capture disks of the opponent's color", function() {
    const board: Board = [
      [_, W, B, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(canCaptureDisksInDirection(board, B, { X: 0, Y: 0 }, DIRECTION.RIGHT)).toEqual(true);
  });
});

describe("Analysis of a single cell in all the 8 directions: isPlayableCell()", function() {
  it("A cell that is not empty should not be playable", function() {
    const board: Board = [
      [B, W, B, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(isPlayableCell(board, B, { X: 0, Y: 0 })).toEqual(false);
  });

  it("A cell should not be playable if it doesn't allow to capture disks of the opponent's color in any direction", function() {
    const board: Board = [
      [_, W, _, _, _, W, _, _],
      [_, _, W, B, W, _, _, _],
      [_, W, W, _, W, W, W, W],
      [_, _, W, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(isPlayableCell(board, B, { X: 3, Y: 2 })).toEqual(false);
  });

  it("A cell should be playable if it allows to capture disks of the opponent's color in at least one direction", function() {
    const board: Board = [
      [_, B, _, _, _, W, _, _],
      [_, _, W, B, W, _, _, _],
      [_, W, W, _, W, W, W, W],
      [_, _, W, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    expect(isPlayableCell(board, B, { X: 3, Y: 2 })).toEqual(true);
  });
});

describe("Analysis of the whole board: getCoordinatesOfPlayableCells()", function() {
  it("It should return the coordinates of all the playable cells for a given color", function() {
    const board: Board = [
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, W, B, _, _, _],
      [_, _, _, B, W, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _]
    ];
    const possibleMoves: Coordinates[] = ["D3", "C4", "F5", "E6"];
    expect(getCoordinatesOfPlayableCells(board, B)).toEqual(possibleMoves);
  });
});
