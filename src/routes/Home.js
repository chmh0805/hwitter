import Hweet from "components/Hweet";
import { dbService } from "fBase";
import React, { useEffect, useRef, useState } from "react";
import constant from "constants/variables.json";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Home = ({ userObject }) => {
	const [hweet, setHweet] = useState("");
	const [hweets, setHweets] = useState([]);
	const [attachmentURL, setAttachmentURL] = useState();
	const attachmentInput = useRef();

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
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.addDoc(dbService.collection(HWEETS_COLLECTION_NAME), {
			content: hweet,
			createTime: Date.now(),
			uid: userObject.uid,
		});
		setHweet("");
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setHweet(value);
	};
	const onFileChange = (event) => {
		const {
			target: { files },
		} = event;
		const targetFile = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			setAttachmentURL(finishedEvent.currentTarget.result);
		};
		reader.readAsDataURL(targetFile);
	};
	const onClearAttachmentClick = () => {
		setAttachmentURL(null);
		attachmentInput.current.value = "";
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
				<input
					type="file"
					accept="image/*"
					onChange={onFileChange}
					ref={attachmentInput}
				/>
				<input type="submit" value="Hweet" />
				{attachmentURL && (
					<div>
						<img src={attachmentURL} width={"50px"} height={"50px"} />
						<button onClick={onClearAttachmentClick}>Clear</button>
					</div>
				)}
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
