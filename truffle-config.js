require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
      ),
      network_id: 11155111,     // Sepolia network ID
      gas: 5500000,             // Adjust gas limit based on your contract
      gasPrice: 20000000000,    // Adjust gas price as needed (in wei)
      confirmations: 2,         // Wait for 2 confirmations on deployment
      timeoutBlocks: 200,       // Timeout for deployment
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
