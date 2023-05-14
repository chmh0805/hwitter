import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import constant from "constants/variables.json";

const HWEETS_COLLECTION_NAME = constant.HWEETS_COLLECTION_NAME;

const Hweet = ({ hweetObject, isOwner }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newContent, setNewContent] = useState(hweetObject.content);
	const targetRef = dbService.doc(HWEETS_COLLECTION_NAME, hweetObject.id);

	const onDeleteClick = async () => {
		const isConfirmed = window.confirm("Are you sure?");
		if (isConfirmed) {
			await dbService.deleteDoc(targetRef);
			if (hweetObject.attachmentURL) {
				await storageService.deleteObject(
					storageService.ref(hweetObject.attachmentURL)
				);
			}
		}
	};
	const toggleEditing = () => {
		setNewContent(hweetObject.content);
		setIsEditing((prev) => !prev);
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		await dbService.updateDoc(targetRef, { content: newContent });
		setIsEditing(false);
	};
	const onChange = (event) => {
		const {
			target: { value },
		} = event;
		setNewContent(value);
	};
	return (
		<div>
			{isEditing ? (
				<>
					{isOwner ? (
						<>
							<form onSubmit={onSubmit}>
								<input
									type="text"
									placeholder="Editing..."
									value={newContent}
									onChange={onChange}
									required
								/>
								<input type="submit" value="Update Hweet" />
							</form>
							<button onClick={toggleEditing}>Cancel</button>
						</>
					) : (
						<h1>Invalid Access.</h1>
					)}
				</>
			) : (
				<>
					<h4>{hweetObject.content}</h4>
					{hweetObject.attachmentURL && (
						<img
							src={hweetObject.attachmentURL}
							alt="attachment"
							width={"50px"}
							height={"50px"}
						/>
					)}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete</button>
							<button onClick={toggleEditing}>Edit</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Hweet;
