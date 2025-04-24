import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { CiShoppingCart } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri"
import { CiShoppingBasket } from "react-icons/ci"
import { CiUser } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

import "./navbar.css";

const Navbar = ({ handleOpenSidenav }) => {
  let [buttonDisplay, setButtonDisplay] = useState("inline");
  let [userIconDisplay, setUserIconDisplay] = useState("flex");
  let [divWidth, setDivWidth] = useState("200px");
  let [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleFocus = () => {
    setButtonDisplay("none");
    setUserIconDisplay("none")
    setDivWidth("100%");
  };

  const handleBlur = ({ }) => {
    setDivWidth("200px");
    setTimeout(() => setButtonDisplay("inline"), 540);
    setTimeout(() => setUserIconDisplay("flex"), 540);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div
              className={`profile-section ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(prev => !prev)}
              ref={userMenuRef}
            >
              <div className="user-icon-container" style={{ display: userIconDisplay }}>
                <CiUser className="user-icon" />
                <RiArrowDropDownFill className={`user-icon-arrow ${isMenuOpen ? "active" : ""}`} />
              </div>
              {isMenuOpen && (
                <ul className="user-dropdown-menu">
                  <li>
                    <Link to="orders" className="user-menu-link">
                      <CiShoppingBasket className="user-menu-icons" />
                      سفارش‌ها
                    </Link>
                  </li>
                  <li>
                    <Link to="exit" className="user-menu-link">
                      <CiLogout className="user-menu-icons" />
                      خروج از حساب کاربری
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <button className="signin-button" style={{ display: buttonDisplay }}>
                ورود یا ثبت‌نام
              </button>
            </Link>
          )}
          <Link to="/shopping-cart" className="shopping-cart-link">
            <CiShoppingCart className="shopping-cart" />
          </Link>
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
