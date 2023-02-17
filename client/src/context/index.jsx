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

	// -------------------------------------------------------------------------
	// NFT Function
	const { mutateAsync: safeMint } = useContractWrite(accessNFT, "safeMint");

	// Transection Calls
	async function mintNFT() {
		try {
			const data = await safeMint();
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	// Read Calls

	// -------------------------------------------------------------------------

	// -------------------------------------------------------------------------

	// Donator Functions
	const { mutateAsync: proposeDonation } = useContractWrite(
		donator,
		"proposeDonation"
	);
	const { mutateAsync: voteForProposal } = useContractWrite(donator, "voteForProposal")

	// Transection Calls
	async function donateProposal(data1) {
		console.log(data1);
		const _donationAddress = data1.donationAddress;
		const donationReason = data1.donationReason;
		const _amount = ethers.utils.parseEther(data1.donationAmount);
		console.log(_amount);
		try {
			const data = await proposeDonation([
				_donationAddress,
				donationReason,
				_amount,
			]);
			console.info("contract call successs", data);
		} catch (err) {
			console.error("contract call failure", err);
		}
	}

	async function voteProposal(proposalId,vote){
		try {
			const data = await voteForProposal([ _proposalId, _vote ]);
			console.info("contract call successs", data);
		  } catch (err) {
			console.error("contract call failure", err);
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
