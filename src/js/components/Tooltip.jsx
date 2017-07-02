import React from 'react'
import * as d3 from 'd3'

const style = {
  fontFamily: 'Roboto',
  textAnchor: 'middle',
  fill: '#333'
}

class Tooltip extends React.Component {
  render () {
    const { pos, data } = this.props
    const formatTime = d3.timeFormat("%d %m '%y")

    return (
      <g
        className='tooltip'
        pointerEvents={'none'}
      >
        <circle
          r='3.5'
          cx={pos.x}
          cy={pos.y}
          fill='#333'
          stroke='#333'
        />
        <text
          x={pos.x}
          y={pos.y - 10}
          style={style}
        >
          {data.id}
        </text>
        <text
          x={pos.x}
          y={pos.y + 20}
          style={style}
          fontSize={14}
        >
          &#36; {(+data.value).toFixed(2)}
        </text>
        <text
          x={pos.x}
          y={pos.y + 36}
          style={style}
          fontSize={14}
        >
          {formatTime(data.date)}
        </text>
      </g>
    )
  }
}

export default Tooltip
