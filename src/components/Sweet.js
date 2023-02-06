import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import "style/sweet.css";
const Sweet = ({ sweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweet.text);
  const onDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this sweet?");
    if (ok) {
      await deleteDoc(doc(dbService, "sweets", `${sweet.id}`));
      await deleteObject(ref(storageService, `${sweet.fileAttachmentURL}`));
    }
  };
  const onEditToggle = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const newSweetRef = doc(dbService, "sweets", `${sweet.id}`);
    await updateDoc(newSweetRef, {
      text: newSweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewSweet(value);
  };
  const onCancel = () => setEditing(false);
  return (
    <div className="sweetWrapper">
      {editing ? (
        <>
          {isOwner && (
            <>
              <div className="editWrapper">
                <form onSubmit={onSubmit}>
                  <input
                    className="editInput"
                    type="text"
                    placeholder="Edit your Sweet"
                    value={newSweet}
                    onChange={onChange}
                  />
                  <input
                    className="updateButton"
                    type="submit"
                    value="Update Sweet"
                  />
                </form>
                <button className="editCancelButon" onClick={onCancel}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className="sweetListWrapper">
            <h3 className="name" key={sweet.id}>
              {sweet.name}
            </h3>
            <div className="sweetContentsWrapper">
              <div className="sweetContents">
                <h4 key={sweet.id}>{sweet.text}</h4>
              </div>

              {isOwner && (
                <>
                  <div className="updateSweetButtons">
                    <button onClick={onDelete}>
                      <FontAwesomeIcon size="1x" icon={faTrash} />
                    </button>
                    <button onClick={onEditToggle}>
                      <FontAwesomeIcon size="1x" icon={faPencilAlt} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="contentImage">
            {sweet.fileAttachmentURL && (
              <img src={sweet.fileAttachmentURL} width="50px" height="50px" />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sweet;
