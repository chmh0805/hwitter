import { authService } from "fBase";
import React, { useState } from "react";

const AuthForm = () => {
	const [error, setError] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
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
					email,
					password
				);
				console.log("newAccount", data);
			} else {
				// log in
				const data = await authService.signInWithEmailAndPassword(
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
		<>
			{" "}
			<form className="container" onSubmit={onSubmit}>
				<input
					className="authInput"
					type="email"
					name="email"
					placeholder="email"
					value={email}
					onChange={onChange}
					required
				/>
				<br />
				<input
					className="authInput"
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
					required
				/>
				<br />
				<input
					className="authInput authSubmit"
					type="submit"
					value={newAccount ? "Create Account" : "Sign In"}
				/>
				{error && <span className="authError">${error}</span>}
			</form>
			<span className="authSwitch" onClick={toggleAccount}>
				{newAccount ? "Sign in" : "Create Account"}
			</span>
		</>
	);
};

export default AuthForm;
