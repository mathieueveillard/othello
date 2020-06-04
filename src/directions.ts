import { Direction } from ".";

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

export const DIRECTION = {
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
  TOP_LEFT
};

export const ALL_DIRECTIONS = [TOP, TOP_RIGHT, RIGHT, BOTTOM_RIGHT, BOTTOM, BOTTOM_LEFT, LEFT, TOP_LEFT];
