import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "fbase";
const Sweet = ({ sweet, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(null);
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
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  type="text"
                  placeholder="Edit your Sweet"
                  value={newSweet}
                  onChange={onChange}
                />
                <input type="submit" value="Update Sweet" />
              </form>
              <button onClick={onCancel}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <h4 key={sweet.id}>{sweet.text}</h4>
          {sweet.fileAttachmentURL && (
            <img src={sweet.fileAttachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDelete}>Delete</button>
              <button onClick={onEditToggle}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
