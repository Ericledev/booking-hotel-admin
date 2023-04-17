import styles from "./transaction.module.css";
import HTTP from "../../custom-hook/http";
import { getAllTran } from "../../api/transaction";
import { useEffect } from "react";
import NavBar from "../home/navbar/NavBar";
import Menu from "../../components/menu/menu";
import TableTrans from "../../components/table/table-trans";

const Transaction = () => {
  const { data, error, status, sendRequest } = HTTP(getAllTran);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

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
              <div className={styles["transaction"]}>
                <h2>Transactions</h2>
                <TableTrans transaction={data.trans} />
              </div>
            </div>
          )}
          {/* <Menu /> */}
        </div>
      </div>
    </>
  );
};
export default Transaction;
