import io from 'socket.io-client'

export const socket = io.connect('/')

export default function (dispatch) {
  socket.on('newwsconn', stocks => {
    dispatch({
      type: 'newwsconn',
      stocks
    })
  })

  socket.on('stock:insert', stock => {
    dispatch({
      type: 'END_FETCHING'
    })
    dispatch({
      type: 'stock:insert',
      stock
    })
  })

  socket.on('stock:delete', index => {
    dispatch({
      type: 'END_FETCHING'
    })
    dispatch({
      type: 'stock:delete',
      index
    })
  })

  socket.on('stock:error', error => {
    dispatch({
      type: 'END_FETCHING'
    })
    dispatch({
      type: 'stock:error',
      error
    })
  })
}
