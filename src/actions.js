// 🤙 ACTIONS
export const GENERATE_BOARD = "GENERATE_BOARD";
export const CLEAR_BOARD = "CLEAR_BOARD";
export const START = "START";
export const STOP = "STOP";
export const TICK = "TICK";
export const CHANGE_SIZE = "CHANGE_SIZE";
export const CHANGE_SPEED = "CHANGE_SPEED";
export const ON_CELL_CLICK = "ON_CELL_CLICK";

const randomBoolean = () => Math.random() >= 0.5;

const range = (from, to, mapFn = (_, i) => i) => {
  const length = to - from;
  return Array.from({ length }, mapFn);
};

export const generateDeadCell = () => ({ alive: false, age: 0 });
export const generateInfantCell = () => ({ alive: true, age: 0 });
export const generateGrownupCell = () => ({ alive: true, age: 1 });
export const generateCell = () => {
  const alive = randomBoolean();
  const age = alive ? Number(randomBoolean()) : 0;
  return { alive, age };
};

export const boardGenerator = (generateFn = generateCell) => (x = 80, y = 50) =>
  range(0, y, (_, i) => range(0, x, generateFn));

export const generateBoard = boardGenerator(generateCell);
export const clearBoard = boardGenerator(generateDeadCell);
