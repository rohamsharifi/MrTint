import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ShoppingCartButton from "./ShoppingCartButton";
import UserDropdownMenu from "./UserDropdownMenu";
import LoginButton from "./LoginButton";
import "./navbar.css";

const Navbar = ({ handleOpenSidenav }) => {
  let [buttonDisplay, setButtonDisplay] = useState("flex");
  let [userIconDisplay, setUserIconDisplay] = useState("flex");
  let [divWidth, setDivWidth] = useState("200px");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleFocus = () => {
    setButtonDisplay("none");
    setUserIconDisplay("none")
    setDivWidth("100%");
  };

  const handleBlur = () => {
    setDivWidth("160px");
    setTimeout(() => setButtonDisplay("flex"), 540);
    setTimeout(() => setUserIconDisplay("flex"), 540);
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
        <div className="cart-section">
          {isLoggedIn ? (
            <UserDropdownMenu userIconDisplay={userIconDisplay} />
          ) : (
            <LoginButton buttonDisplay={buttonDisplay} />
          )}
          <ShoppingCartButton />
        </div>
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
