import { useEffect, useRef, useState } from "react";
import Button from "../buttons/Button";
import styles from "./input-form-add-room.module.css";
import HTTP from "../../custom-hook/http";
import { getAllHotel } from "../../api/hotel";
import { isNumber, isEmptyArrRef, isSameName } from "../../util/function";

const InputFormAddRoom = (props) => {
  const { data, sendRequest } = HTTP(getAllHotel);
  const room = props.data;
  //   console.log("CCHEK RIIM: ", room);
  const titleRef = useRef(),
    priceRef = useRef(),
    descriptionRef = useRef(),
    maxPeopleRef = useRef(),
    roomNoRef = useRef(),
    hotelRef = useRef();

  let dataInputArr = [
    titleRef,
    priceRef,
    descriptionRef,
    maxPeopleRef,
    roomNoRef,
    hotelRef,
  ];

  useEffect(() => {
    sendRequest(); //get infomation of hotel
    // add data from props to form input
  }, [sendRequest]);

  //   handle submit form
  const submitFormHandler = (e) => {
    e.preventDefault();
    // check empty
    if (isEmptyArrRef(dataInputArr)) {
      alert("All of informations are not empty. Please input");
      return;
    }
    // check is not number
    if (!isNumber(roomNoRef.current.value)) {
      alert(
        "Room number is not number and greater than 0, please try other number"
      );
      roomNoRef.current.focus();
      return;
    }
    // check is same room number
    if (isSameName(roomNoRef.current.value)) {
      alert("Room number is same");
      roomNoRef.current.focus();
      return;
    }
    // set data and submit data
    let data = {
      roomId: room ? room._id : "",
      title: titleRef.current.value,
      desc: descriptionRef.current.value,
      price: priceRef.current.value,
      maxPeople: maxPeopleRef.current.value,
      roomNumbers: roomNoRef.current.value
        .split(";")
        .map((roomN) => +roomN.trim()),
      hotelId: hotelRef.current.value,
    };
    props.onSubmit(data);
  };

  // if get info grom DB is completed. we push room from props to form
  if (data && room) {
    titleRef.current.value = room.title;
    descriptionRef.current.value = room.desc;
    priceRef.current.value = room.price;
    maxPeopleRef.current.value = room.maxPeople;
    roomNoRef.current.value = room.roomNumbers.join(";");
    hotelRef.current.value = room.hotelId;
  }

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={submitFormHandler}>
        {/* input title of room */}
        <div className={[styles.name, styles.left].join(" ")}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title of room"
            ref={titleRef}
          />
        </div>
        {/* input description of room */}
        <div className={[styles.description, styles.right].join(" ")}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description of room"
            ref={descriptionRef}
          />
        </div>
        {/* input price of room */}
        <div className={[styles.price, styles.left].join(" ")}>
          <label htmlFor="price">Enter price ($) </label>
          <input
            type="number"
            id="price"
            min={1}
            step={1}
            placeholder="Enter price"
            ref={priceRef}
          />
        </div>
        {/* input max people of room */}
        <div className={[styles.distance, styles.right].join(" ")}>
          <label htmlFor="maxPeople">Max People</label>
          <input
            type="number"
            id="maxPeople"
            min={1}
            max={99}
            step={1}
            placeholder="Enter max people"
            ref={maxPeopleRef}
          />
        </div>
        {/* input room number*/}
        <div className={[styles.image, styles.left].join(" ")}>
          <label htmlFor="roomNo">Rooms</label>
          <textarea
            id="roomNo"
            placeholder="Give comma between room number. E.x: 101;102"
            ref={roomNoRef}
          />
          <label className={styles.alert}>{props.alert.alertRoom}</label>
        </div>
        {/* Choose hotel */}
        <div className={[styles.city, styles.right].join(" ")}>
          <label htmlFor="hotel">Choose a hotel</label>
          <select id="hotel" ref={hotelRef}>
            {data &&
              data.hotels &&
              data.hotels.length > 0 &&
              data.hotels.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className={styles["send-button"]}>
          <Button text="Send" />
        </div>
      </form>
    </div>
  );
};
export default InputFormAddRoom;
