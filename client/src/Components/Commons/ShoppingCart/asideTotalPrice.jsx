import { useCart } from '../../../Contexts/CartContext';

import './asideTotalPrice.css';

const AsideTotalPrice = () => {
    const { totalPrice, cartProducts } = useCart();
    const count = cartProducts.length;

    return (
        <section className='aside-total-price-sec'>
            <div className='aside-container'>
                <div className='payment-details-div'>
                    <h4 className='payment-details-head'>جزئیات پرداخت</h4>
                </div>
                <div className='payment-details-body'>
                    <div style={{ marginTop: '0.6rem' }}>
                        <p className='text'>تعداد اقلام سبد :</p>
                        <p className='number'>{count}</p>
                    </div>
                    <div>
                        <p className='text' style={{ lineHeight: '0' }}>مجموع قیمت :</p>
                        <p className='number' style={{ lineHeight: '0' }}>{totalPrice}</p>
                    </div>
                </div>
                <button
                    type="submit"
                    className="order-completion-btn-aside"
                >
                    <span className="btn-shadow"></span>
                    <span className="btn-edge"></span>
                    <span className="btn-front text order-aside">ادامه و تکمیل سفارش</span>
                </button>
            </div>
        </section>
    );
};

export default AsideTotalPrice;