import Hweet from "components/Hweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import constant from "constants/variables.json";
import HweetFactory from "components/HweetFactory";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Home = ({ userObject }) => {
	const [hweets, setHweets] = useState([]);

	useEffect(() => {
		const queryOrderByCreateTimeDesc = dbService.query(
			dbService.collection(HWEETS_COLLECTION_NAME),
			dbService.orderBy("createTime", "desc")
		);

		const dbListener = dbService.onSnapshot(
			queryOrderByCreateTimeDesc,
			dbService.collection(HWEETS_COLLECTION_NAME),
			(snapshot) => {
				const hweetArray = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setHweets(hweetArray);
			}
		);

		return () => dbListener();
	}, []);

	return (
		<div>
			<HweetFactory userObject={userObject} />
			<div>
				{hweets.map((hweet) => (
					<Hweet
						key={hweet.id}
						hweetObject={hweet}
						isOwner={hweet.uid === userObject.uid}
					/>
				))}
			</div>
		</div>
	);
};
export default Home;
