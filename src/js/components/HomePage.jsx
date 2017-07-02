import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import {List, ListItem} from 'material-ui/List'
import Popover from 'material-ui/Popover/Popover'
import Dialog from 'material-ui/Dialog'
import Avatar from 'material-ui/Avatar'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import FlatButton from 'material-ui/FlatButton'
import ContentAddIcon from 'material-ui/svg-icons/content/add'
import SendIcon from 'material-ui/svg-icons/content/send'
import StockIcon from 'material-ui/svg-icons/maps/place'
import DeleteIcon from 'material-ui/svg-icons/navigation/cancel'
import TextField from 'material-ui/TextField'
import LinearProgress from 'material-ui/LinearProgress'

import { socket } from '../socket-listeners/stock-listeners'
import Chart from './Chart'
import * as actions from '../actions/actions'

class HomePage extends Component {
  state = {
    popOpen: false,
    modOpen: false
  }

  handlePopoverOpen = (event) => {
    this.setState({
      popOpen: true,
      anchor: event.currentTarget
    })
  }

  handlePopoverClose = () => {
    this.setState({ popOpen: false })
  }

  handleNewTaskInput = (event) => {
    event.preventDefault()

    const stockSymbol = event.target[0].value

    if (stockSymbol && stockSymbol.trim().length > 0) {
      // Emit socket event for new stock
      socket.emit('stock:client:insert', { stockSymbol })
      this.handlePopoverClose()
      this.props.dispatch(actions.startFetching())
    } else {
      this.setState({ error: 'Invalid stock name' })
    }
  }

  handleInputChange = () => {
    this.setState({ error: null })
  }

  handleDelete = (index) => (e) => {
    e.preventDefault()
    socket.emit('stock:client:delete', index)
    this.props.dispatch(actions.startFetching())
  }

  handleModalOpen = () => {
    this.setState({modOpen: true})
  }

  handleModalClose = () => {
    this.setState({modOpen: false})
    this.props.dispatch(actions.removeError())
  }

  componentWillMount () {
    if (this.props.error.length > 0) {
      this.handleModalOpen()
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.error.length > 0) {
      this.handleModalOpen()
    }
  }

  render () {
    console.log('render Home') // TODO: delete this!
    const { stocks, error, fetching } = this.props
    const colors = d3.scaleOrdinal(d3.schemeCategory10).range()

    const chart = stocks && stocks.length > 0
      ? <Chart data={stocks} width={940} height={400} />
      : <h3 className='noStockMsg'>Stock List is empty!</h3>

    const stockList = stocks.map((stock, idx) => (
      <ListItem
        className='stock'
        containerElement={'a'}
        href={`https://finance.yahoo.com/quote/${stock[0].id}`}
        target={'_blank'}
        key={idx}
        primaryText={stock[0].id}
        leftAvatar={<Avatar icon={<StockIcon />} backgroundColor={colors[idx % 10]} />}
        rightIcon={
          <DeleteIcon
            onClick={this.handleDelete(idx)}
            hoverColor={'red'}
          />
        }
      />
      )
    )

    const modalAction = [
      <FlatButton
        label='Got it!'
        primary={true} // eslint-disable-line
        onTouchTap={this.handleModalClose}
      />
    ]

    const isFetching = fetching ? (
      <div>
        <LinearProgress className='fetching' mode='indeterminate' style={{backgroundColor: '#E91E63'}} />
      </div>
    ) : null

    return (
      <div>
        <div className='title'>
          <h1>Stock Market Charts</h1>
          <h4>get last 100 days US stocks data nicely charted</h4>
        </div>
        {chart}
        <List className='stockList'>
          {stockList}
        </List>
        <Popover
          open={this.state.popOpen}
          anchorEl={this.state.anchor}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          onRequestClose={this.handlePopoverClose}
        >
          <form onSubmit={this.handleNewTaskInput}>
            <TextField
              style={{ margin: '20px 0 20px 20px' }}
              hintText='example: GOOG, FB, MSFT'
              errorText={this.state.error}
              onChange={this.handleInputChange}
              autoFocus='true'
            />
            <FlatButton
              className='submitBtn'
              secondary={true} // eslint-disable-line
              type={'submit'}
              icon={<SendIcon />}
              style={{lineHeight: '100%'}}
            />
          </form>
        </Popover>
        <FloatingActionButton onTouchTap={this.handlePopoverOpen} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 100 }}>
          <ContentAddIcon />
        </FloatingActionButton>
        <Dialog
          actions={modalAction}
          modal={false}
          open={this.state.modOpen}
          onRequestClose={this.handleClose}
        >
          {error}
        </Dialog>
        {isFetching}
      </div>
    )
  }
}

function mapStateToProps ({stocks, error, fetching}) {
  return { stocks, error, fetching }
}

export default connect(mapStateToProps)(HomePage)
