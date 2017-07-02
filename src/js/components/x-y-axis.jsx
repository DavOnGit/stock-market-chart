import React from 'react'
import Axis from './axis'

export default (props) => {
  const xSettings = {
    translate: `translate(0, ${props.height - props.padding.bottom})`,
    scale: props.xScale,
    orient: 'bottom'
  }
  const ySettings = {
    translate: `translate(${props.padding.left}, 0)`,
    scale: props.yScale,
    orient: 'left'
  }
  return (
    <g className='xy-axis'>
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  )
}
