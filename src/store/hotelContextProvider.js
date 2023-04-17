import { useState } from "react";
import HotelContext from "./hotelContext";

const HotelContextProvider = (props) => {
  const [hotelEdit, setHotelEdit] = useState();

  return (
    <HotelContext.Provider value={{ hotelEdit, setHotelEdit }}>
      {props.children}
    </HotelContext.Provider>
  );
};
export default HotelContextProvider;
