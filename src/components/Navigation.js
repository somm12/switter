import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => (
  <>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj.displayName}'s profile</Link>
      </li>
    </ul>
  </>
);

export default Navigation;
