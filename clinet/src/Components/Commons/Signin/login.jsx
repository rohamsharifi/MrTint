import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./signin.css";
import "./login.css";

const Login = () => {
  let [emptyTel, setEmptyTel] = useState(false);
  let [isValid, setIsValid] = useState(true);
  let [telValue, setTelValue] = useState("");
  let [borderColor, setBorderColor] = useState("#c8c8c8");
  let [password, setPassword] = useState("");
  let [emptyPassword, setEmptyPassword] = useState(false);
  let [eyeDisplay, setEyeDisplay] = useState("none");
  let [eyeSlashDisplay, setEyeSlashDisplay] = useState("inline");
  let [inputType, setInputType] = useState("password");
  let [phoneExist, setPhoneExist] = useState(true);
  let [isDisabled, setIsDisabled] = useState(true);
  let [correctPassword, setCorrectPassword] = useState(true);

  const navigate = useNavigate();
  const data = { phoneNumber: telValue };

  const handleInputValue = (value) => {
    setPhoneExist(true);
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
      if (password !== "") {
        setIsDisabled(false);
      }
      setEmptyTel(false);
      setIsValid(true);
    } else {
      setIsDisabled(true);
    }
  };

  const handleValidTel = (e) => {
    e.preventDefault();

    if (telValue.length === 0) {
      setIsValid(true);
      setEmptyTel(true);
      setBorderColor("#cf0707");
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

  const handleChangePassword = (password) => {
    setPassword(password);
    setEmptyPassword(false);
    setCorrectPassword(true);
    if (password !== "" && isValid === true && telValue !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleBlurPassword = () => {
    if (password === "") {
      setEmptyPassword(true);
    } else {
      setEmptyPassword(false);
    }
  };

  const eyeSlashClick = () => {
    setEyeSlashDisplay("none");
    setEyeDisplay("inline");
    setInputType("text");
  };

  const eyeClick = () => {
    setEyeSlashDisplay("inline");
    setEyeDisplay("none");
    setInputType("password");
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/checknumber", { phone: telValue })
      .then((response) => {
        if (response.data.user.length === 0) {
          setPhoneExist(false);
        } else {
          setPhoneExist(true);
          if (password === response.data.user[0].password) {
            setCorrectPassword(true);
            navigate("/", { state: data });
          } else {
            setCorrectPassword(false);
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="main-page">
        <div className="signin-section">
          <div>
            <Link to="/" className="arrow-link">
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
            <header className="header">
              <h1 className="mrtint">MRTINT</h1>
              <h2 className="title">ورود به مسترتینت</h2>
              <p className="description">
                برای ورود شماره موبایل و رمز عبور خود را وارد کنید
              </p>
            </header>
            <form action="" className="login-form">
              <input
                type="tel"
                placeholder="شماره موبایل"
                className="phone-input"
                onChange={(e) => handleInputValue(e.target.value)}
                onBlur={(e) => handleValidTel(e)}
                style={{ borderBottom: `2px solid ${borderColor}` }}
                value={telValue}
              />
              {emptyTel && (
                <p className="error-text">
                  لطفا شماره موبایل خود را وارد کنید.
                </p>
              )}
              {!isValid && (
                <p className="error-text">
                  لطفا شماره موبایل خود را به درستی وارد کنید.
                </p>
              )}
              {!phoneExist && (
                <p className="error-text">
                  تا به حال ثبت‌نامی با این شماره انجام نشده است. لطفا شماره
                  دیگری وارد کنید یا از طریق لینک پایین صفحه اقدام به ثبت‌نام
                  کنید.
                </p>
              )}
              <div className="input-icon-div">
                <img
                  src={require("../../../images/eye.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: eyeDisplay }}
                  onClick={eyeClick}
                />
                <img
                  src={require("../../../images/eyeslash.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: eyeSlashDisplay }}
                  onClick={eyeSlashClick}
                />
                <input
                  type={inputType}
                  placeholder="رمز عبور"
                  className="password-input"
                  onChange={(e) => handleChangePassword(e.target.value)}
                  onBlur={handleBlurPassword}
                  value={password}
                />
              </div>
              {emptyPassword && (
                <p className="error-text">لطفا رمز عبور خود را وارد کنید.</p>
              )}
              {!correctPassword && (
                <p className="error-text">رمز عبور اشتباه است</p>
              )}
              <button
                type="submit"
                className="submit-btn"
                onClick={(e) => handleButtonClick(e)}
                disabled={isDisabled}
              >
                <span className="btn-shadow"></span>
                <span className="btn-edge"></span>
                <span className="btn-front text">ورود</span>
              </button>
            </form>
            <p className="rules">
              ورود شما به معنای پذیرش شرایط مسترتینت و قوانین حریم‌ خصوصی است
            </p>
          </div>
          <p className="footer-text">
            تا حالا ثبت‌نام نکردید؟{" "}
            <Link to="/signup" className="signup-link">
              ثبت‌نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
