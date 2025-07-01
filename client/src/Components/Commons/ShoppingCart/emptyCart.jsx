import { Link } from 'react-router-dom';

import emptyCart from '../../../images/empty-cart.jpg';

import './emptyCart.css';

const EmptyCart = () => {
    return (
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
    );
};

export default EmptyCart;