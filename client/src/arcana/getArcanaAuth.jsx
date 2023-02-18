import { AuthProvider, CHAIN } from '@arcana/auth'


const auth = new AuthProvider(import.meta.env.VITE_ARCANA_APP_ID, {
	theme:"light",
	network:"mainnet",
	chainConfig:{
		chainId:CHAIN.POLYGON_MUMBAI_TESTNET,
		rpcUrl:import.meta.env.VITE_POLYGON_RPC_URL
	}
});


function getAuth() {
	return auth;
}

export { getAuth };
