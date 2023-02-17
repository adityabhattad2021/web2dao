import React from "react";
import { CustomButton } from "../components";
import { useNavigate } from "react-router-dom";
import {
	GET_ACTIVE_PROPOSALS,
	GET_RECIEVED_FUNDS,
	GET_EXECUTED_PROPOSALS,
} from "../constants/subGraphQuries";
import { useQuery } from "@apollo/client";
import { ethers } from "ethers";

function Dashboard() {
	const navigate = useNavigate();
	const { data: activeProposals } = useQuery(GET_ACTIVE_PROPOSALS);
	const { data: executedProposals } = useQuery(GET_EXECUTED_PROPOSALS);
	const { data: recievedFunds } = useQuery(GET_RECIEVED_FUNDS);
	console.log(activeProposals);

	const proposal = {
		id: 1,
	};

	function truncateString(fullStr, strLen) {
		if (fullStr.length <= strLen) {
			return fullStr;
		}
		const seperator = "...";
		const seperatorLength = seperator.length;
		const numberOfCharToShow = strLen - seperatorLength;
		const frontChar = Math.ceil(numberOfCharToShow / 2);
		const endChar = Math.floor(numberOfCharToShow / 2);

		return `${fullStr.substring(
			0,
			frontChar
		)}${seperator}${fullStr.substring(fullStr.length - endChar)}`;
	}

	function handleNavigate(proposalId) {
		navigate(`/vote/${proposalId}`);
	}

	return (
		<div className="flex flex-col gap-[40px]">
			<div className="flex flex-wrap lg:justify-evenly gap-[40px]">
				<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[30px] lg:w-[620px] sm:p-10 p-4 mx-5 h-96 shrink">
					<h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
						Recieved Funds
					</h1>
					<div className="overflow-y-scroll overflow-x-hidden mt-2 w-full">
						<div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]  h-[32rem] text-left w-full">
							<div className="w-full flex flex-row justify-around my-5">
								<div>Sender's Address</div>
								<div className="w-[80px]">Amount</div>
								<div className="w-[83px]">Timestamp</div>
							</div>
							{recievedFunds &&
								recievedFunds.recievedFunds.map((rFund) => {
									const { from, amount, timestamp } = rFund;
									const formattedAmount =
										ethers.utils.formatEther(amount);
									const truncatedSender = truncateString(
										from,
										25
									);
									return (
										<div key={timestamp}>
											<div className="w-full flex flex-row justify-around">
												<a
													href={`https://mumbai.polygonscan.com/address/${from}`}
													target="_blank"
												>
													<div className="overflow-x-hidden w-[100px] cursor-pointer">
														{truncatedSender}
													</div>
												</a>
												<div className="cursor-pointer w-[100px]">
													{formattedAmount} MATIC
												</div>
												<div>{timestamp}</div>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>
				<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[30px] lg:w-[620px]  sm:p-10 p-4 mx-5 h-96 shrink">
					<h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
						Executed Donations
					</h1>
					<div className="overflow-y-scroll overflow-x-hidden mt-2 w-full">
						<div className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]  h-[32rem] text-left w-full">
							<div className="w-full flex flex-row justify-around my-5">
								<div>Proposal Id</div>
								<div className="w-[80px]">Reciever</div>
								<div className="w-[83px]">Amount</div>
							</div>
							{executedProposals &&
								executedProposals.executedProposals.map(
									(rFund) => {
										const { reciever, amount, proposalId } =
											rFund;
										const formattedAmount =
											ethers.utils.formatEther(amount);
										const truncatedSender = truncateString(
											reciever,
											25
										);
										return (
											<div key={timestamp}>
												<div className="w-full flex flex-row justify-around">
													<div>{proposalId}</div>
													<a
														href={`https://mumbai.polygonscan.com/address/${from}`}
														target="_blank"
													>
														<div className="overflow-x-hidden w-[100px] cursor-pointer">
															{truncatedSender}
														</div>
													</a>
													<div className="cursor-pointer w-[100px] ">
														{formattedAmount} MATIC
													</div>
												</div>
											</div>
										);
									}
								)}
						</div>
					</div>
				</div>
			</div>
			<div className="bg-[#1c1c24] flex items-center rounded-[30px] sm:p-10 p-4 mx-5 h-[250px] shrink">
				<div className="w-full flex flex-col justify-start">
					<h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white mt-7">
						Proposed Donations
					</h1>
					<div className="overflow-y-scroll h-[150px]">
						<div className="font-epilogue font-medium sm:text-[20px] text-[15px]  text-white w-full mt-5 flex flex-row justify-between">
							<h1 className="ml-[10px]">Proposal Id</h1>
							<h1 className="">Reciever</h1>
							<h1>Amount</h1>
							<div className="w-[100px]"></div>
						</div>
						{activeProposals &&
							activeProposals.activeProposals.map((proposal) => {
								const { proposalId, amount, reciever } =
									proposal;
								console.log(proposalId, amount, reciever);
								const formattedAmount =
									ethers.utils.formatEther(amount);
								const truncatedReciever = truncateString(
									reciever,
									20
								);

								return (
									<div
										key={proposalId}
										className="font-epilogue font-medium sm:text-[20px] text-[15px]  text-white w-full mt-5 flex flex-row justify-around"
									>
										<h1>{proposalId}</h1>
										<div className="w-[250px]">
											{truncatedReciever}
										</div>
										<div className="w-[150px]">
											{formattedAmount}{" "}MATIC
										</div>
										<CustomButton
											buttonType="submit"
											title="vote"
											styles="bg-[#1dc071]"
											handleClick={() => {
												handleNavigate(proposalId);
											}}
										/>
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
