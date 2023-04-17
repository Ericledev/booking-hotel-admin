import styles from "./room.module.css";
import HTTP from "../../custom-hook/http";
import { useContext, useEffect, useState } from "react";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import { getAllRooms, postDeleteRoom } from "../../api/room";
import { useNavigate } from "react-router-dom";
import RoomContext from "../../store/roomContext";
import TableRoom from "../../components/table/table-room";

const Room = () => {
  // manage the id of room to delete
  const [roomIdDelete, setRoomIdDelete] = useState();
  // manage the list of room to show on page
  const [rooms, setRooms] = useState([]);
  const ctx = useContext(RoomContext);
  const nav = useNavigate();
  // manage the status when get list of room from DB to show on page
  const { data, error, status, sendRequest } = HTTP(getAllRooms);
  // manage the status when delete room from DB
  const {
    data: dataDel,
    error: errorDel,
    status: statusDel,
    sendRequest: sendRequestDel,
  } = HTTP(postDeleteRoom);

  // set list of rooms from db when get data is succeed
  useEffect(() => {
    if (data === null) sendRequest();
    if (data && data.message === "ok") setRooms([...data.rooms]);
  }, [sendRequest, data]);

  // check if delete is not succeed then alert to use else delete room from array
  useEffect(() => {
    if (statusDel === "completed" && dataDel.message === "delete fail") {
      alert("This room was used in transaction, can not delete!");
    } else if (statusDel === "completed" && dataDel.message === "ok") {
      setRooms((prv) => {
        let tempPrv = prv.filter((item) => item._id !== roomIdDelete);
        return [...tempPrv];
      });
    }
  }, [dataDel]);
  // Onclick add new room
  const addNewHandler = () => {
    nav("/room/add-new");
  };
  // onClick detete room
  const deleteHandler = (hotelId) => {
    sendRequestDel(hotelId);
    setRoomIdDelete(hotelId);
  };

  // onClick Edit room
  const editHandler = (room) => {
    ctx.setRoomEdit(room);
    nav("/room/edit");
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
          {status === "pending" && <div>Loading...</div>}
          {error && <div>{error}</div>}
          {data && data.message === "ok" && (
            <div className={styles.main}>
              <div className={styles["hotel"]}>
                <div className={styles["header-add-new"]}>
                  <h2>Room list</h2>
                  <div className={styles["add-new"]} onClick={addNewHandler}>
                    Add new
                  </div>
                </div>
                {/* <TableHotel rooms={data.rooms} onSubmit={deleteHandler} /> */}
                <TableRoom
                  rooms={rooms}
                  onSubmit={deleteHandler}
                  onEdit={editHandler}
                />
              </div>
            </div>
          )}
          {/* <Menu /> */}
        </div>
      </div>
    </>
  );
};
export default Room;
