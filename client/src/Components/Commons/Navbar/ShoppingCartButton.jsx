import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../../../Contexts/CartContext";

import "./shopping-cart-button.css";

const ShoppingCartButton = () => {
    const { count } = useCart();

    const spanClass = `product-count-span ${count === 0 ? 'none' : ''}`

    return (
        <Link to="/shopping-cart" className="shopping-cart-link">
            <CiShoppingCart className="shopping-cart" />
            <span className={spanClass}>{count}</span>
        </Link>
    )
}

export default ShoppingCartButton;