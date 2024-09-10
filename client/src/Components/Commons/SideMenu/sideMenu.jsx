import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./side-menu.css";

const SideMenu = ({ sidenavRight, handleCloseSidenav }) => {
  return (
    <aside className="sidenav" style={{ right: sidenavRight }}>
      <FontAwesomeIcon
        icon={faXmark}
        className="xmark"
        onClick={handleCloseSidenav}
      />
      <ul className="nav-list">
        <Link to="/" className="nav-link">
          <li className="nav-item active">صفحه اصلی</li>
        </Link>
        <Link className="nav-link">
          <li className="nav-item">رنگ‌های سفارشی</li>
        </Link>
        <Link className="nav-link">
          <li className="nav-item">درباره ما</li>
        </Link>
        <Link className="nav-link">
          <li className="nav-item">تماس با ما</li>
        </Link>
      </ul>
    </aside>
  );
};
export default SideMenu;
