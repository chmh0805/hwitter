import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTwitter,
	faGoogle,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { authService } from "fBase";

const Auth = () => {
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
		<div className="authContainer">
			<FontAwesomeIcon
				icon={faTwitter}
				color={"#04AAFF"}
				size="3x"
				style={{ marginBottom: "30px" }}
			/>
			<AuthForm />
			<div className="authBtns">
				<button className="authBtn" name="google" onClick={onSocialClick}>
					Continue With Google <FontAwesomeIcon icon={faGoogle} />
				</button>
				<br />
				<button className="authBtn" name="github" onClick={onSocialClick}>
					Continue With Github <FontAwesomeIcon icon={faGithub} />
				</button>
			</div>
		</div>
	);
};
export default Auth;
