import React from "react";
import {CustomButton} from "../components";
import { useStateContext } from "../context";


function Navbar() {

	const {address,connect}=useStateContext();

	return (
		<div className="bg-[#1c1c24] h-[10vh] flex flex-row mb-[35px] gap-6 justify-between mt-[35px] ml-[20px] mr-[20px] rounded-[30px]">
			<div className="w-[150px] h-[10vh] cursor-pointer flex justify-center items-center ml-6">
				<h1 className="font-epilogue text-white font-bold mt-[2px] text-2xl">
					Web2DAO
				</h1>
			</div>
			<div className="flex justify-center items-center rounded-[30px] bg-[#1dc071] w-[200px] p-2">
				<CustomButton
					buttonType="button"
					title={address ? "Connected" :"Connect"}
					styles="text-lg text-center"
					handleClick={()=>{
						connect();
					}}
				/>
			</div>
		</div>
	);
}

export default Navbar;
