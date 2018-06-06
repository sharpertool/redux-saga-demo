import React from 'react'

import Row from './row'
import Label from './label'
import Button from './button'

const Speed = ({ speed, activeSpeed, changeSpeed }) => (
  <Row>
    <Label>Speed:</Label>
    {Object.entries(speed).map(([id, ms]) => (
      <Button
        key={id}
        active={id === activeSpeed}
        onClick={() => changeSpeed({ id, ms })}
      >
        {id} ({ms}ms)
      </Button>
    ))}
  </Row>
);

export default Speed

