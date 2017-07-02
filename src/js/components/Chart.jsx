import React from 'react'
import * as d3 from 'd3'

import LineGenerator from './LineGenerator'
import XYAxis from './x-y-axis'

class Chart extends React.Component {
  static defaultProps = {
    width: 600,
    height: 300,
    padding: {top: 10, right: 10, bottom: 30, left: 45}
  }

  render () {
    console.log('render Chart') // TODO: delete this!
    const { width, height, padding, data } = this.props

    const xScale = d3.scaleUtc()
      .domain(d3.extent(data[0], d => d.date))
      .range([padding.left, width - padding.right])

    const yExtent = stocks => stocks.map(
      stock => d3.extent(stock, d => +d.value)
    ).reduce((a, b) => [
      b[0] < a[0] ? b[0] : a[0],
      b[1] > a[1] ? b[1] : a[1]
    ])

    const yScale = d3.scaleLinear()
      .domain(yExtent(data))
      .range([height - padding.bottom, padding.top])

    const scales = { xScale: xScale, yScale: yScale }

    return (
      <svg
        className='chart'
        width={width}
        height={height}
      >
        <XYAxis {...this.props} {...scales} />
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
  data: React.PropTypes.array.isRequired
}

export default Chart
