import styles from "./table-hotel.module.css";
import { useState } from "react";

const TableHotel = (props) => {
  const hotels = props.hotels;
  const [pointer, setPointer] = useState(0);
  let showHotels;
  const deleteHandler = (hotelId) => {
    if (window.confirm(`Do you want to delete the hotelId: ${hotelId} ?`)) {
      setPointer(0);
      props.onSubmit(hotelId);
    }
  };
  const editHandler = (hotel) => {
    props.onEdit(hotel);
  };
  // handle navigate row on table
  const randomSelectPointerHandler = (indexInput) => {
    setPointer(indexInput);
  };
  if (hotels.length > 0) {
    showHotels = hotels.map((hotel, index) => {
      return (
        <tr
          className={index === pointer ? styles.active : ""}
          key={index}
          onClick={randomSelectPointerHandler.bind(null, index)}
        >
          <td>
            <input type={"checkbox"} value={hotel._id} />
          </td>
          <td>{hotel._id}</td>
          <td>{hotel.name}</td>
          <td>{hotel.typeId && hotel.typeId.name}</td>
          <td>{hotel.title}</td>
          <td>{hotel.cityId && hotel.cityId.name}</td>
          <td className={styles.action}>
            <span
              className={styles["delete"]}
              onClick={deleteHandler.bind(null, hotel._id)}
            >
              Delete
            </span>
            <span
              className={styles["edit"]}
              onClick={editHandler.bind(null, hotel)}
            >
              Edit
            </span>
          </td>
        </tr>
      );
    });
  }
  const arrLeftHandler = (e) => {
    if (pointer > 0) setPointer(pointer - 1);
  };
  const arrRightHandler = (e) => {
    if (pointer < hotels.length - 1) setPointer(pointer + 1);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.checkbox}>
            <input type={"checkbox"} />
          </th>
          <th>| ID</th>
          <th>| Name</th>
          <th>| Type</th>
          <th>| Title</th>
          <th>| City</th>
          <th>| Action</th>
        </tr>
      </thead>
      <tbody>{showHotels}</tbody>
      <tfoot>
        <tr>
          <td colSpan="7">
            <div className={styles.footer}>
              <span>
                {pointer + 1 > hotels.length ? 0 : pointer + 1}-{hotels.length}{" "}
                of {hotels.length}
              </span>
              <svg
                onClick={arrLeftHandler}
                className={styles["arr-left"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
              </svg>
              <svg
                onClick={arrRightHandler}
                className={styles["arr-right"]}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </div>
          </td>
        </tr>
      </tfoot>
      {/* {showTrans} */}
    </table>
  );
};
export default TableHotel;
