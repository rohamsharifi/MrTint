import { useState, useEffect } from 'react';
import { useCart } from '../../../Contexts/CartContext';

import Navbar from '../Navbar/navbar';
import SideMenu from '../SideMenu/sideMenu';
import Footer from '../Footer/Footer';
import EmptyCart from './emptyCart';

import './shopping-cart.css';
import FullCart from './fullCart';

const ShoppingCart = () => {
    let [opacity, SetOpacity] = useState("1");
    let [sidenavRight, setSidenavRight] = useState("-220px");

    const {
        cartProducts,
        isLoading,
        fetchCartCount,
        fetchCartProducts,
        setIsLoading,
        calculateTotalPrice
    } = useCart();

    const handleCloseSidenav = () => {
        setSidenavRight("-220px");
        SetOpacity("1");
    };

    const handleOpenSidenav = () => {
        setSidenavRight("0");
        SetOpacity("0.2");
    };

    useEffect(() => {
        const fetchAll = async () => {
            await fetchCartCount();
            await fetchCartProducts();
            setIsLoading(false);
        };

        fetchAll();
    }, []);

    useEffect(() => {
        if (cartProducts.length > 0) {
            calculateTotalPrice();
        }
    }, [cartProducts]);

    return (
        <div>
            <SideMenu
                sidenavRight={sidenavRight}
                handleCloseSidenav={handleCloseSidenav}
            />
            <div style={{ opacity: opacity, backgroundColor: '#f0f0f5' }}>
                <Navbar handleOpenSidenav={handleOpenSidenav} />

                {isLoading ? (
                    <h1>Loading...</h1>
                ) : (
                    cartProducts.length > 0 ? <FullCart /> : <EmptyCart />
                )}

                <Footer />
            </div>
        </div>
    )
}

export default ShoppingCart;