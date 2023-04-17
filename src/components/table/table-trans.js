import styles from "./table-trans.module.css";
import { formatDate } from "../../util/function";
import { useState } from "react";

const TableTrans = (props) => {
  const trans = props.transaction;
  const [pointer, setPointer] = useState(0);
  let showTrans;
  if (trans.length > 0) {
    showTrans = trans.map((tran, index) => {
      // format input date dd/mm/yyyy
      const fromDate = formatDate(tran.dateStart);
      const toDate = formatDate(tran.dateEnd);
      // style the status
      let stypeAcitve;
      if (tran.status === "Booked") {
        stypeAcitve = "pink";
      } else if (tran.status === "Checkin") {
        stypeAcitve = "green";
      } else {
        stypeAcitve = "purple";
      }
      // handle navigate row on table
      const randomSelectPointerHandler = (index) => {
        setPointer(index);
      };

      return (
        <tr
          className={index === pointer ? styles.active : ""}
          key={index}
          onClick={randomSelectPointerHandler.bind(null, index)}
        >
          <td>
            <input type={"checkbox"} value={tran._id} />
          </td>
          <td>{tran._id}</td>
          <td>{tran.user && tran.user.fullName}</td>
          <td>{tran.hotel && tran.hotel.name}</td>
          <td>{tran.room.toString()}</td>
          <td>
            {fromDate} - {toDate}
          </td>
          <td>$ {tran.price}</td>
          <td>{tran.payment}</td>
          <td className={styles.status}>
            <span className={styles[stypeAcitve]}>{tran.status}</span>
          </td>
        </tr>
      );
    });
  }
  const arrLeftHandler = (e) => {
    if (pointer > 0) setPointer(pointer - 1);
  };
  const arrRightHandler = (e) => {
    if (pointer < trans.length - 1) setPointer(pointer + 1);
  };
  return (
    <table>
      <thead>
        <tr>
          <th className={styles.checkbox}>
            <input type={"checkbox"} />
          </th>
          <th>| ID</th>
          <th>| User</th>
          <th>| Hotel</th>
          <th>| Room</th>
          <th>| Date</th>
          <th>| Price</th>
          <th>| Payment Method</th>
          <th>| Status</th>
        </tr>
      </thead>
      <tbody>{showTrans}</tbody>
      <tfoot>
        <tr>
          <td colSpan="9">
            <div className={styles.footer}>
              <span>
                {pointer + 1}-{trans.length} of {trans.length}
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
export default TableTrans;
