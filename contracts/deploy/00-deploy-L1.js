const { ethers } = require("hardhat");

async function main() {
	const l1 = await ethers.getContractFactory("L1Contract");
	const L1 = await l1.deploy();

	await L1.deployed();

	console.log("L1 Contract deployed to:", L1.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
