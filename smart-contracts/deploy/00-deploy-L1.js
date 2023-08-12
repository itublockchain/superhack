const { ethers } = require("hardhat");
const { JsonRpcProvider } = require("@ethersproject/providers");

require("dotenv").config()

async function main() {
  // Use the AlchemyProvider, but configure it for Optimism Goerli
  const provider = new JsonRpcProvider(`${process.env.ALCHEMY_OPGOERLI_URL}`);
  const accounts = await ethers.getSigners();

  const L1Contract = await ethers.getContractFactory("L1Contract");
  const L1 = await L1Contract.deploy(
      _worldId= "lorem123",
      _appId= "123",
      _actionId= "321",
    {
      signer: accounts[0],
    }
  );

  await L1.deployed();

  console.log("L1 Contract deployed to:", L1.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
