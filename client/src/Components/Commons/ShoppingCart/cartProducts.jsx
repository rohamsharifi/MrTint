import CartProduct from "./CartProduct";
import { useCart } from "../../../Contexts/CartContext";

import './cartProducts.css';

const CartProducts = () => {
    const { cartProducts, productCounts } = useCart();

    return (
        <section className='cart-products-sec'>
            {cartProducts.map((p, index) => {
                return (
                    <CartProduct
                        product={p}
                        count={productCounts[index]}
                    />
                )
            })}
        </section>
    );
};

export default CartProducts;