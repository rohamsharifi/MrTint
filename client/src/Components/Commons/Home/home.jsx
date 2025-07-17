import { useState } from "react";
import { Helmet } from "react-helmet-async";

import Header from "../Header/header";
import Navbar from "../Navbar/navbar";
import SideMenu from "../SideMenu/sideMenu";
import ProductCategory from "../ProductCategory/productCategory";
import FeatureCard from "../FeatureCards/FeatureCard";
import CommonQuestions from "../CommonQuestions/CommonQuestions";

import "./home.css";
import Footer from "../Footer/Footer";
import MrTintIntro from "../MrTintIntro/mrTintIntro";

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
      <Helmet>
        <title>فروشگاه اینترنتی خرید انواع رنگ | ارسال فوری</title>
        <meta
          name="description"
          content="بزرگترین فروشگاه خرید انواع رنگ اتومبیلی، ساختمانی، چوب، صنعتی و ملزومات رنگ سنباده، .تینر، بتونه و ... با قیمت عالی و ارسال فوری به سراسر کشور."
        />
      </Helmet>


      <SideMenu
        sidenavRight={sidenavRight}
        handleCloseSidenav={handleCloseSidenav}
      />
      <div className="home-page" style={{ opacity: opacity }}>
        <Header />
        <Navbar handleOpenSidenav={handleOpenSidenav} />
        <MrTintIntro />
        <ProductCategory />
        <FeatureCard />
        <CommonQuestions />
        <Footer />
      </div>
    </main>
  );
};

export default Home;
