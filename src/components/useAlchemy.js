
import { Alchemy, Network } from 'alchemy-sdk';
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

const useAlchemy = () => {
    const settings = {
        apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(settings);
    return [alchemy];
}

export default useAlchemy;