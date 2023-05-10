import React, { useState } from "react";

const Auth = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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

	const onSubmit = (e) => {
		e.preventDefault();
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
				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={onChange}
					required
				/>
				<input type="submit" value="Log In" />
			</form>
			<div>
				<button>Continue With Google</button>
				<button>Continue With Github</button>
			</div>
		</div>
	);
};
export default Auth;
