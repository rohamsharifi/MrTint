import React, { useState } from "react";

import "./carSpecifications.css";

const CarSpecifications = () => {
  let [listRight, setListRight] = useState("-200px");
  let [carInputValue, setCarInputValue] = useState("");

  const cars = [
    { name: "پراید", id: 0 },
    { name: "پژو پرشیا", id: 1 },
    { name: "پژو ۲۰۶", id: 2 },
    { name: "کوییک", id: 3 },
    { name: "دنا", id: 4 },
    { name: "تیبا", id: 5 },
    { name: "شاهین", id: 6 },
    { name: "سمند", id: 7 },
  ];

  const handleFocusBrandInput = () => {
    setListRight("33px");
  };

  const handleBlurBrandInput = () => {
    setListRight("-200px");
  };

  const handleClickList = (car) => {
    setCarInputValue(car.name);
    setListRight("-200px");
  };

  const handleClickEmptyList = () => {
    setCarInputValue("");
    setListRight("-200px");
  };

  const emptyList = () => {
    const listArray = cars.filter((car) => car.name.startsWith(carInputValue));
    if (listArray.length === 0) {
      return (
        <li className="car-brand" onClick={handleClickEmptyList}>
          موردی یافت نشد!
        </li>
      );
    }
  };

  return (
    <section className="car-specifications-section">
      <header>
        <h2 className="car-specifications-title">ساخت رنگ ماشین شما</h2>
        <p className="car-specifications-description">
          با وارد کردن اطلاعات زیر، رنگ ماشین شما ساخته و برای شما ارسال می‌شود
        </p>
      </header>
      <form action="" className="car-specifications-form">
        <label htmlFor="" className="car-brand-label">
          برند ماشین:
        </label>
        <input
          type="text"
          className="car-brand-input"
          spellCheck="false"
          onFocus={handleFocusBrandInput}
          onBlur={handleBlurBrandInput}
          value={carInputValue}
          onChange={(e) => setCarInputValue(e.target.value)}
        />
        <ul className="car-brands" style={{ right: listRight }}>
          {cars.map((car) => {
            return car.name.startsWith(carInputValue) ? (
              <li
                className="car-brand"
                key={car.id}
                onClick={() => handleClickList(car)}
              >
                {car.name}
              </li>
            ) : null;
          })}
          {emptyList()}
        </ul>
        <label htmlFor="" className="color-code-label">
          کد رنگ ماشین:
        </label>
        <input type="text" className="color-code-input" spellCheck="false" />
      </form>
    </section>
  );
};
export default CarSpecifications;
