import React from "react";
import { createRoot } from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import { StateContextProvider } from "./context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const chainId = ChainId.Mumbai;

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://api.thegraph.com/subgraphs/name/adityabhattad2021/donator-subgraphv5",
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ThirdwebProvider desiredChainId={chainId}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<StateContextProvider>
					<App />
				</StateContextProvider>
			</BrowserRouter>
		</ApolloProvider>
	</ThirdwebProvider>
);
