import { useCart } from '../../../Contexts/CartContext';
import './bottomTotalPrice.css';

const BottomTotalPrice = () => {
    const { totalPrice } = useCart();

    return (
        <section className='bottom-total-price-sec'>
            <div className='total-price-div'>
                <p>مجموع قیمت :</p>
                <p>{totalPrice} تومان</p>
            </div>
            <button
                type="submit"
                className="order-completion-btn"
            >
                <span className="btn-shadow"></span>
                <span className="btn-edge"></span>
                <span className="btn-front text order">ادامه و تکمیل سفارش</span>
            </button>
        </section>
    )
}
export default BottomTotalPrice;