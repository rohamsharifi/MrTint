import React, { useState } from "react";
import GetNumber from "./getNumber";
import Authenticate from "./authenticate";
import axios from "axios";

import "./signup.css";

axios.defaults.withCredentials = true;


const Signup = () => {
  let [componentName, setComponentName] = useState("getNumber");
  let [telValue, setTelValue] = useState("");
  let [emptyTel, setEmptyTel] = useState("");
  let [isValid, setIsValid] = useState(true);
  let [isDisabled, setIsDisabled] = useState(true);
  let [borderColor, setBorderColor] = useState("#c8c8c8");
  let [phoneExist, setPhoneExist] = useState(false);

  const toSetPassword = () => {
    setComponentName("set-password");
  };

  const toGetNumber = () => {
    setComponentName("getNumber");
  };

  const toAuthenticate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { phone_number: telValue })
      .then((response) => {
        console.log(response.data.code)
        setComponentName("authenticate");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputValue = (value) => {
    setPhoneExist(false);
    value = value.split("");
    value = value.filter(
      (index) =>
        (index.charCodeAt(0) >= 48 && index.charCodeAt(0) <= 57)
    );
    let phoneNumber = "";
    for (let i = 0; i < value.length; i++) {
      phoneNumber += value[i];
    }
    setTelValue(phoneNumber);
    if (
      (phoneNumber.length === 11 && phoneNumber[0] === "0" && phoneNumber[1] === "9") ||
      (phoneNumber.length === 12 &&
        phoneNumber[0] === "9" &&
        phoneNumber[1] === "8" &&
        phoneNumber[2] === "9")
    ) {
      setIsDisabled(false);
      setEmptyTel(false);
      setIsValid(true);
    } else {
      setIsDisabled(true);
    }
  };

  const handleValidTel = () => {
    if (telValue.length === 0) {
      setIsValid(true);
      setEmptyTel(true);
      setBorderColor("#cf0707");
      setIsDisabled(true);
    } else {
      setEmptyTel(false);
      setBorderColor("#c8c8c8");
      if (
        (telValue.length === 11 &&
          telValue[0] === "0" &&
          telValue[1] === "9") ||
        (telValue.length === 12 &&
          telValue[0] === "9" &&
          telValue[1] === "8" &&
          telValue[2] === "9")
      ) {
        setIsValid(true);
        setBorderColor("#c8c8c8");
      } else {
        setIsValid(false);
        setBorderColor("#cf0707");
      }
    }
  };

  return (
    <div>
      {componentName === "getNumber" ? (
        <GetNumber
          toAuthenticate={toAuthenticate}
          telValue={telValue}
          handleInputValue={handleInputValue}
          handleValidTel={handleValidTel}
          emptyTel={emptyTel}
          isValid={isValid}
          isDisabled={isDisabled}
          borderColor={borderColor}
          phoneExist={phoneExist}
        />
      ) : null}
      {componentName === "authenticate" ? (
        <Authenticate
          toGetNumber={toGetNumber}
          telValue={telValue}
          toSetPassword={toSetPassword}
        />
      ) : null}
    </div>
  );
};

export default Signup;
