import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import "./shopping-cart-button.css";

const ShoppingCartButton = () => {
    const [count, setCount] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!!token) {

        } else {
            const products = JSON.parse(localStorage.getItem('guestCart')) || [];
            setCount(products.length);
        }
    }, []);



    return (
        <Link to="/shopping-cart" className="shopping-cart-link">
            <CiShoppingCart className="shopping-cart" />
            <span className='product-count-span'>{count}</span>
        </Link>
    )
}

export default ShoppingCartButton;