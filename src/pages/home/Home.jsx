import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = (props) => {
  const nav = useNavigate();
  useEffect(() => {
    nav("/login");
  }, []);
  return <div className={styles["container"]}></div>;
};

export default Home;
