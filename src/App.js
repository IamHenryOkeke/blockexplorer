import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import TransactionDetails from './components/TransactionDetails';
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

  // function to update state variable values
  const setStateValues = (obj) => {
    setData(obj);
    console.log(obj);
    setIsLoading(false);
    setError("");
  }

  // function to fetch data and set state values
  const getBlockNumber = async (blockNum) => {
    setIsLoading(true);
    setData(null);
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

  // function to handle changes in input field
  const handleOnChange = (e) => {
    // removes any letter in the input field
    const numOnlyInput = e.target.value.replace(/\D/g, '');
    setValue(numOnlyInput);
  }

  // function to handle refresh request
  const handleRefreshRequest = (e) => {
    getBlockNumber(value);
  }

  useEffect(() => {
    getBlockNumber(value);
  }, [value]);

  return (
    <div className="App font-body text-center mx-3 mt-3 md:w-[80%] md:mx-auto lg:w-[60%]">
      <Navbar />
      <div className='input-field my-4 flex gap-2 justify-center'>
        <input className='border-2 border-[#f1356d] rounded pl-1' type="text" value={value} placeholder='Enter a valid block number' onChange={handleOnChange} />
        <button className='border-2 border-[#f1356d] rounded px-2 hover:bg-red-100' onClick={handleRefreshRequest}>Refresh</button>
      </div>
      <div className="block-details">
        {isLoading && <div>Loading Data.....</div>}
        {error && <div>{error}</div>}
        {data && <div>
          <h2 className="text-2xl font-bold">Block Details</h2>
          <BlockDetails data={data} />
        </div>
        }
      </div>
      <div className='transaction-details'>
        {data &&
          <div className='mt-5 flex flex-col gap-2'>
            <h2 className="text-2xl font-bold">Block Transactions Details</h2>
            <TransactionDetails data={data.transactions} />
          </div>
        }
      </div>
    </div>
  );
}

export default App;
