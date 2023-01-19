import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  console.log(isLoggedIn);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..."}
      <footer>&copy; {new Date().getFullYear()} Switter</footer>
    </>
  );
};

export default App;
