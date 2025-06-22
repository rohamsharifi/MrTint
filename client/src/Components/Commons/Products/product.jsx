import { useState } from 'react';
import tempImage from '../../../images/arttools.jpg'

import './product.css';

const Product = ({ product, index, length }) => {

    let [productCount, setProductCount] = useState(1);

    const increaseProductCount = () => {
        setProductCount(productCount + 1);
    }

    const decreaseProductCount = () => {
        if (productCount > 1)
            setProductCount(productCount - 1);
    }

    let productDivClass = `product-div ${index % 2 === 1 ? 'last-col' : ''}`;
    productDivClass += `${index === 1 ? ' second-child' : ''}`;
    productDivClass += `${index === length - 2 ? ' second-last-child' : ''}`;
    productDivClass += `${index === 2 ? ' third-child' : ''}`;
    productDivClass += `${index % 3 === 2 ? ' last-col-large' : ''}`
    console.log(productDivClass)

    return (
        <div className={productDivClass}>
            <div className='product-main-info'>
                <div className='product-image-div-medium'>
                    <img src={tempImage} alt={product.keyWord} className='product-image-img-medium' />
                </div>
                <div className='title-and-price'>
                    <p className='product-name'>{product.name}</p>
                    <p className='product-price'>{`قیمت : ${product.price} تومان`}</p>
                </div>
                <div className='product-image-div'>
                    <img src={tempImage} alt={product.keyWord} className='product-image-img' />
                </div>
            </div>
            <div className='add-to-cart'>
                <button className='add-to-cart-button'>
                    افزودن به سبد خرید
                </button>
                <div className='count-product-div'>
                    <button
                        className='count-product-button increase'
                        onClick={increaseProductCount}
                    >
                        +
                    </button>
                    <input
                        type="tel"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={productCount}
                        className='count-product-input'
                    />
                    <button
                        className='count-product-button decrease'
                        onClick={decreaseProductCount}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Product;