import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Countdown from "react-countdown";
import { useState } from "react";
import { useRef } from "react";
import axios from "axios";

import "./signin.css";
import "./authenticate.css";

const Authenticate = ({ toGetNumber, telValue }) => {
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4];
  let [firstDigit, setfirstDigit] = useState("");
  let [secondDigit, setSecondDigit] = useState("");
  let [thirdDigit, setThirdDigit] = useState("");
  let [fourthDigit, setFourthDigit] = useState("");
  let [fifthDigit, setFifthdigit] = useState("");
  let [timerDisplay, setTimerDisplay] = useState("inline-block");
  let [k, setK] = useState(false);
  let [codeErr, setCodeErr] = useState(true);
  let [resendDisplay, setResendDisplay] = useState("none");
  let [borderColor, setBorderColor] = useState("#c8c8c8");

  const date = useRef(Date.now() + 90000);

  const handleKeyDown = (key, id) => {
    if (key === "Enter") {
      inputRefs[id].current.blur();
      if (id < 4) {
        inputRefs[id + 1].current.focus();
      }
    }

    if (key === "Backspace") {
      switch (id) {
        case 0:
          setfirstDigit("");
          break;
        case 1:
          setSecondDigit("");
          break;
        case 2:
          setThirdDigit("");
          break;
        case 3:
          setFourthDigit("");
          break;
        case 4:
          setFifthdigit("");
      }
      inputRefs[id].current.blur();
      if (id > 0) {
        inputRefs[id - 1].current.focus();
      }
    }
  };
  const handleChange = (value, id) => {
    const code = value.charCodeAt(0);

    if ((code >= 48 && code <= 57) || (code >= 1776 && code <= 1785)) {

      switch (id) {
        case 0:
          setfirstDigit(value[0]);
          break;
        case 1:
          setSecondDigit(value[0]);
          break;
        case 2:
          setThirdDigit(value[0]);
          break;
        case 3:
          setFourthDigit(value[0]);
          break;
        case 4:
          setFifthdigit(value[0]);
      }
      inputRefs[id].current.blur();
      if (id < 4) {
        inputRefs[id + 1].current.focus();
      }
    } else {
      switch (id) {
        case 0:
          if (value !== "") setfirstDigit("");
          break;
        case 1:
          if (value !== "") setSecondDigit("");
          break;
        case 2:
          if (value !== "") setThirdDigit("");
          break;
        case 3:
          if (value !== "") setFourthDigit("");
          break;
        case 4:
          if (value !== "") setFifthdigit("");
      }
    }
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (!completed) {
      setResendDisplay("none");
      seconds = seconds.toString();
      if (minutes === 1) {
        minutes = "1";
      } else {
        minutes = "0";
      }

      if (seconds > 9) {
        let num = seconds[1];
        seconds = seconds.slice(0, -1);
        seconds = seconds + num;

        num = seconds[0];
        seconds = seconds.slice(1);
        seconds = num + seconds;

        return (
          <span className="timer" style={{ display: timerDisplay }}>
            ۰{minutes}:{seconds}&nbsp;
            <span style={{ letterSpacing: "0" }}>تا ارسال مجدد کد تایید</span>
          </span>
        );
      } else {
        return (
          <span className="timer" style={{ display: timerDisplay }}>
            0{minutes}:0{seconds}&nbsp;
            <span style={{ letterSpacing: "0" }}>تا ارسال مجدد کد تایید</span>
          </span>
        );
      }
    } else {
      setResendDisplay("inline-block");
      setTimerDisplay("none");
    }
  };

  const handleResendCode = () => {
    date.current = Date.now() + 90000;
    axios
      .post("http://localhost:5000/login", { phone_number: telValue })
      .then((response) => {
        console.log(response.data.code)
      })
      .catch((err) => {
        console.log(err);
      });
    setK(true);
    setTimerDisplay("inline-block");
    setBorderColor("#c8c8c8");
    setfirstDigit("");
    setSecondDigit("");
    setThirdDigit("");
    setFourthDigit("");
    setFifthdigit("");
  };

  const handleAthenticate = () => {
    let fullCode = "";
    fullCode = firstDigit + secondDigit + thirdDigit + fourthDigit + fifthDigit;
    axios
      .post("http://localhost:5000/login/verification", { phone_number: telValue, code: fullCode })
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.location.href = '/';
        setCodeErr(true);

      })
      .catch(() => {
        setCodeErr(false);
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
              <h2 className="title">تایید شماره موبایل</h2>
              <p className="description">
                لطفا کد ارسال شده به شماره موبایل{" "}
                <span style={{ letterSpacing: "1px" }}>{telValue}</span> را وارد
                کنید
              </p>
            </header>
            <form action="" className="validation-form">
              <div className="resend-sec" style={{ display: resendDisplay }}>
                <div onClick={handleResendCode}>
                  <FontAwesomeIcon
                    icon={faArrowRotateLeft}
                    className="rotate-arrow"
                  />
                  <p className="resend">ارسال مجدد کد تایید</p>
                </div>
              </div>
              <Countdown
                key={k}
                date={date.current}
                renderer={renderer}
                onComplete={() => setK(false)}
              />
              <div className="inputs">
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={firstDigit}
                  onChange={(e) => handleChange(e.target.value, 0)}
                  onKeyDown={(e) => handleKeyDown(e.key, 0)}
                  ref={inputRefs[0]}
                  style={{ borderBottomColor: borderColor }}
                  autoFocus
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={secondDigit}
                  onChange={(e) => handleChange(e.target.value, 1)}
                  onKeyDown={(e) => handleKeyDown(e.key, 1)}
                  style={{ borderBottomColor: borderColor }}
                  ref={inputRefs[1]}
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={thirdDigit}
                  onChange={(e) => handleChange(e.target.value, 2)}
                  onKeyDown={(e) => handleKeyDown(e.key, 2)}
                  style={{ borderBottomColor: borderColor }}
                  ref={inputRefs[2]}
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={fourthDigit}
                  onChange={(e) => handleChange(e.target.value, 3)}
                  onKeyDown={(e) => handleKeyDown(e.key, 3)}
                  style={{ borderBottomColor: borderColor }}
                  ref={inputRefs[3]}
                />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={fifthDigit}
                  onChange={(e) => handleChange(e.target.value, 4)}
                  onKeyDown={(e) => handleKeyDown(e.key, 4)}
                  style={{ borderBottomColor: borderColor }}
                  ref={inputRefs[4]}
                />
              </div>
              {!codeErr && (
                <p className="err-txt">کد تایید وارد شده صحیح نمی‌باشد. لطفا دوباره امتحان کنید.</p>
              )}
            </form>
          </div>
          <div className="confirmation">
            <button
              type="submit"
              className="validate-btn"
              onClick={handleAthenticate}
            >
              <span className="btn-shadow"></span>
              <span className="btn-edge"></span>
              <span className="btn-front text">تایید و ادامه</span>
            </button>
            <p className="change-number" onClick={toGetNumber}>
              تغییر شماره موبایل
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
