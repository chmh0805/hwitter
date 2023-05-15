import { authService, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import constant from "constants/variables.json";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Profile = ({ userObject, refreshUser }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	const getOwnHweets = async () => {
		const query = dbService.query(
			dbService.collection(HWEETS_COLLECTION_NAME),
			dbService.where("uid", "==", userObject.uid),
			dbService.orderBy("createTime", "desc")
		);

		const hweets = await dbService.getDocs(query);
		console.log(hweets.docs.map((doc) => doc.data()));
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewDisplayName(value);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		if (userObject.displayName !== newDisplayName) {
			await authService.updateProfile({ displayName: newDisplayName });
			refreshUser();
		}
	};

	useEffect(() => {
		getOwnHweets();
	}, []);
	return (
		<div className="container">
			<form className="profileForm" onSubmit={onSubmit}>
				<input
					className="formInput"
					type="text"
					placeholder="Display Name"
					onChange={onChange}
					value={newDisplayName}
					autoFocus
				/>
				<input className="formBtn" type="submit" value="Update Profile" />
			</form>
			<span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
				Log Out
			</span>
		</div>
	);
};
export default Profile;
