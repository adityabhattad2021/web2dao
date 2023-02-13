const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer, voter1, voter2 } = await getNamedAccounts();
	const donatorAccess = await ethers.getContract("DonatorAccess", deployer);

	console.log("----------------------------------------------------");
	console.log(`1) Minting NFTs...`);
	const tx1 = await donatorAccess.safeMint(deployer);
	await tx1.wait(1);
	const tx2 = await donatorAccess.safeMint(voter1);
	await tx2.wait(1);
	const tx3 = await donatorAccess.safeMint(voter2);
	await tx3.wait(1);
	console.log("Successfully minted NFTs");
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
