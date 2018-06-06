import {combineReducers} from 'redux'

import {generateBoard, generateDeadCell} from './actions'
import * as actions from './actions'


// 🌴 REDUCERS
const initialState = {
  board: generateBoard(),
  running: false,
  generation: 0,
  size: {
    small: {
      x: 50,
      y: 30
    },
    medium: {
      x: 80,
      y: 50
    },
    large: {
      x: 120,
      y: 50
    }
  },
  activeSize: "medium",
  speed: {
    slow: 1000,
    medium: 200,
    fast: 50,
    boom: 5
  },
  activeSpeed: "fast"
};

const countLiveNeighbors = (board, x, y) => {
  // 🙈 probably less expensive than filter
  let count = 0;
  const prevRow = board[x - 1];
  const currentRow = board[x];
  const nextRow = board[x + 1];

  const isAlive = (row, y) => row[y] && row[y].alive;

  if (prevRow) {
    if (isAlive(prevRow, y - 1)) count++;
    if (isAlive(prevRow, y)) count++;
    if (isAlive(prevRow, y + 1)) count++;
  }

  if (isAlive(currentRow, y - 1)) count++;
  if (isAlive(currentRow, y + 1)) count++;

  if (nextRow) {
    if (isAlive(nextRow, y - 1)) count++;
    if (isAlive(nextRow, y)) count++;
    if (isAlive(nextRow, y + 1)) count++;
  }

  return count;
};

const board = (state = initialState.board, { type, payload }) => {
  switch (type) {
    case actions.GENERATE_BOARD:
    case actions.CHANGE_SIZE:
      return actions.generateBoard(payload.x, payload.y);
    case actions.CLEAR_BOARD:
      return actions.clearBoard(payload.x, payload.y);
    case actions.ON_CELL_CLICK:
      return state.map((row, x, board) =>
        row.map((cell, y) => {
          if (x === payload.x && y === payload.y) {
            return cell.alive ?
              actions.generateDeadCell() :
            actions.generateInfantCell();
          }
          return cell;
        })
      );
    case actions.TICK:
      // 🙏
      return state.map((row, x, board) =>
        row.map((cell, y) => {
          const neighbors = countLiveNeighbors(state, x, y);

          if (!cell.alive) {
            // 🦋🦋🦋 ? 🐛 : 👻
            return neighbors === 3 ? actions.generateInfantCell() : generateDeadCell();
          }

          // 👻 overpopulation || underpopulation
          if (neighbors < 2 || neighbors > 3) {
            return actions.generateDeadCell();
          }

          // 🦋 2 | 3 neighbors
          return actions.generateGrownupCell();
        })
      );
    default:
      return state;
  }
};

const running = (state = initialState.running, action) => {
  switch (action.type) {
    case actions.CLEAR_BOARD:
      return false;
    case actions.START:
      return true;
    case actions.STOP:
      return false;
    default:
      return state;
  }
};

const generation = (state = initialState.generation, action) => {
  switch (action.type) {
    case actions.GENERATE_BOARD:
    case actions.CHANGE_SIZE:
    case actions.CLEAR_BOARD:
      return 0;
    case actions.TICK:
      return state + 1;
    default:
      return state;
  }
};

const size = (state = initialState.size) => state;

const activeSize = (state = initialState.activeSize, { type, payload }) => {
  switch (type) {
    case actions.CHANGE_SIZE:
      return payload.id;
    default:
      return state;
  }
};

const speed = (state = initialState.speed) => state;

const activeSpeed = (state = initialState.activeSpeed, { type, payload }) => {
  switch (type) {
    case actions.CHANGE_SPEED:
      return payload.id;
    default:
      return state;
  }
};

export default combineReducers({
  board,
  running,
  generation,
  size,
  activeSize,
  speed,
  activeSpeed
});
