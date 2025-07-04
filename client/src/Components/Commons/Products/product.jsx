import { useState, useEffect } from 'react';
import axios from 'axios';

import tempImage from '../../../images/arttools.jpg'

import './product.css';
import ProductCount from './productCount';

const Product = ({ product, index, length }) => {
    let [productCount, setProductCount] = useState(1);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [inventoryErr, setInventoryErr] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

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

                        <ProductCount
                            setProductCount={setProductCount}
                            setInventoryErr={setInventoryErr}
                            productCount={productCount}
                            product={product}
                        />

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