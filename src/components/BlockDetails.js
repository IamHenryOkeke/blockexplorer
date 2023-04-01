import React from 'react'

const BlockDetails = ({data}) => {
    // declared variables for block details
    const blockNumber = data.number;
    const blockHash = data.hash;
    const gasUsed = parseInt(data.gasUsed._hex,16);
    const gasLimit = parseInt(data.gasLimit._hex,16);
    const numberOfTxns = data.transactions.length;
    const timeStamp = new Date(data.timestamp * 1000);

    // function to add commas to figures
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className='flex flex-col gap-2'>
            <p>Block Number: {blockNumber}</p>
            <p>Block Hash: {blockHash}</p>
            <p>Gas used: {numberWithCommas(gasUsed)} ({((gasUsed / gasLimit) * 100).toFixed(2)}% gas used)</p>
            <p>Gas Limit: {numberWithCommas(gasLimit)}</p>
            <p>{numberOfTxns} transactions in this block</p>
            <p>Timestamp:  {`${timeStamp}`}</p>
        </div>
    )
}

export default BlockDetails
