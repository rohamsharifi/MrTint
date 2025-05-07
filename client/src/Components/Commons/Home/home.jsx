import React, { useState } from "react";
import Header from "../Header/header";
import Navbar from "../Navbar/navbar";
import SideMenu from "../SideMenu/sideMenu";
import ProductCategory from "../ProductCategory/productCategory";
import FeatureCard from "../FeatureCards/FeatureCard";
import CommonQuestions from "../CommonQuestions/CommonQuestions";

import "./home.css";

const Home = () => {
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
        <FeatureCard />
        <CommonQuestions />
      </div>
    </main>
  );
};

export default Home;
