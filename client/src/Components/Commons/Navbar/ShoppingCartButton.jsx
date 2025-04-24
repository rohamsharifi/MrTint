import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import "./shopping-cart-button.css";

const ShoppingCartButton = () => {
    return (
        <Link to="/shopping-cart" className="shopping-cart-link">
            <CiShoppingCart className="shopping-cart" />
        </Link>
    )
}

export default ShoppingCartButton;