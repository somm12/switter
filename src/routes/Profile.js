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
  return (
    <div>
      <form onSubmit={onSubmitDisplayName}>
        <input type="text" value={displayName} onChange={onChangeDisplayName} />
        <input type="submit" value="updateName" />
      </form>
      <button onClick={onClickLogOut}>LogOut</button>;
    </div>
  );
};
export default Profile;
