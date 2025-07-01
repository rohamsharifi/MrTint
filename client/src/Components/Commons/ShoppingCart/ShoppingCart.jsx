import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../Navbar/navbar';
import SideMenu from '../SideMenu/sideMenu';
import Footer from '../Footer/Footer';
import EmptyCart from './emptyCart';
import CartProducts from './cartProducts';

import './shopping-cart.css';

const ShoppingCart = () => {
    let [opacity, SetOpacity] = useState("1");
    let [sidenavRight, setSidenavRight] = useState("-220px");
    const [cartProducts, setCartProducts] = useState([]);

    const handleCloseSidenav = () => {
        setSidenavRight("-220px");
        SetOpacity("1");
    };

    const handleOpenSidenav = () => {
        setSidenavRight("0");
        SetOpacity("0.2");
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!!token) {
            axios.post('http://localhost:5000/api/cart/get-products', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data.products);
                setCartProducts(res.data.products);
            }).catch(err => {
                console.error('Error fetching products:', err);
            });
        }
    }, []);

    return (
        <div>
            <SideMenu
                sidenavRight={sidenavRight}
                handleCloseSidenav={handleCloseSidenav}
            />
            <div style={{ opacity: opacity }}>
                <Navbar handleOpenSidenav={handleOpenSidenav} />
                {cartProducts.length === 0 ? (
                    <EmptyCart />
                ) : <CartProducts products={cartProducts} />}
                <Footer />
            </div>
        </div>
    )
}

export default ShoppingCart;