import React, { useState } from "react";

import "./carSpecifications.css";

const CarSpecifications = () => {
  let [listHeight, setListHeight] = useState("0");
  let [listShadow, setListShadow] = useState("none");
  let [listBorder, setListBorder] = useState("none");
  let [listOverflow, setListOverflow] = useState("hidden");

  const handleFocusBrandInput = () => {
    setListHeight("210px");
    setListShadow("0 0 4px rgb(204, 204, 204)");
    setListBorder("1px solid rgb(212, 214, 214)");
    setListOverflow("scroll");
  };

  const handleBlurBrandInput = () => {
    setListHeight("0");
    setListShadow("none");
    setListBorder("none");
    setListOverflow("hidden");
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
        />
        <ul
          className="car-brands"
          style={{
            height: listHeight,
            boxShadow: listShadow,
            border: listBorder,
            overflowY: listOverflow,
          }}
        >
          <li className="car-brand">پراید</li>
          <li className="car-brand">پرشیا</li>
          <li className="car-brand">سمند</li>
          <li className="car-brand">دنا</li>
          <li className="car-brand">کوییک</li>
          <li className="car-brand" style={{ borderBottom: "none" }}>
            تیبا
          </li>
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
