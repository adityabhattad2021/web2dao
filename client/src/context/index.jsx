import React, { useContext, createContext } from "react";
import {
	useAddress,
	useContract,
	useMetamask,
	useContractRead,
	useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import {
	donatorABI,
	donatorAccessABI,
	donatorAccessAddress,
	donatorAddress,
} from "../constants";
import { useArcanaAuth } from "../arcana/useArcanaAuth";

const StateContext = createContext();

export function StateContextProvider({ children }) {
	const { contract: accessNFT } = useContract(donatorAccessAddress);
	const { contract: donator } = useContract(donatorAddress);
	const address = useAddress();
	const connect = useMetamask();
	const { user, provider } = useArcanaAuth();

	// -------------------------------------------------------------------------
	// NFT Function

	// Transection Calls
	async function mintNFT() {
		if (typeof provider !== "undefined") {
			const provider1 = new ethers.providers.Web3Provider(provider);
			const signer = provider1.getSigner(user.address);
			console.log(signer);
			const contract = new ethers.Contract(
				donatorAccessAddress,
				donatorAccessABI,
				signer
			);
			try {
				const tx = await contract.safeMint();
				await provider.waitForTransection(tx.hash);
				console.log(tx);
			} catch (error) {
				console.log(error);
			}
		}
	}

	// Read Calls

	// -------------------------------------------------------------------------

	// -------------------------------------------------------------------------

	// Donator Functions

	// Transection Calls
	async function donateProposal(data1) {
		console.log(data1);
		const _donationAddress = data1.donationAddress;
		const donationReason = data1.donationReason;
		const _amount = ethers.utils.parseEther(data1.donationAmount);
		console.log(_amount);
		if (typeof provider !== "undefined") {
			const provider1 = new ethers.providers.Web3Provider(provider);
			const signer = provider1.getSigner(user.address);
			const contract = new ethers.Contract(
				donatorAddress,
				donatorABI,
				signer
			);
			try {
				const tx = await contract.proposeDonation(
					_donationAddress,
					donationReason,
					_amount
				);
				await provider.waitForTransection(tx.hash);
				console.log(tx);
			} catch (err) {
				console.error("contract call failure", err);
			}
		}
	}

	async function voteProposal(proposalId, vote) {
		if (typeof provider !== "undefined") {
			const provider1 = new ethers.providers.Web3Provider(provider);
			const signer = provider1.getSigner(user.address);
			const contract = new ethers.Contract(
				donatorAddress,
				donatorABI,
				signer
			);
			try {
				const tx = await contract.voteForProposal(proposalId, vote);
				await provider.waitForTransection(tx.hash);
				console.log(tx);
				console.info("contract call successs", data);
			} catch (err) {
				console.error("contract call failure", err);
			}
		}
	}

	// Read Calls
	async function getProposalCall(proposalId) {
		const proposal = await donator.call("getProposal", proposalId);
		console.log(proposal);
		const parsedProposal = {
			recipientAddress: proposal._donationAddress,
			proposalDescrption: proposal.donationReason,
			amount: ethers.utils.formatEther(proposal._amount.toString()),
		};
		return parsedProposal;
	}

	// -------------------------------------------------------------------------

	return (
		<StateContext.Provider
			value={{
				address,
				donator,
				mintNFT,
				donateProposal,
				voteProposal,
				getProposalCall,
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
