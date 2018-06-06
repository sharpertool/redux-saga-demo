import React from 'react'

// 🌸 COMPONENTS
const Cell = ({ alive, age, onClick }) => (
  <div
    className="cell"
    onClick={onClick}
    style={{
      backgroundColor: alive ? (age === 0 ? "#ddca7e" : "#ff3c41") : "#283948"
    }}
  />
);

export default Cell
