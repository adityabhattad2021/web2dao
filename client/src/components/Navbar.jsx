import React from "react";
import {CustomButton} from "../components";
import { useStateContext } from "../context";


function Navbar() {

	const {address,connect}=useStateContext();

	return (
		<div className="bg-[#2c2f32] h-[10vh] flex flex-row mb-[35px] gap-6 justify-between mt-[35px] ml-[20px] mr-[20px] rounded-[30px]">
			<div className="w-[150px] h-[10vh] cursor-pointer flex justify-center items-center">
				<h1 className="font-epilogue text-white font-medium mt-[2px] text-2xl">
					Web2DAO
				</h1>
			</div>
			<div className="justify-end rounded-[30px] bg-[#4acd8d] w-[250px] p-2">
				<CustomButton
					buttonType="button"
					title={address ? "Connected" :"Connect"}
					handleClick={()=>{
						connect();
					}}
				/>
			</div>
		</div>
	);
}

export default Navbar;
