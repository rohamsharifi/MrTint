import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./signin.css";
import "./setPassword.css";

const SetPassword = ({ telValue, toGetNumber }) => {
  const navigate = useNavigate();
  const data = { phoneNumber: telValue };

  let [password, setPassword] = useState("");
  let [passwordRepeat, setPasswordRepeat] = useState("");
  let [firstIsEmpty, setFirstIsEmpty] = useState(false);
  let [firstIsLess, setFirstIsLess] = useState(false);
  let [secondIsEmpty, setSecondIsEmpty] = useState(false);
  let [isDisabled, setIsDisabled] = useState(true);
  let [firstEyeDisplay, setFirstEyeDisplay] = useState("none");
  let [firstEyeSlashDisplay, setFirstEyeSlashDisplay] = useState("inline");
  let [secondEyeDisplay, setSecondEyeDisplay] = useState("none");
  let [secondEyeSlashDisplay, setSecondEyeSlashDisplay] = useState("inline");
  let [firstInputType, setFirstInputType] = useState("password");
  let [secondInputType, setSecondInputType] = useState("password");
  let [samePassword, setSamePassword] = useState(true);

  const handleChangeFirst = (password) => {
    setPassword(password);
    if (password.length > 0) {
      setFirstIsEmpty(false);
    }
    if (password.length > 5) {
      setFirstIsLess(false);
    }
    handleDisableFirst(password);
  };

  const handleChangeSecond = (password) => {
    setPasswordRepeat(password);
    if (password.length > 0) {
      setSecondIsEmpty(false);
    }
    handleDisableSecond(password);
  };

  const handleBlurFirst = () => {
    if (password.length === 0) {
      setFirstIsEmpty(true);
      setFirstIsLess(false);
    } else if (password.length < 6) {
      setFirstIsEmpty(false);
      setFirstIsLess(true);
    } else {
      setFirstIsEmpty(false);
      setFirstIsLess(false);
    }
  };

  const handleBlurSecond = () => {
    if (passwordRepeat.length === 0) {
      setSecondIsEmpty(true);
    } else {
      setSecondIsEmpty(false);
    }
  };

  const handleDisableFirst = (password) => {
    if (password.length > 5 && passwordRepeat.length > 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleDisableSecond = (value) => {
    if (value.length > 0 && password.length > 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const firstEyeSlashClick = () => {
    setFirstEyeSlashDisplay("none");
    setFirstEyeDisplay("inline");
    setFirstInputType("text");
  };

  const firstEyeClick = () => {
    setFirstEyeSlashDisplay("inline");
    setFirstEyeDisplay("none");
    setFirstInputType("password");
  };

  const secondEyeSlashClick = () => {
    setSecondEyeSlashDisplay("none");
    setSecondEyeDisplay("inline");
    setSecondInputType("text");
  };

  const secondEyeClick = () => {
    setSecondEyeSlashDisplay("inline");
    setSecondEyeDisplay("none");
    setSecondInputType("password");
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (password === passwordRepeat) {
      setSamePassword(true);
      handleAddUser();
      navigate("/", { state: data });
    } else {
      setSamePassword(false);
    }
  };

  const handleAddUser = async () => {
    const user = {
      name: "",
      familyName: "",
      phoneNumber: telValue,
      password: password,
      address: "",
    };

    axios
      .post("http://localhost:5000/api/createuser", user)
      .then((response) => {
        console.log(response);
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
            <div onClick={toGetNumber} className="arrow-link">
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </div>
            <header className="header">
              <h1 className="mrtint">MRTINT</h1>
              <h2 className="title">تعیین رمز عبور</h2>
              <p className="description">
                لطفا برای حساب کاربری خود یک رمز عبور تعیین کنید
              </p>
            </header>
            <form action="" className="password-form">
              <div className="input-icon-div">
                <img
                  src={require("../../../images/eye.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: firstEyeDisplay }}
                  onClick={firstEyeClick}
                />
                <img
                  src={require("../../../images/eyeslash.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: firstEyeSlashDisplay }}
                  onClick={firstEyeSlashClick}
                />
                <input
                  type={firstInputType}
                  placeholder="رمز عبور"
                  className="set-password-input"
                  onChange={(e) => handleChangeFirst(e.target.value)}
                  onBlur={handleBlurFirst}
                  value={password}
                />
              </div>
              {firstIsEmpty && (
                <p className="error-text">لطفا این قسمت را خالی نگذارید</p>
              )}
              {firstIsLess && (
                <p className="error-text">
                  رمز عبور شما باید شامل حداقل ۶ کاراکتر باشد
                </p>
              )}
              <div className="input-icon-div">
                <img
                  src={require("../../../images/eye.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: secondEyeDisplay }}
                  onClick={secondEyeClick}
                />
                <img
                  src={require("../../../images/eyeslash.png")}
                  alt="vision"
                  className="set-password-input-icon"
                  style={{ display: secondEyeSlashDisplay }}
                  onClick={secondEyeSlashClick}
                />
                <input
                  type={secondInputType}
                  placeholder="تکرار رمز عبور"
                  className="set-password-input"
                  onChange={(e) => handleChangeSecond(e.target.value)}
                  onBlur={handleBlurSecond}
                  value={passwordRepeat}
                />
              </div>
              {secondIsEmpty && (
                <p className="error-text">لطفا این قسمت را خالی نگذارید.</p>
              )}
              {!samePassword && (
                <p className="error-text">
                  رمز عبور وارد شده و تکرار آن برابر نیستند.
                </p>
              )}
            </form>
          </div>
          <button
            type="submit"
            className="set-password-button"
            onClick={(e) => handleButtonClick(e)}
            disabled={isDisabled}
          >
            <span className="btn-shadow"></span>
            <span className="btn-edge"></span>
            <span className="btn-front text">تایید رمز عبور</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SetPassword;
