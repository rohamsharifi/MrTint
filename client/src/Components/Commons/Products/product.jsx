import { useState, useEffect } from 'react';
import axios from 'axios';

import tempImage from '../../../images/arttools.jpg'

import './product.css';

const Product = ({ product, index, length }) => {
    let [productCount, setProductCount] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [inventoryErr, setInventoryErr] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const increaseProductCount = () => {
        if (productCount < product.inventory)
            setProductCount(productCount + 1);
        else
            setInventoryErr(true);
    }

    const decreaseProductCount = () => {
        if (productCount > 1) {
            setProductCount(productCount - 1);
            setInventoryErr(false);
        }
    }

    const changeProductCount = (value) => {
        let newValue = '';
        for (let i = 0; i < value.length; i++) {
            const code = value.charCodeAt(i);
            if (code > 47 && code < 58) {
                newValue += value[i];
            }
        }

        const number = Number(newValue);

        if (newValue !== '') {
            setProductCount(number);
        } else {
            setProductCount('');
        }
    }

    const blurProductCount = () => {
        if (productCount === '' || productCount === 0) setProductCount(1);
        if (productCount > product.inventory) {
            setProductCount(product.inventory);
            setInventoryErr(true);
        }
    }

    const addToCart = (product) => {
        const token = localStorage.getItem('token');
        if (isLoggedIn) {
            axios
                .post('http://localhost:5000/api/cart/add', {
                    productId: product,
                    count: productCount
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        } else {
            const existingCart = JSON.parse(localStorage.getItem('guestCart')) || [];
            const existingProductIndex = existingCart.findIndex(item => item.product === product);
            console.log(existingProductIndex);

            if (existingProductIndex === -1) {
                existingCart.push({ product, productCount });
            }

            localStorage.setItem('guestCart', JSON.stringify(existingCart));

            console.log('Guest cart updated:', existingCart);
        }
    }

    let productDivClass = `product-div ${index % 2 === 1 ? 'last-col' : ''}`;
    productDivClass += `${index === 0 ? ' first-child' : ''}`;
    productDivClass += `${index === 1 ? ' second-child' : ''}`;
    productDivClass += `${index === length - 1 ? ' last-child' : ''}`;
    productDivClass += `${index === length - 2 ? ' second-last-child' : ''}`;
    productDivClass += `${index === length - 3 ? ' third-last-child' : ''}`;
    productDivClass += `${index === 2 ? ' third-child' : ''}`;
    productDivClass += `${index % 3 === 2 ? ' last-col-large' : ''}`;

    let minusClass = `count-product-button decrease ${productCount === 1 ? 'disabled' : ''}`;
    let plusClass = `count-product-button increase ${productCount >= product.inventory ? 'disabled' : ''}`;

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
            {
                product.inventory > 0 ? (

                    <div className='add-to-cart'>
                        <button
                            className='add-to-cart-button'
                            onClick={() => addToCart(product.id)}
                        >
                            افزودن به سبد خرید
                        </button>
                        <div className='count-product-div'>
                            <button
                                className={plusClass}
                                onClick={increaseProductCount}
                            >
                                +
                            </button>
                            <input
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={productCount}
                                onChange={(e) => changeProductCount(e.target.value)}
                                onBlur={blurProductCount}
                                className='count-product-input'
                            />
                            <button
                                className={minusClass}
                                onClick={decreaseProductCount}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='unavailable-div'>
                        <p className='unavailable-txt'>ناموجود</p>
                    </div>
                )
            }
            {
                inventoryErr &&
                <div className='inventory-err-div'>
                    <p className='inventory-err-txt'>موجودی فروشگاه {product.inventory} عدد می‌باشد.</p>
                </div>
            }
        </div>
    );
}
export default Product;