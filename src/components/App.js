import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
	const [init, setInit] = useState(false);
	const [userObject, setUserObject] = useState();

	const refreshUser = () => {
		const currentUser = authService.currentUser();
		setUserObject({
			...userObject,
			displayName: currentUser.displayName,
		});
	};

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setUserObject({
					uid: user.uid,
					displayName: user.displayName,
					// email: user.email,
				});
			} else {
				setUserObject(null);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter
					isLoggedIn={Boolean(userObject)}
					userObject={userObject}
					refreshUser={refreshUser}
				/>
			) : (
				"Initializing..."
			)}
			<footer>&copy; {new Date().getFullYear()} Hwitter</footer>
		</>
	);
}

export default App;