import AuthForm from "components/AuthForm";
import { authService } from "fBase";
import React, { useState } from "react";

const Auth = () => {
	const [error, setError] = useState("");

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
			<AuthForm setError={setError} />
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
		</div>
	);
};
export default Auth;
