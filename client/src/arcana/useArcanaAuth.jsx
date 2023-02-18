import React, {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

const AuthContext = createContext();

function ProvideAuth({ children, provider }) {
	const auth = useProvideAuth(provider);
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useProvideAuth(auth) {
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [availableLogins, setAvailableLogins] = useState([]);
	const [user, setUser] = useState(null);
	const providerRef = useRef(auth.provider);

	async function loginWithSocial(socialOption) {
		await auth.init();
		await auth.loginWithSocial(socialOption);
	}

	async function loginWithLink(email) {
		await auth.init();
		return auth.loginWithLink(email);
	}

	async function logout() {
		if (await auth.isLoggedIn()) {
			await auth.logout();
		}
	}

	async function connect() {
		return await auth.connect();
	}

	async function onConnectHook() {
		setIsLoggedIn(true);
		const info = await auth.getUser();
		setUser(info);
	}

	async function onDisconnectHook() {
		setIsLoggedIn(false);
	}

	useEffect(() => {
		auth.provider.on("connect", onConnectHook);
		auth.provider.on("diconnect", onDisconnectHook);
		auth.init().then(() => {
			setIsLoading(false);
			auth.isLoggedIn().then((loggedIn) => {
				if (!loggedIn) {
					auth.getLogins().then((logins) => {
						console.log({ logins });
						setAvailableLogins(logins);
					});
				}
				setIsLoggedIn(loggedIn);
			});
		});
		return () => {
			auth.provider.removeListner("connect", onConnectHook);
			auth.provider.removeListner("disconnect", onDisconnectHook);
		};
	}, []);

	return {
		availableLogins,
		isLoading,
		loginWithLink,
		loginWithSocial,
		logout,
		provider: providerRef.current,
		isLoggedIn,
		user,
		appId: auth.appId,
		connect,
	};
}

function useArcanaAuth() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("UseAuth hook must be used");
	}
	return context;
}

export { useArcanaAuth, ProvideAuth };
