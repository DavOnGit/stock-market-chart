import React from 'react'
import * as d3 from 'd3'

export default class Axis extends React.Component {
  renderAxis = () => {
    const { orient, scale } = this.props
    const node = this.refs.axis
    const selector = (orien) => {
      if (orien && orien === 'bottom') {
        return d3.axisBottom(scale).ticks(5)
      } else if (orien && orien === 'left') {
        return d3.axisLeft(scale).tickFormat(d3.format('$,'))
      }
    }
    const axis = selector(orient)
    d3.select(node).call(axis)

    // if (orient === 'left') {
    //   d3.select(node).append('text')
    //     .attr('x', -17.5)
    //     .attr('y', 33)
    //     .attr('dy', '0em')
    //     .style('text-anchor', 'middle')
    //     .style('fill', '#000')
    //     .text('$')
    // }
  }

  componentDidMount () {
    this.renderAxis()
  }

  componentDidUpdate () {
    this.renderAxis()
  }

  render () {
    return <g className='axis' ref='axis' transform={this.props.translate} />
  }
}
