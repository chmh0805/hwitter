import { dbService, storageService } from "fBase";
import React, { useRef, useState } from "react";
import { v4 } from "uuid";
import constant from "constants/variables.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const HweetFactory = ({ userObject }) => {
	const [hweet, setHweet] = useState("");
	const [attachmentURL, setAttachmentURL] = useState();
	const attachmentInput = useRef();

	const onSubmit = async (event) => {
		if (hweet === "") {
			return;
		}
		event.preventDefault();
		let storageURL;
		if (attachmentURL) {
			const UUID = v4(Date.now());
			const storageRef = storageService.ref(`${userObject.uid}/${UUID}`);
			const response = await storageService.uploadString(
				storageRef,
				attachmentURL,
				"data_url"
			);
			storageURL = await storageService.getDownloadURL(response.ref);
		}
		const uploadDoc = {
			content: hweet,
			createTime: Date.now(),
			uid: userObject.uid,
		};
		if (storageURL) uploadDoc["attachmentURL"] = storageURL;
		await dbService.addDoc(
			dbService.collection(HWEETS_COLLECTION_NAME),
			uploadDoc
		);
		setHweet("");
		clearAttachment();
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
		if (targetFile) {
			const reader = new FileReader();
			reader.onloadend = (finishedEvent) => {
				setAttachmentURL(finishedEvent.currentTarget.result);
			};
			reader.readAsDataURL(targetFile);
		} else {
			clearAttachment();
		}
	};
	const clearAttachment = () => {
		setAttachmentURL(null);
		attachmentInput.current.value = "";
	};
	return (
		<form className="factoryForm" onSubmit={onSubmit}>
			<div className="factoryInput__container">
				<input
					className="factoryInput__input"
					value={hweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
				<input className="factoryInput__arrow" type="submit" value="&rarr;" />
			</div>
			<label htmlFor="attach-file" className="factoryInput__label">
				<span>Add Photos</span>
				<FontAwesomeIcon icon={faPlus} />
			</label>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				ref={attachmentInput}
				style={{ opacity: 0 }}
			/>
			{attachmentURL && (
				<div className="factoryForm__attachment">
					<img
						src={attachmentURL}
						alt="attachment"
						style={{
							backgroundImage: attachmentURL,
						}}
					/>
					<div className="factoryForm__clear" onClick={clearAttachment}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
			)}
		</form>
	);
};

export default HweetFactory;
