require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
// require("@nomicfoundation/hardhat-ethers");
// require("@nomiclabs/hardhat-etherscan");

const {API_URL, PRIVATE_KEY, MATIC_MAINNET_URL, MAINNET_PRIVATE_KEY, POLYGONSCAN_API_KEY} = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  sourcify: {
    enabled: true
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    matic: {
      url: MATIC_MAINNET_URL,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
 }
};
