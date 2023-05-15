import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObject }) => {
	return (
		<nav>
			<ul className="navUl">
				<li>
					<Link to="/" style={{ marginRight: 10 }}>
						<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
					</Link>
				</li>
				<li>
					<Link
						to="/profile"
						style={{
							marginLeft: 10,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							fontSize: 12,
						}}
					>
						<FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
						<span style={{ marginTop: 10 }}>
							{userObject.displayName
								? `${userObject.displayName}의 Profile`
								: "Profile"}
						</span>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
