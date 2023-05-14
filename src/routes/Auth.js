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
	const onSocialClick = async (event) => {
		const {
			target: { name },
		} = event;
		let provider;
		if (name === "google") {
			provider = new authService.GoogleAuthProvider();
		} else if (name === "github") {
			provider = new authService.GithubAuthProvider();
		}

		const data = await authService.signInWithPopup(provider);
		console.log(data);
	};

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
				<button name="google" onClick={onSocialClick}>
					Continue With Google
				</button>
				<br />
				<button name="github" onClick={onSocialClick}>
					Continue With Github
				</button>
				{error ? <p>${error}</p> : ""}
			</div>
			<span onClick={toggleAccount}>
				{newAccount ? "Sign in" : "Create Account"}
			</span>
		</div>
	);
};
export default Auth;
