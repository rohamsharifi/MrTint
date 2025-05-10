import { useState } from 'react';
import { Link } from 'react-router-dom';

import emptyCart from '../../../images/empty-cart.jpg'
import Navbar from '../Navbar/navbar';
import SideMenu from '../SideMenu/sideMenu';
import Footer from '../Footer/Footer'

import './shopping-cart.css';

const ShoppingCart = () => {
    let [opacity, SetOpacity] = useState("1");
    let [sidenavRight, setSidenavRight] = useState("-220px");

    const handleCloseSidenav = () => {
        setSidenavRight("-220px");
        SetOpacity("1");
    };

    const handleOpenSidenav = () => {
        setSidenavRight("0");
        SetOpacity("0.2");
    };

    return (
        <div>
            <SideMenu
                sidenavRight={sidenavRight}
                handleCloseSidenav={handleCloseSidenav}
            />
            <div style={{ opacity: opacity }}>
                <Navbar handleOpenSidenav={handleOpenSidenav} />
                <section className='empty-cart-sec'>
                    <div className='empty-cart-div'>
                        <img src={emptyCart} alt="empty-cart" className='empty-cart-img' />
                    </div>
                    <h2 className='empty-cart-h'>سبد خرید شما خالی است!</h2>
                    <p className='empty-cart-p'>برای انتخاب محصول می‌توانید از صفحات زیر بازدید کنید:</p>
                    <div className='empty-cart-links'>
                        <Link className='empty-cart-link'>
                            <button className='empty-cart-button'>رنگ‌های اتومبیلی</button>
                        </Link>
                        <Link className='empty-cart-link'>
                            <button className='empty-cart-button'>رنگ‌های ساختمانی</button>
                        </Link>
                        <Link className='empty-cart-link'>
                            <button className='empty-cart-button'>رنگ چوب</button></Link>
                        <Link className='empty-cart-link'>
                            <button className='empty-cart-button'>ابزار رنگ</button>
                        </Link>
                        <Link className='empty-cart-link'>
                            <button className='empty-cart-button'>پرفروش‌های این ماه</button>
                        </Link>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    )
}

export default ShoppingCart;