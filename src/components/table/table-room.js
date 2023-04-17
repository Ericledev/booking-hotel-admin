import styles from "./table-room.module.css";
import { useState } from "react";

const TableRoom = (props) => {
  const rooms = props.rooms;
  const [pointer, setPointer] = useState(0);
  let showRooms;
  const deleteHandler = (roomId) => {
    if (window.confirm(`Do you want to delete the roomId: ${roomId} ?`)) {
      setPointer(0);
      props.onSubmit(roomId);
    }
  };
  const editHandler = (room) => {
    props.onEdit(room);
  };
  // handle navigate row on table
  const randomSelectPointerHandler = (indexInput) => {
    setPointer(indexInput);
  };
  if (rooms.length > 0) {
    showRooms = rooms.map((room, index) => {
      return (
        <tr
          className={index === pointer ? styles.active : ""}
          key={index}
          onClick={randomSelectPointerHandler.bind(null, index)}
        >
          <td>
            <input type={"checkbox"} value={room._id} />
          </td>
          <td>{room._id}</td>
          <td>{room.title}</td>
          <td>{room.desc}</td>
          <td>{room.price}</td>
          <td>{room.maxPeople}</td>
          <td className={styles.action}>
            <span
              className={styles["delete"]}
              onClick={deleteHandler.bind(null, room._id)}
            >
              Delete
            </span>
            <span
              className={styles["edit"]}
              onClick={editHandler.bind(null, room)}
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
    if (pointer < rooms.length - 1) setPointer(pointer + 1);
  };

  return (
    <table>
      <thead>
        <tr>
          <th className={styles.checkbox}>
            <input type={"checkbox"} />
          </th>
          <th>| ID</th>
          <th>| Title</th>
          <th>| Description</th>
          <th className={styles.price}>| Price</th>
          <th className={styles.max}>| Max People</th>
          <th>| Action</th>
        </tr>
      </thead>
      <tbody>{showRooms}</tbody>
      <tfoot>
        <tr>
          <td colSpan="7">
            <div className={styles.footer}>
              <span>
                {pointer + 1 > rooms.length ? 0 : pointer + 1}-{rooms.length} of{" "}
                {rooms.length}
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
export default TableRoom;
