import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { dbService } from "fbase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import "style/profile.css";
const Profile = ({ userObj, refreshCurrentUser }) => {
  const [displayName, setDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();
  const onClickLogOut = () => {
    signOut(authService);
    navigate("/");
  };
  const getMySweet = () => {
    const q = query(
      collection(dbService, "sweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const mySweetArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      console.log(mySweetArr);
    });
  };
  useEffect(() => {
    getMySweet();
  }, []);

  const onSubmitDisplayName = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== displayName) {
      await updateProfile(authService.currentUser, {
        displayName: displayName,
      }).catch((error) => {
        // An error occurred
        console.log(error);
        // ...
      });
      refreshCurrentUser();
      setDisplayName("");
    }
  };
  const onChangeDisplayName = (event) => {
    const {
      target: { value },
    } = event;
    setDisplayName(value);
  };

  useEffect(() => {
    setDisplayName(userObj.displayName);
  }, [userObj]);
  return (
    <div className="profileWrapper">
      <form onSubmit={onSubmitDisplayName}>
        <input
          className="userName"
          type="text"
          value={displayName}
          onChange={onChangeDisplayName}
        />
        <input
          className="updateProfileButton"
          type="submit"
          value="updateName"
        />
      </form>
      <button className="loginOutButton" onClick={onClickLogOut}>
        LogOut
      </button>
      ;
    </div>
  );
};
export default Profile;
