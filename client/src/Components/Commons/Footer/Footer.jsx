import { useState } from 'react';
import { Link } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa';

import './footer.css';

const Footer = () => {
    let [isExpanded, setIsExpanded] = useState(false);

    const handleExpand = () => {
        setIsExpanded(!isExpanded);
    }


    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-child">
                    <h3 className="child-title">درباره ما</h3>
                    <p className={`footer-about-us ${isExpanded ? 'expanded' : ''}`}>دیروز وقتی از خانه بیرون رفتم، هوا بارانی بود و صدای رعد و برق از دور شنیده می‌شد. مردم با چترهای رنگارنگ در خیابان قدم می‌زدند و بعضی‌ها زیر باران می‌دویدند. در گوشه‌ای از پارک، کودکی با چکمه‌های قرمز رنگش در چاله‌های آب بازی می‌کرد. پرندگان به دنبال سرپناه بودند و بوی خاک نم‌زده در فضا پیچیده بود. مغازه‌دارها با دستمال شیشه‌ها را پاک می‌کردند و راننده‌ها با احتیاط رانندگی می‌کردند. یک پیرمرد با عصا آهسته قدم می‌زد و لبخند می‌زد. صدای موسیقی از پنجره‌ای باز شنیده می‌شد. همه چیز حال و هوای خاصی داشت، انگار شهر زنده شده بود.</p>
                    <div className='see-more-div' onClick={handleExpand}>
                        <span className={'footer-see-more'}>{isExpanded ? 'بستن' : 'مشاهده بیشتر'}</span>
                        <FaChevronLeft className={`see-more-chevron ${isExpanded ? 'expanded' : ''}`} />
                    </div>
                </div>
                <div className="footer-child">
                    <h3 className="child-title">لینک‌های مفید</h3>
                    <div className='useful-links-div'>
                        <Link className='useful-links'>فرمول ترکیب رنگ</Link>
                    </div>
                    <div className='useful-links-div'>
                        <Link className='useful-links'>رنگ‌های اتومبیلی</Link>
                    </div>
                    <div className='useful-links-div'>
                        <Link className='useful-links'>رنگ چوب</Link>
                    </div>
                    <div className='useful-links-div'>
                        <Link className='useful-links'>رنگ‌های ساختمانی</Link>
                    </div>
                    <div className='useful-links-div'>
                        <Link className='useful-links'>ابزار رنگ</Link>
                    </div>
                </div>
                <div className="footer-child">
                    <h3 className="child-title">فروشگاه</h3>
                    <p>آدرس فروشگاه: اسلامشهر، میدان نماز، تعاون ۳، پلاک ۱۱</p>
                    <p>تلفن  فروشگاه:  ۵۶۳۶۶۶۹۵-۰۲۱</p>
                    <p>موبایل: ۰۹۱۲۵۲۴۵۳۶۵</p>
                </div>
                <div className="footer-child">
                    <h3 className="child-title">فضای مجازی</h3>
                    <p>آدرس صفحه اینستاگرام: mrtint.ir</p>
                    <FaInstagram className='instagram-icon' />
                    <FaWhatsapp className='whatsapp-icon' />
                </div>
            </div>
        </footer>
    )
}

export default Footer;