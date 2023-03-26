import React from 'react'

const transactionDetails = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => {
        return (
          <div className="transaction" key={index} id={index}>
            <p>Transaction Hash: {item.hash}</p>
            <p>From: {item.from}</p>
            <p>To: {item.to}</p>
            <p>Value: {(parseInt(item.value._hex, 16)) / 10 ** 18} Eth</p>
          </div>
        )
      })}
    </div>
  )
}

export default transactionDetails
