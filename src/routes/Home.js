import Hweet from "components/Hweet";
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import constant from "constants/variables.json";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Home = ({ userObject }) => {
	const [hweet, setHweet] = useState("");
	const [hweets, setHweets] = useState([]);
	useEffect(() => {
		const queryOrderByCreateTimeDesc = dbService.query(
			dbService.collection(dbService.firestore, HWEETS_COLLECTION_NAME),
			dbService.orderBy("createTime", "desc")
		);

		const dbListener = dbService.onSnapshot(
			queryOrderByCreateTimeDesc,
			dbService.collection(dbService.firestore, HWEETS_COLLECTION_NAME),
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
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.addDoc(
			dbService.collection(dbService.firestore, HWEETS_COLLECTION_NAME),
			{
				content: hweet,
				createTime: Date.now(),
				uid: userObject.uid,
			}
		);
		setHweet("");
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setHweet(value);
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					value={hweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input type="submit" value="Hweet" />
			</form>
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
