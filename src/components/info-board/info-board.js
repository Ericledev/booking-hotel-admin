import styles from "./info-board.module.css";

const InfoBoard = (props) => {
  return (
    <div className={styles["board-container"]}>
      <div className={styles.user}>{props.title}</div>
      <div className={styles.number}>{props.number}</div>
      <div className={styles.icon}>{props.icon}</div>
    </div>
  );
};
export default InfoBoard;
