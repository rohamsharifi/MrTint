import React from "react";
import { Link } from "react-router-dom";

import "./productCategory.css";
import carImage from "../../../images/car-paint6.jfif";
import wallImage from "../../../images/wall-paint1.jpg";
import woodImage from "../../../images/wood-paint3.jpg";
import paintingToolImage from "../../../images/painting-tools2.jpg";

const ProductCategory = () => {
  return (
    <section className="product-category">
      <div className="category-head-div">
        <h2 className="category-head">دسته‌بندی محصولات</h2>
      </div>
      <div className="categories">
        <Link to="/categories/carpaint" className="category">
          <div className="category-div">
            <img src={carImage} className="category-image car" />
          </div>
          <p className="category-description">رنگ‌های اتومبیلی</p>
        </Link>
        <Link className="category">
          <div className="category-div">
            <img src={wallImage} className="category-image house" />
          </div>
          <p className="category-description">رنگ‌های ساختمانی</p>
        </Link>
        <Link className="category">
          <div className="category-div">
            <img src={woodImage} className="category-image wood" />
          </div>
          <p className="category-description">رنگ چوب</p>
        </Link>
        <Link className="category">
          <div className="category-div">
            <img src={paintingToolImage} className="category-image tools" />
          </div>
          <p className="category-description">ابزار رنگ</p>
        </Link>
      </div>
    </section>
  );
};
export default ProductCategory;
