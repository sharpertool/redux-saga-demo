import React from 'react'

import Label from './label'
import Button from './button'
import Row from './row'

const Size = ({ size, activeSize, changeSize }) => (
  <Row>
    <Label>Board size:</Label>
    {Object.entries(size).map(([id, { x, y }]) => (
      <Button
        key={id}
        active={id === activeSize}
        onClick={() => changeSize({ id, x, y })}
      >
        {x} x {y}
      </Button>
    ))}
  </Row>
);

export default Size