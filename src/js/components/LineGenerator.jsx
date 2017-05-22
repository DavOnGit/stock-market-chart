import React from 'react'
import * as d3 from 'd3'

import Line from './Line'

class LineGenerator extends React.Component {
  static defaultProps = {
    data: [],
    interpolationType: 'cardinal',
    colors: d3.scaleOrdinal(d3.schemeCategory10).range()
  }

  render () {
    const { data, colors, xScale, yScale, interpolationType } = this.props

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y))

    const lines = data.points.map((points, i) => (
      <Line
        path={line(points)}
        stroke={colors[i]}
        strokeWidth={1.5}
        key={i} />
      ))
    return (
      <g>
        <g>
          {lines}
        </g>
      </g>
    )
  }
}

export default LineGenerator
