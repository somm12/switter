import React, { useState } from "react";
import { authService } from "fbase";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import "style/auth.css";
import AuthForm from "components/AuthForm";
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    try {
      let provider;
      if (name === "google") {
        provider = new GoogleAuthProvider();
      } else if (name === "github") {
        provider = new GithubAuthProvider();
      }
      const data = await signInWithPopup(authService, provider);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="authWrapper">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <div className="socialLoginButtonWrapper">
        <button onClick={onSocialClick} name="google">
          Continue with Google <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github">
          Connect with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};

export default Auth;
