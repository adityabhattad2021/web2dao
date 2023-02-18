import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CustomButton } from "../components";
import { useStateContext } from "../context";
import { navLinks } from "../constants";
import { useArcanaAuth } from "../arcana/useArcanaAuth";

function Navbar() {
	const { address } = useStateContext();
	const { user, connect, provider } = useArcanaAuth();

	async function onConnectClick() {
		try {
			await connect();
		} catch (e) {
			console.log(e);
		}
	}

	function onConnect() {
		console.log("connected");
	}


	useEffect(() => {
		// provider.on("connect", onConnect);
		return () => {
			provider.removeListener("connect", onConnect);
		};
	}, [provider]);

	return (
		<div className="bg-[#1c1c24] h-[10vh] flex flex-row mb-[35px] gap-6 justify-between mt-[35px] ml-[20px] mr-[20px] rounded-[30px]">
			<div className="flex flex-row gap-2">
				<Link to={"/"}>
					<div className="w-[150px] h-[10vh] cursor-pointer flex justify-center items-center ml-6">
						<h1 className="font-epilogue text-white font-bold mt-[2px] text-2xl">
							Web2DAO
						</h1>
					</div>
				</Link>
				<div className="flex flex-row justify-center items-center gap-3">
					{navLinks.map((link) => (
						<Link key={link.name} to={link.link}>
							<h1 className="font-epilogue text-white font-normal mt-[2px] text-md">
								{link.name}
							</h1>
						</Link>
					))}
				</div>
			</div>
			<div className="flex justify-center items-center rounded-[30px] bg-[#1dc071] w-[200px] p-2">
				<CustomButton
					buttonType="button"
					title={user ? "Connected" : "Connect"}
					styles="text-lg text-center"
					handleClick={() => {
						onConnectClick();
					}}
				/>
			</div>
		</div>
	);
}

export default Navbar;
