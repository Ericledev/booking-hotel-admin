import { useEffect } from "react";
import { useState } from "react";
import verifyExpire from "../api/verify_expire.js";
import AuthContext from "./authConext.js";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // verify expires
    verifyExpire().then((data) => {
      if (data.message === "Invalid Token") {
        logoutHandler();
        return;
      }
    });
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      setIsLoggedIn(true);
      setUser(userStorage);
    }
  }, []);
  const loginHandler = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logoutHandler = () => {
    try {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.clear();
    } catch (error) {
      console.log("CHECK ERROR: ", error);
    }
  };
  // if user or pass is wrong
  const setUserHandler = () => {
    setUser({ ok: false });
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        onLogin: loginHandler,
        onSetUserFail: setUserHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
