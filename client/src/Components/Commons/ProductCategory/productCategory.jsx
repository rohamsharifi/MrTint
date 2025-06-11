import CategoryCard from "./categoryCard";

import carImage from "../../../images/car-paint6.jfif";
import wallImage from "../../../images/wall-paint1.jpg";
import woodImage from "../../../images/wood-paint3.jpg";
import paintingToolImage from "../../../images/painting-tools2.jpg";
import gearImage from '../../../images/gear.jpg';

import "./productCategory.css";

const ProductCategory = () => {

  const categoryCards = [
    { image: paintingToolImage, title: 'ابزار رنگ', link: '/category/paintingTools' },
    { image: carImage, title: 'رنگ اتومبیلی', link: '/category/carPaint' },
    { image: woodImage, title: 'رنگ چوب', link: '/category/woodPaint' },
    { image: wallImage, title: 'رنگ ساختمانی', link: '/category/housePaint' },
    { image: gearImage, title: 'رنگ صنعتی', link: '/category/industrialPaint' },
  ]
  return (
    <section className="product-category">
      <div className="category-head-div">
        <h2 className="category-head">دسته‌بندی محصولات</h2>
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
