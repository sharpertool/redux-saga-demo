import React from 'react'

const Button = ({ onClick, children, active }) => (
  <button onClick={onClick} className={active ? "active" : ""}>
    {children}
  </button>
);

export default Button
