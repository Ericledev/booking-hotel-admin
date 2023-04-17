import React, { useEffect, useRef } from "react";
import Button from "../buttons/Button";
import styles from "./input-form-add-hotel.module.css";
import HTTP from "../../custom-hook/http";
import { getInfoHotelInput } from "../../api/hotel";
import { isEmptyArrRef } from "../../util/function";

const InputFormAddHotel = (props) => {
  const { data, sendRequest } = HTTP(getInfoHotelInput);
  const hotel = props.data;

  // set ref input
  const nameRef = useRef(),
    typeRef = useRef(),
    cityRef = useRef(),
    addressRef = useRef(),
    distanceRef = useRef(),
    titleRef = useRef(),
    descriptionRef = useRef(),
    priceRef = useRef(),
    imageRef = useRef(),
    featureRef = useRef(),
    roomRef = useRef();

  const dataInput = [
    nameRef,
    typeRef,
    cityRef,
    addressRef,
    distanceRef,
    titleRef,
    descriptionRef,
    priceRef,
    imageRef,
    //roomRef,
    featureRef,
  ];

  //   handle submit form
  const submitFormHandler = (e) => {
    // get type of room that is selected
    // let selected = [];
    // const selections = roomRef.current.options;
    // for (let i = 0; i < selections.length; i++) {
    //   if (selections[i].selected) {
    //     selected.push(selections[i].value);
    //   }
    // }
    e.preventDefault();

    // check dataInput is empty
    if (isEmptyArrRef(dataInput)) {
      alert("All of informations are not empty. Please input");
      return;
    }
    // set data
    props.onSubmit({
      hotelId: hotel ? hotel._id : "",
      name: nameRef.current.value,
      typeId: typeRef.current.value,
      cityId: cityRef.current.value,
      address: addressRef.current.value,
      distance: distanceRef.current.value,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      photos: imageRef.current.value.split(";").map((photo) => photo.trim()),
      feature: featureRef.current.value === "Yes" ? true : false,
      // rooms: [], // selected,
    });
  };
  useEffect(() => {
    sendRequest(hotel ? hotel._id : "add new"); //get infomation of city, type of hotel
    // add data from props to form input
  }, [sendRequest]);

  // if get info grom DB is completed. we push hotel from props to form
  if (data && hotel) {
    nameRef.current.value = hotel.name;
    addressRef.current.value = hotel.address;
    distanceRef.current.value = hotel.distance;
    titleRef.current.value = hotel.title;
    descriptionRef.current.value = hotel.desc;
    priceRef.current.value = hotel.cheapestPrice;
    imageRef.current.value = hotel.photos.join(";");
    typeRef.current.value = hotel.typeId._id;
    cityRef.current.value = hotel.cityId._id;
    featureRef.current.value = hotel.featured;
  }

  return (
    <div className={styles["form-container"]}>
      <form onSubmit={submitFormHandler}>
        {/* imput name of hotel */}
        <div className={[styles.name, styles.left].join(" ")}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter name of hotel"
            ref={nameRef}
          />
        </div>
        {/* imput type of hotel */}
        <div className={[styles.type, styles.right].join(" ")}>
          <label htmlFor="type">Type</label>
          <select id="type" ref={typeRef}>
            {data &&
              data.type &&
              data.type.length > 0 &&
              data.type.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        {/* input city of hotel */}
        <div className={[styles.city, styles.left].join(" ")}>
          <label htmlFor="city">City</label>
          <select id="city" ref={cityRef}>
            {data &&
              data.city &&
              data.city.length > 0 &&
              data.city.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        {/* imput address of hotel */}
        <div className={[styles.address, styles.right].join(" ")}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Enter address of hotel"
            ref={addressRef}
          />
        </div>
        {/* imput distance of hotel */}
        <div className={[styles.distance, styles.left].join(" ")}>
          <label htmlFor="distance">Enter distance from city center(m)</label>
          <input
            type="number"
            id="distance"
            min={100}
            step={100}
            placeholder="Enter distance"
            ref={distanceRef}
          />
        </div>
        {/* imput title of hotel */}
        <div className={[styles.title, styles.right].join(" ")}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Enter title of hotel"
            ref={titleRef}
          />
        </div>
        {/* imput description of hotel */}
        <div className={[styles.description, styles.left].join(" ")}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter description of hotel"
            ref={descriptionRef}
          />
        </div>
        {/* imput price of hotel */}
        <div className={[styles.price, styles.right].join(" ")}>
          <label htmlFor="price">Enter cheapest price ($) </label>
          <input
            type="number"
            id="price"
            min={1}
            step={1}
            placeholder="Enter price"
            ref={priceRef}
          />
        </div>
        {/* imput image of hotel */}
        <div className={[styles.image, styles.left].join(" ")}>
          <label htmlFor="image">Images</label>
          <textarea
            id="image"
            placeholder="Give comma between link of image"
            ref={imageRef}
          />
        </div>
        {/* imput feature of hotel */}
        <div className={[styles.feature, styles.right].join(" ")}>
          <label htmlFor="feature">Featured</label>
          <select id="feature" ref={featureRef}>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        {/* imput room of hotel */}
        <div className={[styles.room].join(" ")}>
          <label htmlFor="room">Rooms</label>
          <select id="room" size="4" multiple ref={roomRef}>
            {data &&
              data.room &&
              data.room.length > 0 &&
              data.room.map((item, index) => {
                return (
                  <option value={item._id} key={index}>
                    {item.title}
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
export default React.memo(InputFormAddHotel);
