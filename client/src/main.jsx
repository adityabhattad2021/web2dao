import React from "react";
import { createRoot } from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import { StateContextProvider } from "./context";

const chainId = ChainId.Hardhat;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ThirdwebProvider desiredChainId={chainId}>
		<BrowserRouter>
			<StateContextProvider>
				<App />
			</StateContextProvider>
		</BrowserRouter>
	</ThirdwebProvider>
);
