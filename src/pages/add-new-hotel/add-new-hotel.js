import styles from "./add-new-hotel.module.css";
import HTTP from "../../custom-hook/http";
import { postAddNewHotel } from "../../api/hotel";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import InputFormAddHotel from "../../components/input-form/input-form-add-hotel";
import { useNavigate } from "react-router-dom";

const AddNewHotel = () => {
  const { error, status, sendRequest } = HTTP(postAddNewHotel);
  const nav = useNavigate();
  if (status === "completed") {
    nav("/hotel");
    return;
  }
  const submitHandler = (data) => {
    sendRequest(data);
  };
  return (
    <>
      {/* Show NavBar */}
      <NavBar />
      {/* Show table */}
      <div className={styles["detail-container"]}>
        <div className={styles["detail-content"]}>
          <div className={styles["header-left"]}>
            <span>Admin Page</span>
          </div>
          <div className={styles["header-right"]}></div>
          <div className={styles.menu}>
            <Menu />
          </div>

          <div className={styles.main}>
            <div className={styles["transaction"]}>Add New Product</div>
            <div className={styles["transaction"]}>
              <InputFormAddHotel onSubmit={submitHandler} />
              {status === "pending" && (
                <div className={styles.sending}>Sending...</div>
              )}
              {error && <div className={styles.error}>{error}</div>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddNewHotel;
