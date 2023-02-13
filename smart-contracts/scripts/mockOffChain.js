const { ethers, network } = require("hardhat");

async function main() {
	const donator = await ethers.getContract("Donator");

	network.provider.send("evm_increaseTime", [121]);
	network.provider.send("evm_mine");

	const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""));
	const upkeepNeeded = await donator.checkUpkeep(checkData);
    console.log("upkeepNeeded: ", upkeepNeeded);
	if (upkeepNeeded) {
		const transectionResponse = await donator.performUpkeep(checkData);
		const transectionRecipt = await transectionResponse.wait(1);
		const requestId = await transectionRecipt.events[0];
		console.log("-------------------------------------");
		console.log("Performed upkeep with requestId: ", requestId);
		console.log("-------------------------------------");
	} else {
		console.log("No upkeep needed");
	}
}

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
