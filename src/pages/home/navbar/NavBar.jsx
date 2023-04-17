import React from "react";
import styles from "./NavBar.module.css";

import { useContext } from "react";
import AuthContext from "../../../store/authConext";
import { useNavigate } from "react-router-dom";

// Create NavBar component
const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const { user, isLoggedIn, onLogout } = authCtx;

  const nav = useNavigate();
  const loginHandler = () => {
    nav("/login");
  };
  const logoutHandler = () => {
    nav("/");
    onLogout();
  };
  const signupHandler = () => {
    nav("/signup");
  };

  return (
    // Render header of navbar, Booking website & button
    <div className={styles["nav-container"]}>
      <div className={styles["nav-head"]}>
        <div className={styles.title}>
          <label className={styles["booking-website"]}>
            Admin - Booking website
          </label>
        </div>
        <div className={styles.btns}>
          {isLoggedIn ? <label>{user.email}</label> : ""}
          {!isLoggedIn && (
            <button className={styles.register} onClick={signupHandler}>
              Sign up
            </button>
          )}
          {isLoggedIn && (
            <button className={styles.login} onClick={logoutHandler}>
              Logout
            </button>
          )}
          {!isLoggedIn && (
            <button className={styles.login} onClick={loginHandler}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(NavBar);
