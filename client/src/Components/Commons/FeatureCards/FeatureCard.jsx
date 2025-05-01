import { CiMonitor } from "react-icons/ci";
import { AiOutlineScan } from "react-icons/ai";

import "./feature-card.css";

const FeatureCard = () => {
    return (
        <div className="card-container">
            <div className="card">
                <CiMonitor className="card-icon" />
                <h2 className="card-title">ساخت رنگ‌های کامپیوتری</h2>
                <p className="card-description">
                    رنگ‌های ساختمانی شما به صورت
                    کامپیوتری و با دقت بالا ساخته مي‌شوند.
                    به طوری که با انتخاب رنگ از روی کاتالوگ
                    توسط شما، فرمول دقیق ترکیب رنگ آن توسط کامپیوتر
                    تولید و سپس ساخته می‌شود.
                </p>
            </div>
            <div className="card">
                <AiOutlineScan className="card-icon" />
                <h2 className="card-title">ساخت رنگ با اسکنر</h2>
                <p className="card-description">
                    رنگ ماشین شما ابتدا با دستگاه
                    اسکنر اسکن و رنگ آن به طور دقیق مشخص می‌شود.
                    سپس فرمول رنگ آن با دقت بالا توسط کامپیوتر تولید
                    و بعد رنگ شما با رنگ میپا آلمان ساخته می‌شود.
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;