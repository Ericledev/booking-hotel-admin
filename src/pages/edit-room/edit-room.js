import styles from "./edit-room.module.css";
import HTTP from "../../custom-hook/http";
import { postUpdateRoom } from "../../api/room";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import InputFormAddRoom from "../../components/input-form/input-form-add-room";
import RoomContext from "../../store/roomContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const EditRoom = () => {
  const { data, error, status, sendRequest } = HTTP(postUpdateRoom);
  const nav = useNavigate();
  const ctxRoom = useContext(RoomContext);
  const alert = "The room number is existed, please try enter another number";

  // request is succeed, direct to room list
  if (status === "completed" && data.message === "ok") {
    nav("/room");
    return;
  }

  const submitHandler = (dataInput) => {
    // console.log("CHECK DATAINPUT: ", dataInput);
    ctxRoom.setRoomEdit({ ...dataInput, _id: dataInput.roomId });
    sendRequest(dataInput);
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
            <div className={styles["transaction"]}>Edit Room</div>
            <div className={styles["transaction"]}>
              <InputFormAddRoom
                onSubmit={submitHandler}
                data={ctxRoom.roomEdit}
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
export default EditRoom;
