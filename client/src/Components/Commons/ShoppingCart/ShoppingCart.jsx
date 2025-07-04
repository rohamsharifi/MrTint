import { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../Navbar/navbar';
import SideMenu from '../SideMenu/sideMenu';
import Footer from '../Footer/Footer';
import EmptyCart from './emptyCart';

import './shopping-cart.css';
import FullCart from './fullCart';

const ShoppingCart = () => {
    let [opacity, SetOpacity] = useState("1");
    let [sidenavRight, setSidenavRight] = useState("-220px");
    const [cartProducts, setCartProducts] = useState([]);
    const [productCounts, setProductCounts] = useState([]);

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
                setCartProducts(res.data.products);
                const newProductCounts = res.data.products.map(p => (p.customerproduct.productCount));
                setProductCounts(newProductCounts);
            }).catch(err => {
                console.error('Error fetching products:', err);
            });
        } else {
            const products = JSON.parse(localStorage.getItem('guestCart')) || [];
            const productIds = products.map((p) => (p.product));
            axios.post('http://localhost:5000/api/cart/get-guest-products', {
                productIds: productIds
            }).then(res => {
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
            <div style={{ opacity: opacity, backgroundColor: '#f0f0f5' }}>
                <Navbar handleOpenSidenav={handleOpenSidenav} />
                {cartProducts.length === 0 ? (
                    <EmptyCart />
                ) : <FullCart
                    products={cartProducts}
                    productCounts={productCounts}
                    setCartProducts={setCartProducts}
                />
                }
                <Footer />
            </div>
        </div>
    )
}

export default ShoppingCart;