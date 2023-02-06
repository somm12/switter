import React, { useState } from "react";
import { dbService } from "fbase";
import { v4 as uuid } from "uuid";
import { storageService } from "fbase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import "style/sweetFactory.css";

const SweetFactory = ({ userObj }) => {
  const [sweet, setSweet] = useState("");
  const [fileAttachment, setFileAttachment] = useState("");
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (sweet === "") {
      return;
    }
    let fileAttachmentURL = "";
    if (fileAttachment !== "") {
      const fileRef = ref(storageService, `${userObj.uid}/${uuid()}`);
      const response = await uploadString(fileRef, fileAttachment, "data_url");
      fileAttachmentURL = await getDownloadURL(response.ref);
    }

    try {
      const docRef = await addDoc(collection(dbService, "sweets"), {
        text: sweet,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        fileAttachmentURL,
      });
      console.log(docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
    setSweet("");
    setFileAttachment("");
  };
  const onFileChange = (event) => {
    console.log(event);
    const {
      target: { files },
    } = event;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = (file) => {
      const {
        currentTarget: { result },
      } = file;
      setFileAttachment(result);
    };
    reader.readAsDataURL(file);
  };
  const onClickClearAttachment = () => setFileAttachment("");
  return (
    <form className="sweetForm" onSubmit={onSubmit}>
      <div className="createSweetWrapper">
        <input
          className="sweetInput"
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInputArrow" />
      </div>

      <div className="addFileWrapper">
        <label for="attach-file" className="factoryInputForFileLabel">
          <span>Add photos</span>
          <FontAwesomeIcon icon={faPlus} />
        </label>
        <input
          className="inputFile"
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
        />

        {fileAttachment && (
          <div className="previewWrapper">
            <img src={fileAttachment} width="80px" height="80px" />
            <button className="clearButton" onClick={onClickClearAttachment}>
              Remove
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
export default SweetFactory;
