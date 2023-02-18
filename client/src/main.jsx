import React from "react";
import { createRoot } from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./main.css";
import { StateContextProvider } from "./context";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { getAuth } from "./arcana/getArcanaAuth";
import { ProvideAuth } from "./arcana/useArcanaAuth";

const chainId = ChainId.Mumbai;
const auth = getAuth();

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "https://api.thegraph.com/subgraphs/name/adityabhattad2021/donator-subgraphv6",
});

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<ThirdwebProvider desiredChainId={chainId}>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<ProvideAuth provider={auth}>
					<StateContextProvider>
						<App />
					</StateContextProvider>
				</ProvideAuth>
			</BrowserRouter>
		</ApolloProvider>
	</ThirdwebProvider>
);
