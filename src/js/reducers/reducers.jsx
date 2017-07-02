import * as d3 from 'd3'

export const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case 'START_FETCHING':
      return true

    case 'END_FETCHING':
      return false

    default:
      return state
  }
}

export const stockReducer = (state = [], action) => {
  const parseTime1 = d3.utcParse('%Y-%m-%d')
  const parseTime2 = d3.utcParse('%Y-%m-%d %H:%M:%S')
  switch (action.type) {
    case 'newwsconn':
      if (action.stocks.length === 0) return []
      return action.stocks.map((stock, idx) => {
        const keyList = Object.keys(stock['Time Series (Daily)'])
        return (
          keyList.map((key, idx) => {
            return {
              id: stock['Meta Data']['2. Symbol'],
              date: parseTime1(key) || parseTime2(key),
              value: stock['Time Series (Daily)'][key]['4. close']
            }
          }).reverse()
        )
      })
    case 'stock:insert':
      const keyList = Object.keys(action.stock['Time Series (Daily)'])
      const shaped = keyList.map((key, idx) => (
        {
          id: action.stock['Meta Data']['2. Symbol'],
          date: parseTime1(key) || parseTime2(key),
          value: action.stock['Time Series (Daily)'][key]['4. close']
        }
      )).reverse()
      return state.concat([shaped])
    case 'stock:delete':
      return [...state.slice(0, action.index), ...state.slice(action.index + 1)]
    default:
      return state
  }
}

export const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'stock:error':
      return action.error
    case 'DELETE_ERROR':
      return ''
    default:
      return state
  }
}
