import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = ({ handleOpenSidenav }) => {
  let [buttonDisplay, setButtinDisplay] = useState("flex");
  let [divWidth, setDivWidth] = useState("200px");

  const handleFocus = () => {
    setButtinDisplay("none");
    setDivWidth("100%");
  };

  const handleBlur = ({}) => {
    setDivWidth("200px");
    setTimeout(() => setButtinDisplay("flex"), 540);
  };

  return (
    <nav>
      <section className="nav-section">
        <div className="ham-menu" style={{ width: divWidth }}>
          <FontAwesomeIcon
            icon={faBars}
            className="bars"
            onClick={handleOpenSidenav}
          />
          <div className="search-box">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="magnifying-glass"
            />
            <input
              type="text"
              className="search-input"
              placeholder="جستجو..."
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
        </div>
        <Link to="/signin" style={{ textDecoration: "none" }}>
          <button className="signin-button" style={{ display: buttonDisplay }}>
            ورود / ثبت‌نام
          </button>
        </Link>
      </section>
      <div className="menu">
        <ul className="menu-list">
          <Link className="menu-link">
            <li className="menu-item home-item">صفحه اصلی</li>
          </Link>
          <Link className="menu-link">
            <li className="menu-item">رنگ‌های سفارشی</li>
          </Link>
          <Link className="menu-link">
            <li className="menu-item">درباره ما</li>
          </Link>
          <Link className="menu-link">
            <li className="menu-item">تماس با ما</li>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
