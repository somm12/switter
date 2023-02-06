import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "style/navigation.css";
const Navigation = ({ userObj }) => (
  <>
    <ul className="navigationLinks">
      <li>
        <Link to="/">
          <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="2x"
            style={{ marginBottom: 30 }}
          />
        </Link>
      </li>
      <li>
        <Link to="/profile">
          <div className="profileLinkTextWrapper">
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            {userObj.displayName}'s profile
          </div>
        </Link>
      </li>
    </ul>
  </>
);

export default Navigation;
