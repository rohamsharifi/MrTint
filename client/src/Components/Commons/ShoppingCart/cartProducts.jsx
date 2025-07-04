import CartProduct from "./CartProduct";

import './cartProducts.css';

const CartProducts = ({ products, productCounts, setCartProducts }) => {
    return (
        <section className='cart-products-sec'>
            {products.map((p, index) => {
                return (
                    <CartProduct
                        product={p}
                        count={productCounts[index]}
                        setCartProducts={setCartProducts}
                    />
                )
            })}
        </section>
    );
};

export default CartProducts;