const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();
	const donator = await ethers.getContract("Donator", deployer);

	console.log("----------------------------------------------------");
	console.log(`1) Funding Donator...`);
	const tx1 = await donator.fundTheSmartContractInWEI({
		value: ethers.utils.parseEther("10"),
	});
	await tx1.wait(1);
	console.log("Successfully funded Donator");
	console.log("----------------------------------------------------");
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
