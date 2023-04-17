import setHeader from "./set_hearder_auth";

// export const getHotelById = async (id) => {
//   try {
//     const res = await fetch(`http://localhost:5000/hotel/detail/${id}`);
//     if (!res.ok) {
//       throw new Error("Request fail");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("getCities error: ", error);
//   }
// };
export const getAllRooms = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/room/all`, {
      method: "GET",
      headers: setHeader({
        "Content-Type": "application/json; charset=utf-8",
      }),
    });
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
// export const getInfoHotelInput = async () => {
//   try {
//     const res = await fetch(
//       `http://localhost:5000/hotel/get-info-hotel-input`,
//       {
//         method: "GET",
//         headers: setHeader({
//           "Content-Type": "application/json; charset=utf-8",
//         }),
//       }
//     );
//     if (!res.ok) {
//       throw new Error("Request fail");
//     }
//     return res.json();
//   } catch (error) {
//     console.log("getCities error: ", error);
//   }
// };
export const postAddNewRoom = async (room) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/room/add-new`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify({ ...room }),
      }
    );
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const postDeleteRoom = async (roomId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/room/delete`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify({ roomId }),
      }
    );
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export const postUpdateRoom = async (roomData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/room/update`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify(roomData),
      }
    );
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
