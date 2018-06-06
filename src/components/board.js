import React from 'react'
import Cell from './cell'

const Board = ({ board, onCellClick }) => (
  <div className="board">
    {board.map((row, x) => (
      <div key={x} className="board__row">
        {row.map((cell, y) => (
          <Cell key={y} onClick={() => onCellClick({ x, y })} {...cell} />
        ))}
      </div>
    ))}
  </div>
);

export default Board
