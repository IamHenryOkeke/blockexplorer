import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

const App = () => {
  const [blockNumber, setBlockNumber] = useState("");
  const [nonce, setNonce] = useState("");
  const [hash, setHash] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [numberOfTxns, setNumberOfTxns] = useState("");
  const [timeStamp, setTimeStamp] = useState("");
  // function to add commas to figures
  function numberWithCommas(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
useEffect(() => {
    const getBlockNumber = async () => {
      const newBlockNumber = await alchemy.core.getBlockNumber();
      const blockTxns = await alchemy.core.getBlockWithTransactions(newBlockNumber);
      console.log(blockTxns)
      
      setBlockNumber(blockTxns.number);
      setHash(blockTxns.hash);
      setGasLimit(parseInt(blockTxns.gasLimit._hex, 16));
      setGasUsed(parseInt(blockTxns.gasUsed._hex, 16));
      setNonce(blockTxns.nonce);
      setNumberOfTxns((blockTxns.transactions).length)
      setTimeStamp(new Date(blockTxns.timestamp * 1000))
    }

    getBlockNumber();
  });

  return (
    <div className="App">
      <div>
        <input type="text" placeholder='Enter block number' />
        <button>Search</button>
      </div>
      <div className="block-details">
        <p>Block Number: {blockNumber}</p>
        <p>Hash: {hash}</p> 
        <p>Nonce: {nonce}</p>
        <p>Gas used: {numberWithCommas(gasUsed)} ({((gasUsed/gasLimit) * 100).toFixed(2)}% gas used)</p>
        <p>Gas Limit: {numberWithCommas(gasLimit)}</p>
        <p>{numberOfTxns} transactions in this block</p>
        <p>Timestamp:  {`${timeStamp}`}</p>
        {/* <p>{blockNumber}</p>
        <p>{blockNumber}</p>
        <p>{blockNumber}</p> */}
      </div>
    </div>
  );
}

export default App;
