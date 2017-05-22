const express = require('express')
const router = new express.Router()
const request = require('request')

router.get('/', (req, res) => {
  console.log(req.query)
  const path = `http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=${process.env.KEY}`
  request({url: path}).pipe(res)
})

module.exports = router
