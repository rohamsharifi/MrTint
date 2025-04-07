import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useRef } from "react";
import Countdown from "react-countdown";
import { useEffect } from "react";
import axios from "axios";

import "./signin.css";
import "./authenticate.css";

const Authenticate = ({ toGetNumber, telValue, toSetPassword }) => {
  const inputRef0 = useRef(null);
  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRefs = [inputRef0, inputRef1, inputRef2, inputRef3, inputRef4];
  let [code0, setCode0] = useState("");
  let [code1, setCode1] = useState("");
  let [code2, setCode2] = useState("");
  let [code3, setCode3] = useState("");
  let [code4, setCode4] = useState("");
  let [timerDisplay, setTimerDisplay] = useState("inline-block");
  let [k, setK] = useState(false);
  let [sentCode, setSentCode] = useState("");
  let [codeErr, setCodeErr] = useState(true);
  let [resendDisplay, setResendDisplay] = useState("none");
  let [borderColor, setBorderColor] = useState("#c8c8c8");

  const date = useRef(Date.now() + 90000);

  const generateCode = () => {
    axios
      .get("http://localhost:5000/verification-code")
      .then((response) => {
        let code = response.data.code;
        code = Math.trunc(code);
        code = code.toString();
        let a = "";
        let b = "";
        for (let i = 0; i < 5; i++) {
          a = toPersian(code[0]);
          b = b + a;
          code = code.substring(1);
        }
        setSentCode(b);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    generateCode();
  }, []);

  const toPersian = (num) => {
    switch (num) {
      case "0":
      case "۰":
        return "۰";
      case "1":
      case "۱":
        return "۱";
      case "2":
      case "۲":
        return "۲";
      case "3":
      case "۳":
        return "۳";
      case "4":
      case "۴":
        return "۴";
      case "5":
      case "۵":
        return "۵";
      case "6":
      case "۶":
        return "۶";
      case "7":
      case "۷":
        return "۷";
      case "8":
      case "۸":
        return "۸";
      case "9":
      case "۹":
        return "۹";
    }
  };

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
          setCode0("");
          break;
        case 1:
          setCode1("");
          break;
        case 2:
          setCode2("");
          break;
        case 3:
          setCode3("");
          break;
        case 4:
          setCode4("");
      }
      inputRefs[id].current.blur();
      if (id > 0) {
        inputRefs[id - 1].current.focus();
      }
    }
  };
  const handleChange = (value, id) => {
    const code = value.charCodeAt(0);
    let perCode = "";
    let codeArray = [];

    if ((code >= 48 && code <= 57) || (code >= 1776 && code <= 1785)) {
      perCode = toPersian(value[0]);

      switch (id) {
        case 0:
          setCode0(perCode);
          break;
        case 1:
          setCode1(perCode);
          break;
        case 2:
          setCode2(perCode);
          break;
        case 3:
          setCode3(perCode);
          break;
        case 4:
          setCode4(perCode);
      }
      inputRefs[id].current.blur();
      if (id < 4) {
        inputRefs[id + 1].current.focus();
      }
    } else {
      switch (id) {
        case 0:
          if (value !== "") setCode0("");
          break;
        case 1:
          if (value !== "") setCode1("");
          break;
        case 2:
          if (value !== "") setCode2("");
          break;
        case 3:
          if (value !== "") setCode3("");
          break;
        case 4:
          if (value !== "") setCode4("");
      }
    }
  };

  const renderer = ({ minutes, seconds, completed }) => {
    if (!completed) {
      setResendDisplay("none");
      seconds = seconds.toString();
      if (minutes === 1) {
        minutes = "۱";
      } else {
        minutes = "۰";
      }

      if (seconds > 9) {
        let num = toPersian(seconds[1]);
        seconds = seconds.slice(0, -1);
        seconds = seconds + num;

        num = toPersian(seconds[0]);
        seconds = seconds.slice(1);
        seconds = num + seconds;

        return (
          <span className="timer" style={{ display: timerDisplay }}>
            ۰{minutes}:{seconds}&nbsp;
            <span style={{ letterSpacing: "0" }}>تا ارسال مجدد کد تایید</span>
          </span>
        );
      } else {
        seconds = toPersian(seconds);
        return (
          <span className="timer" style={{ display: timerDisplay }}>
            ۰{minutes}:۰{seconds}&nbsp;
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
    setK(true);
    setTimerDisplay("inline-block");
    setBorderColor("#c8c8c8");
    setCodeErr(true);
    setCode0("");
    setCode1("");
    setCode2("");
    setCode3("");
    setCode4("");
    generateCode();
  };

  const handleAthenticate = () => {
    if (
      code0 === sentCode[0] &&
      code1 === sentCode[1] &&
      code2 === sentCode[2] &&
      code3 === sentCode[3] &&
      code4 === sentCode[4]
    ) {
      setCodeErr(true);
      setBorderColor("#c8c8c8");
      toSetPassword();
    } else {
      setCodeErr(false);
      setBorderColor("var(--error-color)");
    }
  };

  return (
    <div>
      <div className="main-page">
        {console.log(sentCode)}
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
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={code0}
                  onChange={(e) => handleChange(e.target.value, 0)}
                  onKeyDown={(e) => handleKeyDown(e.key, 0)}
                  ref={inputRefs[0]}
                  style={{ borderBottomColor: borderColor }}
                  autoFocus
                />
                <input
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={code1}
                  onChange={(e) => handleChange(e.target.value, 1)}
                  onKeyDown={(e) => handleKeyDown(e.key, 1)}
                  style={{ borderBottomColor: borderColor }}
                  inputProps={{ inputMode: "numeric" }}
                  ref={inputRefs[1]}
                />
                <input
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={code2}
                  onChange={(e) => handleChange(e.target.value, 2)}
                  onKeyDown={(e) => handleKeyDown(e.key, 2)}
                  style={{ borderBottomColor: borderColor }}
                  inputProps={{ inputMode: "numeric" }}
                  ref={inputRefs[2]}
                />
                <input
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={code3}
                  onChange={(e) => handleChange(e.target.value, 3)}
                  onKeyDown={(e) => handleKeyDown(e.key, 3)}
                  style={{ borderBottomColor: borderColor }}
                  inputProps={{ inputMode: "numeric" }}
                  ref={inputRefs[3]}
                />
                <input
                  type="tel"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  className="code-input"
                  value={code4}
                  onChange={(e) => handleChange(e.target.value, 4)}
                  onKeyDown={(e) => handleKeyDown(e.key, 4)}
                  style={{ borderBottomColor: borderColor }}
                  inputProps={{ inputMode: "numeric" }}
                  ref={inputRefs[4]}
                />
              </div>
              {!codeErr && (
                <p className="err-txt">کد تایید وارد شده صحیح نمی‌باشد.</p>
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
