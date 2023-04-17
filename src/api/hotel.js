import setHeader from "./set_hearder_auth";

const getHotelTopRate = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/top-rating`
    );
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export const getHotelById = async (id) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/detail/${id}`
    );
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export const getAllHotel = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/hotel/all`, {
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
export const getInfoHotelInput = async (hotelIdInput) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/get-info-hotel-input?hotelId=${hotelIdInput}`,
      {
        method: "GET",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
      }
    );
    if (!res.ok) {
      throw new Error("Request fail");
    }
    return res.json();
  } catch (error) {
    console.log("getCities error: ", error);
  }
};
export const postAddNewHotel = async (hotel) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/add-new`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify({ ...hotel }),
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
export const postDeleteHotel = async (hotelId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/delete`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify({ hotelId }),
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
export const postUpdateHotel = async (hotel) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/hotel/update`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify(hotel),
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
export default getHotelTopRate;
