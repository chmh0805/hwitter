import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObject, setUserObject] = useState();

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true);
				setUserObject({
					uid: user.uid,
					// displayName: user.displayName,
					// email: user.email,
				});
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		});
	}, []);

	return (
		<>
			{init ? (
				<AppRouter isLoggedIn={isLoggedIn} userObject={userObject} />
			) : (
				"Initializing..."
			)}
			<footer>&copy; {new Date().getFullYear()} Hwitter</footer>
		</>
	);
}

export default App;