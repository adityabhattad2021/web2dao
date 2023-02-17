import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomButton, Loader } from "../components";
import { useStateContext } from "../context";

const initialProposal = {
	recipientAddress: "",
	proposalDescrption: "",
	amount: "",
};

function Vote() {

	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const { getProposalCall, donator, address,voteProposal } = useStateContext();
	const [proposal, setProposal] = useState(initialProposal);

	async function fetchProposal(proposalId) {
		setIsLoading(true);
		const p = await getProposalCall(proposalId);
		setProposal(p);
		setIsLoading(false);
	}

    async function handleVote(vote){
        setIsLoading(true);
        if(vote==1){
            await voteProposal(id,1);
        }else{
            await voteProposal(id,0);
        }
        setIsLoading(false);
    }

	useEffect(() => {
		if (donator) {
			fetchProposal(id);
		}
	}, [donator, address]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className="flex flex-col sm:flex-row flex-shrink">
					<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[30px] lg:w-[60%] sm:p-10 p-4 mx-5 h-[75vh] overflow-y-auto">
						<h1 className="font-epilogue font-medium sm:text-[25px] text-[18px] leading-[38px] text-white">
							Proposal Id 1
						</h1>
						<div className="mt-2 w-full">
							<div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]  text-left border-2 border-[#808191] rounded-[15px] w-[90%] h-[23%] flex flex-col justify-start overflow-x-hidden">
								<h1 className="p-2">Recipient Address</h1>
								<h2 className="p-2">
									{proposal.recipientAddress}
								</h2>
							</div>
							<div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]  text-left border-2 border-[#808191] rounded-[15px] w-[90%] h-[50%] flex flex-col justify-start overflow-y-auto overflow-x-hidden">
								<h1 className="p-5">Proposal Discription</h1>
								<h2 className="p-5">
									{proposal.proposalDescrption}
								</h2>
							</div>
							<div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]  text-left border-2 border-[#808191] rounded-[15px] w-[90%] h-[23%] flex flex-col justify-start">
								<h1 className="p-2">Amount</h1>
								<h2 className="p-2">{proposal.amount} MATIC</h2>
							</div>
						</div>
					</div>
                    <div className="flex flex-col w-[40%] m-10">
                        <CustomButton
                            buttonType="button"
                            title="Approve"
                            styles="bg-[#1dc071] m-10"
                            handleClick={() => handleVote(1)}
                        />
                        <CustomButton
                            buttonType="button"
                            title="Reject"
                            styles="bg-red-500 m-10"
                            handleClick={() => handleVote(0)}
                        />
                    </div>
				</div>
			)}
		</>
	);
}

export default Vote;
