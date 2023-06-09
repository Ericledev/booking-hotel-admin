import LoginForm from "../../components/login-form/login-form";
import NavBar from "../home/navbar/NavBar";
import classes from "../login/login.module.css";
import useHTTP from "../../custom-hook/http";
import signupRequest from "../../api/signup";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const { status, data, sendRequest } = useHTTP(signupRequest);
  const nav = useNavigate();

  useEffect(() => {
    if (data && data.exist === true) {
      alert("This user is existed. Please try with other email.");
    } else if (data && data.exist === false) {
      alert("Adding user is completed");
      nav("/login");
    }
  }, [data]);

  const submitHandler = (email, password) => {
    sendRequest({ email, password });
  };
  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <h1>Sign Up</h1>
        <LoginForm submit={submitHandler} text="Create Account" />
        {status === "pending" && <h4>Sending...</h4>}
      </div>
    </>
  );
};
export default Signup;
