import React from "react";
import {
	HashRouter as Router,
	Route,
	Switch,
} from "react-router-dom/cjs/react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn, userObject }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObject={userObject} />}
			<Switch>
				{isLoggedIn ? (
					<>
						<Route exact path="/">
							<Home userObject={userObject} />
						</Route>
						<Route exact path="/profile">
							<Profile userObject={userObject} />
						</Route>
					</>
				) : (
					<Route exact path="/">
						<Auth />
					</Route>
				)}
			</Switch>
		</Router>
	);
};
export default AppRouter;
