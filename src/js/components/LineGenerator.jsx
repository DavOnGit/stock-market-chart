import React from 'react'
import * as d3 from 'd3'

import Line from './Line'
import Tooltip from './Tooltip'

class LineGenerator extends React.Component {
  static defaultProps = {
    data: [],
    colors: d3.scaleOrdinal(d3.schemeCategory10).range()
  }

  state = {
    tooltip: null
  }

  handleMouseOver = (data) => {
    this.setState({ tooltip: data })
  }

  handleMouseOut = () => {
    this.setState({ tooltip: null })
  }

  render () {
    const { data, colors, xScale, yScale } = this.props
    const { tooltip } = this.state

    const line = d3.line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))

    const lines = data.map((point, i) => (
      <Line
        path={line(point)}
        type={'line'}
        stroke={colors[i % 10]}
        strokeWidth={1.5}
        key={i}
      />
    ))

    const voronoi = d3.voronoi()
      .x(d => xScale(d.date))
      .y(d => yScale(d.value))
      .extent([[0, 0], [940, 400]])

    const voronoids = voronoi.polygons(d3.merge(data.map(d => d)))
    const vorLines = voronoids.map((polygon, i) => {
      const path = polygon ? 'M' + polygon.join('L') + 'Z' : null
      return (
        <Line
          path={path}
          data={polygon.data}
          type={'voronoi'}
          handleMouseOver={this.handleMouseOver}
          handleMouseOut={this.handleMouseOut}
          stroke={'#CCC'}
          strokeWidth={0.5}
          key={i}
        />
      )
    })

    const renderTooltip = this.state.tooltip ? (
      <Tooltip
        data={tooltip}
        pos={{
          x: xScale(tooltip.date),
          y: yScale(tooltip.value)
        }} />
    ) : null

    return (
      <g>
        <g className='stocks'>
          {lines}
        </g>
        <g className='voronoi'>
          {vorLines}
        </g>
        {renderTooltip}
      </g>
    )
  }
}

export default LineGenerator
