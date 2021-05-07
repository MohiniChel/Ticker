import React, { useEffect, useState } from 'react'
import { BiBitcoin } from 'react-icons/bi';

var W3CWebSocket = require('websocket').w3cwebsocket

var client = new W3CWebSocket('wss://api-pub.bitfinex.com/ws/2')

const Ticker = () => {
  const [id, setId] = useState('')
  const [tickerData, setTickerData] = useState([])
  useEffect(() => {
    client.onerror = function () {
      console.log('Connection Error')
    }

    client.onopen = function () {
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      })
      client.send(msg)
    }

    client.onclose = function () {
      console.log('echo-protocol Client Closed')
    }

    client.onmessage = function (e) {
      if (typeof e.data === 'string') {
        const parsedData = JSON.parse(e.data)
        setId(parsedData[0])
        if (parsedData[1]) {
          if (typeof JSON.parse(e.data)[1] !== 'string') {
            setTickerData(parsedData[1])
          }
        }
      }
    }
  })

  return (
    <>
        <div className="color">
          <div>
            <div className='bit-i'><BiBitcoin /></div>
          </div>
          <div>
            <h1 className='bit-design'>BTC/USD</h1>
            <h4 className='Vol'>Vol {tickerData[10] ? tickerData[10] : 0} </h4>
            <h4 className='Vol'>Low {tickerData[12] ? tickerData[12] : 0} </h4>
            <h4 className='Vol'>HIGHT {tickerData[11] ? tickerData[11] : 0} </h4>
            <h4 className='Vol'>Your BTC/USD Rank</h4>

            </div>
        </div>
      

      <pre>
        CHANNEL_ID : {id} <br />
        FRR float : {tickerData[0] ? tickerData[0] : 0} <br />
        BID float : {tickerData[1] ? tickerData[1] : 0} <br />
        BID_PERIOD : {tickerData[2] ? tickerData[2] : 0} <br />
        BID_SIZE : {tickerData[3] ? tickerData[3] : 0} <br />
        ASK float : {tickerData[4] ? tickerData[4] : 0} <br />
        ASK_PERIOD : {tickerData[5] ? tickerData[5] : 0} <br />
        ASK_SIZE : {tickerData[6] ? tickerData[6] : 0} <br />
        DAILY_CHANGE : {tickerData[7] ? tickerData[7] : 0} <br />
        DAILY_CHANGE_RELATIVE : {tickerData[8] ? tickerData[8] : 0} <br />
        LAST_PRICE float : {tickerData[9] ? tickerData[9] : 0} <br />
        VOLUME : {tickerData[10] ? tickerData[10] : 0} <br />
        HIGH : {tickerData[11] ? tickerData[11] : 0} <br />
        LOW float : {tickerData[12] ? tickerData[12] : 0} <br />
        FRR_AMOUNT_AVAILABLE : {tickerData[13] ? tickerData[13] : 0} <br />
      </pre>
    </>  
    )
}

export default Ticker
