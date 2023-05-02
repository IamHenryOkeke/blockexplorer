import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import useAlchemy from './useAlchemy';

const TransactionReceipt = ({ value }) => {
  let { hash } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // import useAlchemy hook
  const [alchemy] = useAlchemy()

  const getTransactionReceipt = async (hash) => {
    setIsLoading(true);
    setError("");
    setData(null);
    try {
      let response = await alchemy.core.getTransactionReceipt(hash)
      setData(response)
      console.log(response)
      setIsLoading(false);
      setError("");
    } catch (error) {
      setIsLoading(false);
      setError("Oopps!!!!!!! Could not fetch receipt data. Please check your internet connection");
    }

  }

  useEffect(() => {
    console.log(hash)
    getTransactionReceipt(hash);
  }, []);

  return (
    <div className='mt-10'>
      {isLoading && <div>Loading Data.....</div>}
      {error && <div>{error}</div>}
      {data && <div className='flex flex-col gap-3 md:gap-5 bg-gray-100 border border-[#ceb9bf] rounded-md text-[14.6px] md:text-base py-3 px-1'>
        <h1 className='text-2xl font-semibold md:text-5xl'>Transaction Receipt</h1>
        <p className='break-words'>Transaction Hash: {data.transactionHash}</p>
        <p className='break-words'>Transaction Status: {data.status ? <span className='text-green-500 bg-green-100 font-semibold border px-4 py-1 rounded-md'>Success</span> : <span className='text-red-500 bg-red-100 font-semibold border px-4 py-1 rounded-md'>Failure</span>}</p>
        <p className='break-words'>Block: {data.blockNumber}  <span className='border px-4 py-1 rounded-md text-sm'>{data.confirmations} Block Confirmations</span></p>
        <p className='break-words'>From: {data.from}</p>
        <p className='break-words'>To: {data.to}</p>
        <p>Gas Price: {(parseInt(data.effectiveGasPrice._hex, 16)) / 10 ** 9} Gwei</p>
      </div>
      }
    </div>
  )
}

export default TransactionReceipt
