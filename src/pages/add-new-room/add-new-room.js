import styles from "./add-new-room.module.css";
import HTTP from "../../custom-hook/http";
import { postAddNewRoom } from "../../api/room";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import { useNavigate } from "react-router-dom";
import InputFormAddRoom from "../../components/input-form/input-form-add-room";

const AddNewRoom = () => {
  const { data, error, status, sendRequest } = HTTP(postAddNewRoom);
  const nav = useNavigate();
  const alert = "The room number is existed, please try enter another number";

  if (status === "completed" && data.message === "ok") {
    nav("/room");
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
            <div className={styles["transaction"]}>Add New Room</div>
            <div className={styles["transaction"]}>
              <InputFormAddRoom
                onSubmit={submitHandler}
                alert={{
                  alertRoom:
                    data && data.message === "create fail" ? alert : "",
                }}
              />
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
export default AddNewRoom;
