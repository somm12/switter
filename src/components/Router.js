import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import "style/router.css";
const AppRouter = ({ isLoggedIn, userObj, refreshCurrentUser }) => {
  return (
    <>
      <div className="screenWrapper">
        {isLoggedIn && <Navigation userObj={userObj} />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/" element={<Home userObj={userObj} />} />
              <Route
                exact
                path="/profile"
                element={
                  <Profile
                    userObj={userObj}
                    refreshCurrentUser={refreshCurrentUser}
                  />
                }
              />
            </>
          ) : (
            <Route exact path="/" element={<Auth />} />
          )}
        </Routes>
      </div>
    </>
  );
};
export default AppRouter;
