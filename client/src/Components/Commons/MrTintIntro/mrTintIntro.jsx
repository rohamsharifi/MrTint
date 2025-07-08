import wallPainting from '../../../images/wall_painting.jpg';

import './mrTintIntro.css';

const MrTintIntro = () => {
    return (
        <section className='mrtint-intro-sec'>
            <h1 className='mrtint-intro-head'>
                خرید &nbsp; انواع &nbsp; رنگ&nbsp; و&nbsp; ابزار&nbsp; از&nbsp; مستر تینت
            </h1>
            <div className='mrtint-intro-body'>
                <div className='mrtint-intro-body-text'>
                    <h1 className='mrtint-intro-head-medium'>
                        خرید &nbsp; انواع &nbsp; رنگ&nbsp; و&nbsp; ابزار&nbsp; از&nbsp; مستر تینت
                    </h1>
                    <p className='mrtint-intro-body-text-p'>
                        فروشگاه رنگ و ابزار مستر تینت دارای انواع رنگ
                        ( اتومبیلی، ساختمانی، صنعتی، چوب و ... ) همچنین انواع ابزارآلات
                        مانند سنباده، پیستوله، غلطک و ... است که می‌توانید در دسته‌بندی
                        زیر آنها را مشاهده و به صورت آنلاین یا حضوری خریداری کنید.
                        برای مشاهده نشانی و راه‌های ارتباطی با ما روی لینک تماس با ما کلیک کنید.
                    </p>
                </div>
                <div className='mrtint-intro-body-image'>
                    <img src={wallPainting} alt='رنگ آمیزی دیوار با غلطک' />
                </div>
            </div>
        </section>
    );
};

export default MrTintIntro; 