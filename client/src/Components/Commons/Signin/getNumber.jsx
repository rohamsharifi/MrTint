import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./signin.css";
import "./signup.css";

const GetNumber = ({
  toAuthenticate,
  telValue,
  handleInputValue,
  handleValidTel,
  emptyTel,
  isValid,
  isDisabled,
  borderColor,
  phoneExist,
}) => {
  return (
    <div>
      <div className="main-page">
        <div className="signin-section">
          <div>
            <Link to="/signin" className="arrow-link">
              <FontAwesomeIcon icon={faArrowRight} className="arrow" />
            </Link>
            <header className="header">
              <h1 className="mrtint">MRTINT</h1>
              <h2 className="title">ثبت‌‌نام در مسترتینت</h2>
              <p className="description">
                برای ثبت‌نام شماره موبایل خود را وارد کنید
              </p>
            </header>
            <form action="" className="signup-form">
              <input
                type="tel"
                placeholder="شماره موبایل"
                className="phone-input"
                onChange={(e) => handleInputValue(e.target.value)}
                onBlur={handleValidTel}
                style={{
                  borderBottom: `2px solid ${borderColor}`,
                }}
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
              {phoneExist && (
                <p className="error-text-bg">
                  &nbsp; &nbsp; &nbsp;با این شماره قبلا ثبت‌نام انجام شده است.
                  لطفا شماره دیگری وارد کنید یا از طریق لینک پایین صفحه وارد
                  شوید.
                </p>
              )}
              <button
                type="submit"
                className="submit-btn"
                onClick={(e) => toAuthenticate(e)}
                disabled={isDisabled}
              >
                <span className="btn-shadow"></span>
                <span className="btn-edge"></span>
                <span className="btn-front text">دریافت کد</span>
              </button>
            </form>
            <p className="rules">
              ورود شما به معنای پذیرش شرایط مسترتینت و قوانین حریم‌ خصوصی است
            </p>
          </div>
          <div className="footer-text">
            <p>
              قبلا ثبت‌نام کردید؟{" "}
              <Link className="login-link" to="/signin">
                وارد شوید
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetNumber;
