import { authService } from "fBase";
import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");

	const onChange = (e) => {
		const {
			target: { name, value },
		} = e;
		if (name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			if (newAccount) {
				// create Account
				const data = await authService.createUserWithEmailAndPassword(
					authService.auth,
					email,
					password
				);
				console.log("newAccount", data);
			} else {
				// log in
				const data = await authService.signInWithEmailAndPassword(
					authService.auth,
					email,
					password
				);
				console.log(data);
			}
		} catch (e) {
			// console.log(e);
			setError(e.message);
		}
	};

	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					placeholder="email"
					value={email}
					onChange={onChange}
					required
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
					required
				/>
				<br />
				<input
					type="submit"
					value={newAccount ? "Create Account" : "Sign In"}
				/>
			</form>
			<div>
				<button>Continue With Google</button>
				<br />
				<button>Continue With Github</button>
				{error ? <p>${error}</p> : ""}
			</div>
			<span onClick={toggleAccount}>
				{newAccount ? "Sign in" : "Create Account"}
			</span>
		</div>
	);
};
export default Auth;
