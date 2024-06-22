require('dotenv').config();
require("@nomicfoundation/hardhat-ethers");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  }
}
