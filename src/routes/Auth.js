import React, { useState } from "react";
import { authService } from "fbase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      let data;
      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          value={email}
          onChange={onChange}
          placeholder="id"
          required
        />
        <input
          name="password"
          type="password"
          value={password}
          onChange={onChange}
          placeholder="password"
          required
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
        />
      </form>
      {error}
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button>Connect with Google</button>
        <button>Connect with Github</button>
      </div>
    </div>
  );
};

export default Auth;
