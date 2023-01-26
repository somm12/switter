import React from "react";
import { authService } from "fbase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const onClickLogOut = () => {
    signOut(authService);
    navigate("/");
  };
  return <button onClick={onClickLogOut}>LogOut</button>;
};
export default Profile;
