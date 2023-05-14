import { authService, dbService } from "fBase";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import constant from "constants/variables.json";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Profile = ({ userObject }) => {
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

	useEffect(() => {
		getOwnHweets();
	}, []);
	return (
		<>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};
export default Profile;
