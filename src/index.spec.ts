import { isValidMoveForDirection, isValidMove, getPossibleMoves, Board, PlayableBoard, Direction } from ".";

describe("Test of the test framework", function() {
  it.skip("Should fail", function() {
    expect(0).toEqual(1);
  });

  it("Should pass", function() {
    expect(0).toEqual(0);
  });
});

describe("Analyse my cell", function() {
  it("Should return false if cell is not empty", function() {
    const board: Board = [
      ["B", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });
});

describe("Analyse next cell", function() {
  it("Should return false if next cell is empty", function() {
    const board: Board = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return false if next cell is of the same player", function() {
    const board: Board = [
      [" ", "B", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it.skip("Should return true if next cell belongs to the opponent", function() {
    const board: Board = [
      [" ", "W", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(true);
  });
});

describe("Analyse the two next cells", function() {
  it("Should return false if next cell belongs to the opponent but the one after is empty", function() {
    const board: Board = [
      [" ", "W", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return false if next cell belongs to the opponent and the one after alse of the opponent", function() {
    const board: Board = [
      [" ", "W", "W", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return true if next cell belongs to the opponent and the one after of the same player", function() {
    const board: Board = [
      [" ", "W", "B", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(true);
  });
});

describe("Stop at boarders", function() {
  it("Should return false if next cell is outside the board (right)", function() {
    const board: Board = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 7, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return false if next cell is outside the board (top)", function() {
    const board: Board = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.TOP)).toEqual(false);
  });

  it("Should return false if next cell belongs to the opponent but the cell after is outside the board", function() {
    const board: Board = [
      [" ", " ", " ", " ", " ", " ", " ", "W"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 6, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });
});

describe("Analyse the whole direction recursively", function() {
  it("Should return false if two following cells belong to the opponent and the next after is empty", function() {
    const board: Board = [
      [" ", "W", "W", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return false if all following cells belong to the opponent (then boarder)", function() {
    const board: Board = [
      [" ", "W", "W", "W", "W", "W", "W", "W"],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(false);
  });

  it("Should return false if two following cells belong to the opponent and the next after belongs to the player", function() {
    const board: Board = [
      [" ", "W", "W", "B", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMoveForDirection(board, "B", { X: 0, Y: 0 }, Direction.RIGHT)).toEqual(true);
  });
});

describe("Analyse the 8 directions", function() {
  it("Should analyse the 8 directions", function() {
    const board: Board = [
      [" ", "W", " ", " ", " ", "W", " ", " "],
      [" ", " ", "W", "B", "W", " ", " ", " "],
      [" ", "W", "W", " ", "W", "W", "W", "W"],
      [" ", " ", "W", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMove(board, "B", { X: 3, Y: 2 })).toEqual(false);
  });

  it("Should analyse the 8 directions", function() {
    const board: Board = [
      [" ", "B", " ", " ", " ", "W", " ", " "],
      [" ", " ", "W", "B", "W", " ", " ", " "],
      [" ", "W", "W", " ", "W", "W", "W", "W"],
      [" ", " ", "W", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(isValidMove(board, "B", { X: 3, Y: 2 })).toEqual(true);
  });
});

describe("Analyse all possible moves", function() {
  it("Should return all possible moves", function() {
    const board: Board = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", "B", "W", " ", " ", " "],
      [" ", " ", " ", "W", "B", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    const possibleMoves: PlayableBoard = [
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", "x", " ", " ", " "],
      [" ", " ", " ", " ", " ", "x", " ", " "],
      [" ", " ", "x", " ", " ", " ", " ", " "],
      [" ", " ", " ", "x", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " "]
    ];
    expect(getPossibleMoves(board, "B")).toEqual(possibleMoves);
  });
});
