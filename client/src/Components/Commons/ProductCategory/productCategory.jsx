import React from "react";
import { Link } from "react-router-dom";

import "./productCategory.css";

const ProductCategory = () => {
  return (
    <section className="product-category">
      <div className="category-head-div">
        <h2 className="category-head">دسته‌بندی محصولات</h2>
      </div>
      <div className="categories-mobile">
        <Link to="/categories/carpaint" className="category">
          <div className="car-image category-image"></div>
          <p className="category-description">رنگ‌های اتومبیلی</p>
        </Link>
        <Link className="category">
          <div className="house-image category-image"></div>
          <p className="category-description">رنگ‌های ساختمانی</p>
        </Link>
        <Link className="category">
          <div className="wood-image category-image"></div>
          <p className="category-description">رنگ چوب</p>
        </Link>
        <Link className="category">
          <div className="tools-image category-image"></div>
          <p className="category-description">ابزار رنگ</p>
        </Link>
        <Link className="category">
          <div className="spray-image category-image"></div>
          <p className="category-description">رنگ اسپری</p>
        </Link>
        <Link className="category">
          <div className="gear-image category-image"></div>
          <p className="category-description">رنگ‌های صنعتی</p>
        </Link>
      </div>
      <div className="last-row-mobile">
        <div className="arttools-image category-image"></div>
      </div>
      <div className="description-div-mobile">
        <p className="last-category-description">ابزار و لوازم هنری</p>
      </div>

      <div className="categories-tablet-first">
        <div className="category">
          <div className="car-image category-image"></div>
          <p className="category-description">رنگ‌های اتومبیلی</p>
        </div>
        <div className="category">
          <div className="house-image category-image"></div>
          <p className="category-description">رنگ‌های ساختمانی</p>
        </div>
        <div className="category">
          <div className="wood-image category-image"></div>
          <p className="category-description">رنگ چوب</p>
        </div>
        <div className="category">
          <div className="tools-image category-image"></div>
          <p className="category-description">ابزار رنگ</p>
        </div>
      </div>
      <div className="categories-tablet-second">
        <div className="category">
          <div className="spray-image category-image"></div>
          <p className="category-description">رنگ اسپری</p>
        </div>
        <div className="category">
          <div className="gear-image category-image"></div>
          <p className="category-description">رنگ‌های صنعتی</p>
        </div>
        <div className="category">
          <div className="arttools-image category-image"></div>
          <p className="category-description">رنگ و ابزار هنری</p>
        </div>
      </div>
    </section>
  );
};
export default ProductCategory;
