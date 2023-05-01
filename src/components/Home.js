import React from 'react'
import BlockDetails from './BlockDetails'
import Footer from './Footer';
import TransactionDetails from './TransactionDetails'

const Home = ({isLoading, error, data, value, handleOnChange, handleRefreshRequest}) => {
  return (
    <div>
      <div className='mx-3 mt-3'>
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
      <Footer/>
    </div>
  )
}

export default Home
