import React from 'react'

class Line extends React.Component {
  render () {
    const { path, stroke, fill, strokeWidth } = this.props
    return (
      <path
        onMouseEnter={() => { console.log('FkU!') }}
        d={path}
        fill={'none'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin={'round'}
        strokeLinecap={'round'} />
    )
  }
}

export default Line
