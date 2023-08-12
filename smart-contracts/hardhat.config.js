require("@nomiclabs/hardhat-ethers");
require("@eth-optimism/hardhat-ovm");

require("dotenv").config()

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ALCHEMY_GOERLI_URL = process.env.ALCHEMY_URL;
const ALCHEMY_OPGOERLI_URL = process.env.ALCHEMY_URL;

module.exports = {
  networks: {
    goerli: {
      url: `${ALCHEMY_GOERLI_URL}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    optimism: {
      url: `${ALCHEMY_OPGOERLI_URL}`,
      accounts: [`${PRIVATE_KEY}`],
      gasPrice: 15000000,
      ovm: true,
    },
  },
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    deploy: "./deploy",
    artifacts: "./artifacts",
    helpers: "./contracts/helpers",
    interfaces: "./contracts/interfaces",
  },
};
