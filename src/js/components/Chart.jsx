import React from 'react'
import * as d3 from 'd3'

import LineGenerator from './LineGenerator'

class Chart extends React.Component {
  static defaultProps = {
    width: 600,
    height: 300
  }

  render () {
    const { width, height, data } = this.props

    const xScale = d3.scaleLinear()
      .domain([0, 7])
      .range([0, width])

    const yScale = d3.scaleLinear()
      .domain([0, 35])
      .range([height, 0])

    return (
      <svg
        width={width}
        height={height}
      >
        <LineGenerator
          xScale={xScale}
          yScale={yScale}
          data={data}
        />
      </svg>
    )
  }
}

Chart.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  data: React.PropTypes.object.isRequired
}

export default Chart
