const { ethers, getNamedAccounts } = require("hardhat");

async function main() {
	const { deployer } = await getNamedAccounts();
	const donator = await ethers.getContract("Donator", deployer);

	console.log("----------------------------------------------------");
	console.log(`1) Voting for Proposal 0...`);
	const allAccounts = await ethers.getSigners();
	for (let i = 1; i <= 2; i++) {
		const contractConnectedToVoter = donator.connect(allAccounts[i]);
		const tx = await contractConnectedToVoter.voteForProposal(1, 1);
		await tx.wait(1);
	}
	console.log("Successfully voted for Proposal 0");
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
