import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthContextProvider from "./store/authContextProvider";
import HotelContextProvider from "./store/hotelContextProvider";
import RoomContextProvider from "./store/roomContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <HotelContextProvider>
        <RoomContextProvider>
          <App />
        </RoomContextProvider>
      </HotelContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
