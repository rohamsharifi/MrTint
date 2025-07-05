import { useState } from 'react';
import { useCart } from '../../../Contexts/CartContext';
import axios from 'axios';

import ProductCount from '../Products/productCount';
import tempImage from '../../../images/arttools.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import './cartProduct.css';

const CartProduct = ({ product, count }) => {
    const { fetchCartCount, fetchCartProducts } = useCart();

    let [productCount, setProductCount] = useState(count);
    const [inventoryErr, setInventoryErr] = useState(false);

    const handleDeleteProduct = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.delete(`http://localhost:5000/api/cart/delete/${product.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res.data.message);
                fetchCartCount();
                fetchCartProducts();

            } catch (err) {
                console.error('Error deleting product:', err);
            }
        } else {
            let products = JSON.parse(localStorage.getItem('guestCart')) || [];
            products = products.filter(p => p.product !== product.id);
            localStorage.setItem('guestCart', JSON.stringify(products));
            fetchCartCount();
            fetchCartProducts();
        }
    }

    return (
        <section className='cart-product-sec'>
            <div className='cart-product-main-info'>
                <div className='cart-product-image-div'>
                    <img src={tempImage} alt="سلام" className='cart-product-image-img' />
                </div>
                <div className='cart-product-info'>
                    <p className='cart-product-name'>{product.name}</p>
                    <p className='cart-product-price'>{product.price} &nbsp;&nbsp; تومان</p>
                </div>
            </div>
            <div className='cart-product-count'>
                <FontAwesomeIcon
                    icon={faXmark}
                    className='cart-product-cancel'
                    onClick={handleDeleteProduct}
                />
                <ProductCount
                    setProductCount={setProductCount}
                    setInventoryErr={setInventoryErr}
                    productCount={productCount}
                    product={product}
                />
            </div>
        </section>
    );
};

export default CartProduct;