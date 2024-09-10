import React, { useState } from "react";
import GetNumber from "./getNumber";
import Authenticate from "./authenticate";
import SetPassword from "./setPassword";
import axios from "axios";

import "./signup.css";

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
      .post("http://localhost:5000/checknumber", { phone: telValue })
      .then((response) => {
        if (response.data.user.length === 1) {
          setPhoneExist(true);
        } else {
          setPhoneExist(false);
          setComponentName("authenticate");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputValue = (value) => {
    setPhoneExist(false);
    value = value.split("");
    value = value.filter(
      (index) =>
        (index.charCodeAt(0) >= 48 && index.charCodeAt(0) <= 57) ||
        (index.charCodeAt(0) >= 1776 && index.charCodeAt(0) <= 1785)
    );
    for (let i = 0; i < value.length; i++) {
      if (value[i].charCodeAt(0) >= 48 && value[i].charCodeAt(0) <= 57) {
        switch (value[i]) {
          case "0":
            value[i] = "۰";
            break;
          case "1":
            value[i] = "۱";
            break;
          case "2":
            value[i] = "۲";
            break;
          case "3":
            value[i] = "۳";
            break;
          case "4":
            value[i] = "۴";
            break;
          case "5":
            value[i] = "۵";
            break;
          case "6":
            value[i] = "۶";
            break;
          case "7":
            value[i] = "۷";
            break;
          case "8":
            value[i] = "۸";
            break;
          case "9":
            value[i] = "۹";
        }
      }
    }
    let perTel = "";
    for (let i = 0; i < value.length; i++) {
      perTel = perTel + value[i];
    }
    setTelValue(perTel);
    if (
      (perTel.length === 11 && perTel[0] === "۰" && perTel[1] === "۹") ||
      (perTel.length === 12 &&
        perTel[0] === "۹" &&
        perTel[1] === "۸" &&
        perTel[2] === "۹")
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
          telValue[0] === "۰" &&
          telValue[1] === "۹") ||
        (telValue.length === 12 &&
          telValue[0] === "۹" &&
          telValue[1] === "۸" &&
          telValue[2] === "۹")
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

      {componentName === "set-password" ? (
        <SetPassword telValue={telValue} toGetNumber={toGetNumber} />
      ) : null}
    </div>
  );
};

export default Signup;
