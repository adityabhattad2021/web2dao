import React, { useState } from "react";
import { CustomButton, FormField, Loader } from "../components";
import { useStateContext } from "../context";

const initialFormData = {
	donationAddress: "",
	donationAmount: "",
	donationReason: "",
};

function Propose() {
	const [formData, setFormData] = useState(initialFormData);
	const [isLoading, setIsLoading] = useState(false);

	const { donateProposal } = useStateContext();

	async function handleSubmit(e) {
		e.preventDefault();
		setIsLoading(true);
		await donateProposal(formData);
		setIsLoading(false);
	}

	function handleFormFieldChange(fieldName, e) {
		setFormData({ ...formData, [fieldName]: e.target.value });
	}

	return (
		<div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[30px] sm:p-10 p-4 mx-5">
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
						<h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">
							Propose a donation
						</h1>
					</div>
					<form
						onSubmit={handleSubmit}
						className="w-full mt-[65px] flex flex-col gap-[30px]"
					>
						<div className="flex flex-col gap-[40px]">
							<div className="flex flex-wrap gap-[40px]">
								<FormField
									labelName="Donation Address *"
									placeholder="0x0000000"
									inputType="text"
									value={formData.donationAddress}
									handleChange={(e) => {
										handleFormFieldChange(
											"donationAddress",
											e
										);
									}}
								/>
								<FormField
									labelName="Donation Amount *"
									placeholder="1.00 MATIC"
									inputType="number"
									value={formData.donationAmount}
									handleChange={(e) => {
										handleFormFieldChange(
											"donationAmount",
											e
										);
									}}
								/>
							</div>
							<FormField
								labelName="Donation Reason *"
								placeholder="Why is this donation needed?"
								isTextArea
								value={formData.donationReason}
								handleChange={(e) => {
									handleFormFieldChange("donationReason", e);
								}}
							/>
						</div>
						<div className="flex justify-center items-center mt-[40px]">
							<CustomButton
								buttonType="submit"
								title="Propose Donation"
								styles="bg-[#1dc071]"
							/>
						</div>
					</form>
				</>
			)}
		</div>
	);
}

export default Propose;
