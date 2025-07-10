import { CiMonitor } from "react-icons/ci";
import { AiOutlineScan } from "react-icons/ai";

import "./feature-card.css";

const FeatureCard = () => {
    return (
        <section className="feature-card-section">
            <h2>ساخت &nbsp;و &nbsp;ترکیب &nbsp;رنگ &nbsp;کامپیوتری</h2>
            <div className="card-container">
                <div className="card">
                    <CiMonitor className="card-icon" />
                    <h3 className="card-title">ساخت رنگ‌های کامپیوتری</h3>
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
                    <h2 className="card-title">ساخت رنگ ماشین خارجی با اسکنر</h2>
                    <p className="card-description">
                        رنگ ماشین های خارجی با استفاده از دستگاه اسکنر آلمانی
                        ساخته می‌شود. ابتدا رنگ ماشین اسکن می‌شود و فرمول دقیق آن
                        بدست می‌آید. سپس رنگ آن به طور دقیق و با رنگ میپا آلمان
                        ساخته می‌شود.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeatureCard;