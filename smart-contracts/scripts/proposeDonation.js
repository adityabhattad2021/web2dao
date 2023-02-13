const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer, reciever } = await getNamedAccounts();
	const donator = await ethers.getContract("Donator", deployer);

	const currentProposalId = await donator.getProposalCount();
	console.log("----------------------------------------------------");
	console.log(`1) Proposing Donation with Id ${currentProposalId}...`);
	const tx1 = await donator.proposeDonation(
		reciever,
		"Reciever wants to continue his education",
		ethers.utils.parseEther("5")
	);
	await tx1.wait(1);
	console.log("Successfully proposed Donation");
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
