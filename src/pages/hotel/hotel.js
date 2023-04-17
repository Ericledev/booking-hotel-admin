import styles from "./hotel.module.css";
import HTTP from "../../custom-hook/http";
import { useContext, useEffect, useState } from "react";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import TableHotel from "../../components/table/table-hotel";
import { getAllHotel, postDeleteHotel } from "../../api/hotel";
import { useNavigate } from "react-router-dom";
import HotelContext from "../../store/hotelContext";

const Hotel = () => {
  // manage the id of hotel to delete
  const [hotelIdDelete, setHotelIdDelete] = useState();
  // manage the list of hotel to show on page
  const [hotels, setHotels] = useState([]);
  const ctx = useContext(HotelContext);
  const nav = useNavigate();
  // manage the status when get list of hotel from DB to show on page
  const { data, error, status, sendRequest } = HTTP(getAllHotel);
  // manage the status when delete hotel from DB
  const {
    data: dataDel,
    error: errorDel,
    status: statusDel,
    sendRequest: sendRequestDel,
  } = HTTP(postDeleteHotel);

  // set list of hotels from db when get data is succeed
  useEffect(() => {
    if (data === null) sendRequest();
    if (data && data.message === "ok") setHotels([...data.hotels]);
  }, [sendRequest, data]);

  // check if delete is not succeed then alert to use else delete hotel from array
  useEffect(() => {
    if (statusDel === "completed" && dataDel.message === "delete fail") {
      alert("This hotel was used in transaction, can not delete!");
    } else if (statusDel === "completed" && dataDel.message === "ok") {
      setHotels((prv) => {
        let tempPrv = prv.filter((item) => item._id !== hotelIdDelete);
        return [...tempPrv];
      });
    }
  }, [dataDel]);
  // Onclick add new hotel
  const addNewHandler = () => {
    nav("/hotel/add-new");
  };
  // onClick detete hotel
  const deleteHandler = (hotelId) => {
    sendRequestDel(hotelId);
    setHotelIdDelete(hotelId);
  };

  // onClick Edit hotel
  const editHandler = (hotel) => {
    ctx.setHotelEdit(hotel);
    nav("/hotel/edit");
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
                  <h2>Hotel list</h2>
                  <div className={styles["add-new"]} onClick={addNewHandler}>
                    Add new
                  </div>
                </div>
                {/* <TableHotel hotels={data.hotels} onSubmit={deleteHandler} /> */}
                <TableHotel
                  hotels={hotels}
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
export default Hotel;
