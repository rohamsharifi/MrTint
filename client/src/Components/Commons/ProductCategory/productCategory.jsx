import CategoryCard from "./categoryCard";

import carImage from "../../../images/car-paint6.jfif";
import wallImage from "../../../images/wall-paint1.jpg";
import woodImage from "../../../images/wood-paint3.jpg";
import paintingToolImage from "../../../images/painting-tools2.jpg";
import gearImage from '../../../images/gear.jpg';

import "./productCategory.css";

const ProductCategory = () => {

  const categoryCards = [
    { image: paintingToolImage, title: 'ابزار رنگ', link: '/category/painting_tools' },
    { image: carImage, title: 'رنگ اتومبیلی', link: '/category/car_paint' },
    { image: woodImage, title: 'رنگ چوب', link: '/category/wood_paint' },
    { image: wallImage, title: 'رنگ ساختمانی', link: '/category/house_paint' },
    { image: gearImage, title: 'رنگ صنعتی', link: '/category/industrial_paint' },
  ]
  return (
    <section className="product-category">
      <div className="category-head-div">
        <h2 className="category-head">دسته‌بندی&nbsp; رنگ&nbsp; و &nbsp;ابزار</h2>
      </div>
      <div className="categories">
        <div className='carousel'>

          {categoryCards.map((c) => {
            return (
              <CategoryCard image={c.image} title={c.title} link={c.link} />
            );
          })}

          <div className="extra-div">6</div>
        </div>
      </div>
    </section>
  );
};
export default ProductCategory;
