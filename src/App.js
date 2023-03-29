import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import TransactionDetails from './components/TransactionDetails';
import './App.css';
import Navbar from './components/Navbar';
import BlockDetails from './components/BlockDetails';

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

  // initializing the needed state variables for project
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [blockNumber, setBlockNumber] = useState("");
  const [hash, setHash] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [gasUsed, setGasUsed] = useState("");
  const [numberOfTxns, setNumberOfTxns] = useState("");
  const [timeStamp, setTimeStamp] = useState("");

  // function to add commas to figures
  const numberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // function to update state variable values
  const setStateValues = (obj) => {
    setData(obj);
    console.log(obj);
    setBlockNumber(obj.number);
    setHash(obj.hash);
    setGasLimit(parseInt(obj.gasLimit._hex, 16));
    setGasUsed(parseInt(obj.gasUsed._hex, 16));
    setNumberOfTxns((obj.transactions).length);
    setTimeStamp(new Date(obj.timestamp * 1000));
    setIsLoading(false);
    setError("");
  }

  // function to fetch data and set state values
  const getBlockNumber = async (blockNum) => {
    try {
      let blockTransactions;
      if (blockNum === "") {
        blockNum = await alchemy.core.getBlockNumber();
        blockTransactions = await alchemy.core.getBlockWithTransactions(blockNum);
      } else {
        blockTransactions = await alchemy.core.getBlockWithTransactions(Number(blockNum));
      }
      setStateValues(blockTransactions);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      setError("Oopps!!!!!!! Could not fetch data. Please enter a valid block number or check your internet connection");
    }
  }

  const handleOnChange = (e) => {
    // removes any letter in the input field
    const numOnlyInput = e.target.value.replace(/\D/g, '');
    setValue(numOnlyInput);
  }

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    getBlockNumber(value);
  }

  useEffect(() => {
    setIsLoading(true)
    setData(null)
    getBlockNumber(value);
    console.log("use effect ran")
  }, [value]);

  return (
    <div className="App">
      <Navbar />
      <form className='input-field'>
        <input type="text" value={value} placeholder='Enter a valid block number' onChange={handleOnChange} />
        <button onClick={handleSubmitRequest}>Search</button>
      </form>
      <div className="block-details">
        {isLoading && <div>Loading Data.....</div>}
        {error && <div>{error}</div>}
        {data && <div>
          <h2>Block Details</h2>
          <div>
            <p>Block Number: {blockNumber}</p>
            <p>Block Hash: {hash}</p>
            <p>Gas used: {numberWithCommas(gasUsed)} ({((gasUsed / gasLimit) * 100).toFixed(2)}% gas used)</p>
            <p>Gas Limit: {numberWithCommas(gasLimit)}</p>
            <p>{numberOfTxns} transactions in this block</p>
            <p>Timestamp:  {`${timeStamp}`}</p>
          </div>
        </div>
        }
      </div>
      <div className='transaction-details'>
        {data &&
          <div>
            <h2>Block Transactions Details</h2>
            <TransactionDetails data={data.transactions} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
