import setHeader from "./set_hearder_auth";

const transactionRequest = async (sendingData) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/user/create-trans`,
      {
        method: "POST",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
        body: JSON.stringify(sendingData),
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
export const getTransactionByUserId = async (userId) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/user/${userId}/get-trans`,
      {
        method: "GET",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
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

export const getLatestTran = async () => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/latest-trans`,
      {
        method: "GET",
        headers: setHeader({
          "Content-Type": "application/json; charset=utf-8",
        }),
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
export const getAllTran = async () => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/all-trans`, {
      method: "GET",
      headers: setHeader({
        "Content-Type": "application/json; charset=utf-8",
      }),
    });
    if (!res.ok) {
      throw new Error("Request is fail");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default transactionRequest;
