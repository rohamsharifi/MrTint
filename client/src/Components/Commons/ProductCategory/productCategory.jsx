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
        <div className='carousel'>
          <Link to="/categories/carpaint" className="category">
            <div className="category-div">
              <img src={carImage} className="category-image car" />
            </div>
            <h3 className="category-description">رنگ‌های اتومبیلی</h3>
            <div className="category-buttons">
              <button className="category-button">مشاهده محصولات</button>
              <button className="category-button">اطلاعات بیشتر</button>
            </div>
          </Link>
          <Link className="category">
            <div className="category-div">
              <img src={wallImage} className="category-image house" />
            </div>
            <h3 className="category-description">رنگ‌های ساختمانی</h3>
            <div className="category-buttons">
              <button className="category-button">مشاهده محصولات</button>
              <button className="category-button">اطلاعات بیشتر</button>
            </div>
          </Link>
          <Link className="category">
            <div className="category-div">
              <img src={woodImage} className="category-image wood" />
            </div>
            <h3 className="category-description">رنگ چوب</h3>
            <div className="category-buttons">
              <button className="category-button">مشاهده محصولات</button>
              <button className="category-button">اطلاعات بیشتر</button>
            </div>
          </Link>
          <Link className="category">
            <div className="category-div">
              <img src={paintingToolImage} className="category-image tools" />
            </div>
            <h3 className="category-description">ابزار رنگ</h3>
            <div className="category-buttons">
              <button className="category-button">مشاهده محصولات</button>
              <button className="category-button">اطلاعات بیشتر</button>
            </div>
          </Link>
          <div className="extra-div">6</div>
        </div>
      </div>
    </section>
  );
};
export default ProductCategory;
