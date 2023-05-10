import { useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fBase";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.auth.currentUser);
	return (
		<>
			<AppRouter isLoggedIn={isLoggedIn} />
			<footer>&copy; {new Date().getFullYear()} Hwitter</footer>
		</>
	);
}

export default App;
