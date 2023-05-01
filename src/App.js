import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import TransactionReceipt from './components/TransactionReceipt';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};



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
    if (obj) {
      setData(obj);
      console.log(obj);
      setIsLoading(false);
      setError("");
    } else {
      setIsLoading(false);
      setError("Oopps!!!!!!! Could not fetch data. Please enter a valid block number or check your internet connection");
    }

  }

  // function to fetch data and set state values
  const getBlockNumber = async (blockNum) => {
    setIsLoading(true);
    setError("");
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
    <div className="App font-body text-center md:w-[80%] md:mx-auto lg:w-[60%]">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} value={value} handleOnChange={handleOnChange} handleRefreshRequest={handleRefreshRequest} data={data} error={error} />}>
          </Route>
          <Route path="/transactionReceipt/:hash" element={<TransactionReceipt/>}>
          </Route>
          <Route path="/contact" element = {<Contact/>}>
          </Route>
        </Routes>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
