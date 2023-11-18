
import { Alchemy, Network } from 'alchemy-sdk';
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface

const useAlchemy = () => {
    const settings = {
        apiKey: "I9Te8RRbeEuhpE_KUXq52YNJns3mbCC4",
        network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(settings);
    return [alchemy];
}

export default useAlchemy;