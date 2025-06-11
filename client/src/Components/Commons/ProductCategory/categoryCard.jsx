import { Link } from "react-router-dom";

import './categoryCard.css';

const CategoryCard = ({ image, title, link }) => {

    const classname = `category-image ${title === 'رنگ اتومبیلی' ? 'car' : null}`;

    return (
        <div className="category">
            <div className="category-div">
                <img src={image} alt="car paints" className={classname} />
            </div>
            <h3 className="category-description">{title}</h3>
            <div className="category-buttons">
                <Link to={link} style={{ width: '48%' }}>
                    <button className="category-button" style={{ width: '100%' }}>مشاهده محصولات</button>
                </Link>
                <button className="category-button" style={{ width: '48%' }}>اطلاعات بیشتر</button>
            </div>
        </div>
    );
};

export default CategoryCard;