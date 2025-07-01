import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";

import "./shopping-cart-button.css";

const ShoppingCartButton = () => {
    const [count, setCount] = useState();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!!token) {
            axios
                .post('http://localhost:5000/api/cart/count', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then((res) => {
                    setCount(res.data.count)
                }).catch((err) => console.log(err));

        } else {
            const products = JSON.parse(localStorage.getItem('guestCart')) || [];
            setCount(products.length);
        }
    }, []);

    const spanClass = `product-count-span ${count === 0 ? 'none' : ''}`

    return (
        <Link to="/shopping-cart" className="shopping-cart-link">
            <CiShoppingCart className="shopping-cart" />
            <span className={spanClass}>{count}</span>
        </Link>
    )
}

export default ShoppingCartButton;