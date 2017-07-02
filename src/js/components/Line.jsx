import React from 'react'

class Line extends React.PureComponent {
  handleMouseOver = () => () => {
    this.props.handleMouseOver(this.props.data)
  }

  handleMouseOut = () => () => { this.props.handleMouseOut() }

  render () {
    console.log('render Line') // TODO: delete this!
    const { type, path, stroke, strokeWidth } = this.props
    return (
      <path
        onMouseOver={type === 'voronoi' ? this.handleMouseOver() : undefined}
        onMouseOut={type === 'voronoi' ? this.handleMouseOut() : undefined}
        d={path}
        fill={'none'}
        stroke={type === 'voronoi' ? 'transparent' : stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin={'round'}
        strokeLinecap={'round'}
        pointerEvents={type === 'voronoi' ? 'all' : 'none'}
      />
    )
  }
}

export default Line
