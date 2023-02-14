import React, { useContext, createContext } from "react";
import {
	useAddress,
	useContract,
	useMetamask,
	useContractRead,
	useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { donatorAccessAddress, donatorAddress } from "../constants";

const StateContext = createContext();

export function StateContextProvider({ children }) {
	const { contract: accessNFT } = useContract(donatorAccessAddress);
	const { contract: donator } = useContract(donatorAddress);
	const address = useAddress();
	const connect = useMetamask();

	// NFT Function
	const { mutateAsync: safeMint } = useContractWrite(accessNFT, "safeMint");

	// Transection Calls
	async function mintNFT() {
		try {
			const data = await safeMint();
		} catch (error) {
			console.log(error);
		}
	}

	// Read Calls

	return (
		<StateContext.Provider
			value={{
				address,
				mintNFT,
				connect,
			}}
		>
			{children}
		</StateContext.Provider>
	);
}

export function useStateContext() {
	return useContext(StateContext);
}
