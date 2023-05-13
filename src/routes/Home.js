import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [hweet, setHweet] = useState("");
	const [hweets, setHweets] = useState([]);
	const initHweets = async () => {
		const tempHweets = [];
		const dbHweets = await dbService.getDocs(
			dbService.collection(dbService.firestore, "hweets")
		);
		dbHweets.forEach((document) => {
			const hweetObject = {
				...document.data(),
				id: document.id,
			};
			tempHweets.unshift(hweetObject);
		});
		console.log(tempHweets);
		setHweets(tempHweets);
	};
	useEffect(() => {
		initHweets();
	}, []);
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.addDoc(
			dbService.collection(dbService.firestore, "hweets"),
			{
				hweet,
				createTime: Date.now(),
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
				{hweets.map((hweet) => {
					return (
						<div key={hweet.id}>
							<h4>{hweet.hweet}</h4>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default Home;
