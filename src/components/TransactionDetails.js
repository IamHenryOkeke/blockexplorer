import React from 'react'

const transactionDetails = ({ data }) => {
  return (
    <div className='transaction-container flex flex-col gap-2'>
      {data.map((item, index) => {
        return (
          <div className="transaction border border-[#ceb9bf] rounded py-2 px-1" key={index} id={index}>
            <p className='break-words'>Transaction Hash: {item.hash}</p>
            <p className='break-words'>From: {item.from}</p>
            <p className='break-words'>To: {item.to}</p>
            <p>Value: {(parseInt(item.value._hex, 16)) / 10 ** 18} Eth</p>
          </div>
        )
      })}
    </div>
  )
}

export default transactionDetails
