import { useState, useEffect } from 'react';

import CartProducts from './cartProducts';
import AsideTotalPrice from './asideTotalPrice';
import BottomTotalPrice from './BottomTotalPrice';

import './fullCart.css';

const FullCart = ({ products, productCounts, setCartProducts }) => {
    const [totalPrice, setTotalPrice] = useState();

    useEffect(() => {
        let price = 0;

        products.map((p) => {
            price += p.price;
        })

        setTotalPrice(price);
    }, [])

    return (
        <main className='full-cart-main'>
            <CartProducts
                products={products}
                productCounts={productCounts}
                setCartProducts={setCartProducts}
            />
            <AsideTotalPrice price={totalPrice} count={products.length} />
            <BottomTotalPrice price={totalPrice} />
        </main>
    )
}

export default FullCart;