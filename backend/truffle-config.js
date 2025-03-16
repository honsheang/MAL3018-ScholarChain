require('dotenv').config({ path: '../.env' });
const HDWalletProvider = require('@truffle/hdwallet-provider');

const privateKey = process.env.PRIVATE_KEY;
const infuraApiKey = process.env.INFURA_API_KEY;

if (!privateKey || !infuraApiKey) {
  throw new Error("Missing PRIVATE_KEY or INFURA_API_KEY in .env file");
}

module.exports = {
  
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider({
        privateKeys: [process.env.PRIVATE_KEY],
        providerOrUrl: 'https://sepolia.infura.io/v3/cb032d6e69ec47d08c59b5ba283eb76a'
      }),
      network_id: 11155111,     // Sepolia network ID
      gas: 8000000,             // Adjust gas limit based on your contract
      gasPrice: 20000000000,    // Adjust gas price as needed (in wei)         
      timeoutBlocks: 500,       // Timeout for deployment
      skipDryRun: true          // Skip dry run before deployment
    },
  },
  // Other configurations
  compilers: {
    solc: {
      version: "0.8.0"           // Match your contract's Solidity version
    }
  }
};