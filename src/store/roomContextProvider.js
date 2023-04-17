import { useState } from "react";
import RoomContext from "./roomContext";

const RoomContextProvider = (props) => {
  const [roomEdit, setRoomEdit] = useState();
  return (
    <RoomContext.Provider value={{ roomEdit, setRoomEdit }}>
      {props.children}
    </RoomContext.Provider>
  );
};
export default RoomContextProvider;
