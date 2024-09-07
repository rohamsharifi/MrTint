import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Header/header";
import Navbar from "../Navbar/navbar";
import SideMenu from "../SideMenu/sideMenu";
import ProductCategory from "../ProductCategory/productCategory";

import "./home.css";

const Home = () => {
  const location = useLocation();
  const data = location.state;
  let phoneNumber = "";
  if (data !== null) {
    phoneNumber = data.phoneNumber;
  }

  let [opacity, SetOpacity] = useState("1");
  let [sidenavRight, setSidenavRight] = useState("-220px");

  const handleCloseSidenav = () => {
    setSidenavRight("-220px");
    SetOpacity("1");
  };

  const handleOpenSidenav = () => {
    setSidenavRight("0");
    SetOpacity("0.2");
  };

  return (
    <main>
      <SideMenu
        sidenavRight={sidenavRight}
        handleCloseSidenav={handleCloseSidenav}
      />
      <div className="home-page" style={{ opacity: opacity }}>
        <Header />
        <Navbar handleOpenSidenav={handleOpenSidenav} />
        <ProductCategory />
      </div>
    </main>
  );
};

export default Home;
