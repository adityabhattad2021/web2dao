const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
require("dotenv").config();
const fs = require("fs");


module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    console.log(`------Deployer is ${deployer}------------`);


    const chainId = network.config.chainId;
    console.log(`------ChainId is ${chainId}------------`);
    log("----------------------------------------------------")
    log(`1) Deploying DonatorAccessToken...`);
    const donatorAccessToken = await deploy("DonatorAccess", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations:network.config.blokConfirmations || 1,
    });
    log("Successfully deployed DonatorAccessToken");
    log("----------------------------------------------------")
    
    
    log("----------------------------------------------------")
    log(`2) Deploying Donator...`);
    await deploy("Donator", {
        from: deployer,
        args: [donatorAccessToken.address],
        log: true,
        waitConfirmations:network.config.blokConfirmations || 1,
    });
    log("Successfully deployed Donator");
    log("----------------------------------------------------")

}


module.exports.tags = ["all"];