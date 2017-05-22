import React, { Component } from 'react'

import Chart from './Chart'

class HomePage extends Component {
  render () {
    return (
      <Chart
        data={data}
        width={600}
        height={300} />
    )
  }
}

export default HomePage

var data = {
  points: [
    [
      { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 },
      { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 }
    ], [
      { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 },
      { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 }
    ], [
      { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 },
      { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 }
    ]
  ],
  xValues: [0, 1, 2, 3, 4, 5, 6],
  yMin: 0,
  yMax: 30
}
