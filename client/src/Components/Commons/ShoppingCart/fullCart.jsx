import { useState, useEffect } from 'react';

import CartProducts from './cartProducts';
import AsideTotalPrice from './asideTotalPrice';
import BottomTotalPrice from './BottomTotalPrice';

import './fullCart.css';

const FullCart = () => {

    return (
        <main className='full-cart-main'>
            <CartProducts />
            <AsideTotalPrice />
            <BottomTotalPrice />
        </main>
    )
}

export default FullCart;