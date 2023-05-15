import { dbService, storageService } from "fBase";
import React, { useState } from "react";
import constant from "constants/variables.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
		<div className="hweet">
			{isEditing ? (
				<>
					{isOwner ? (
						<>
							<form className="container hweetEdit" onSubmit={onSubmit}>
								<input
									className="formInput"
									type="text"
									placeholder="Editing..."
									value={newContent}
									onChange={onChange}
									autoFocus
									required
								/>
								<input className="formBtn" type="submit" value="Update Hweet" />
							</form>
							<span className="formBtn cancelBtn" onClick={toggleEditing}>
								Cancel
							</span>
						</>
					) : (
						<h1>Invalid Access.</h1>
					)}
				</>
			) : (
				<>
					<h4>{hweetObject.content}</h4>
					{hweetObject.attachmentURL && (
						<img src={hweetObject.attachmentURL} alt="attachment" />
					)}
					{isOwner && (
						<div className="hweet__actions">
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Hweet;
