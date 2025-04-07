import { React, useState } from "react";
import Header from "../../Header/header";
import Navbar from "../../Navbar/navbar";
import SideMenu from "../../SideMenu/sideMenu";
import CarSpecifications from "./carSpecifications";

const CarPaint = () => {
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
      <div
        className="home-page"
        style={{ opacity: opacity, paddingBottom: "200px" }}
      >
        <Header />
        <Navbar handleOpenSidenav={handleOpenSidenav} />
        <CarSpecifications />
      </div>
    </main>
  );
};
export default CarPaint;
