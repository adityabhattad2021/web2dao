import React from "react";
import { CustomButton } from "../components";
import { useStateContext } from "../context";


function Mint(){

    const {mintNFT} = useStateContext();

    async function handleClick(){
        await mintNFT()
    }

    return (
        <div className="flex justify-center items-center mt-[200px]">
            <CustomButton
                buttonType="button"
                title="Mint"
                styles="w-[200px] bg-[#4acd8d]"
                handleClick={handleClick}
            />
        </div>
    )
}


export default Mint;