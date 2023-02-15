import React from "react";
import { CustomButton } from "../components";

function Dashboard() {
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
								<th>Senders Address</th>
								<th>Amount</th>
								<th>Time</th>
							</div>
							<div className="w-full flex flex-row justify-around">
								<th>Senders Address</th>
								<th>Amount</th>
								<th>Time</th>
							</div>
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
								<th>Senders Address</th>
								<th>Amount</th>
								<th>Time</th>
							</div>
							<div className="w-full flex flex-row justify-around">
								<th>Senders Address</th>
								<th>Amount</th>
								<th>Time</th>
							</div>
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
                        <div className="font-epilogue font-medium sm:text-[20px] text-[15px]  text-white w-full mt-5 flex flex-row justify-around">
                            <h1>
                                Proposal Id
                            </h1>
                            <h1>
                                Proposal Description
                            </h1>
                            <div className="w-[350px]">

                            </div>
                        </div>
                        <div className="font-epilogue font-medium sm:text-[20px] text-[15px]  text-white w-full mt-5 flex flex-row justify-around">
                            <h1>
                                1
                            </h1>
                            <div className="w-[400px]">
                                Proposal Description Proposal Description...
                            </div>
                            <CustomButton
                                buttonType="submit"
                                title="vote"
                                styles="bg-[#1dc071] w-[150px]"
                            />
                        </div>
                        <div className="font-epilogue font-medium sm:text-[20px] text-[15px]  text-white w-full mt-5 flex flex-row justify-around">
                            <h1>
                                1
                            </h1>
                            <div className="w-[400px]">
                                Proposal Description Proposal Description...
                            </div>
                            <CustomButton
                                buttonType="submit"
                                title="vote"
                                styles="bg-[#1dc071] w-[150px]"
                            />
                        </div>
                    </div>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
