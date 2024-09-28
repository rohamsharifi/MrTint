import "./carPaintTabs.css";

const CarPaintTabs = ({
  paintTabClass,
  penTabClass,
  clickPaintTab,
  clickPenTab,
}) => {
  return (
    <div className="car-paint-tabs">
      <button className={paintTabClass} onClick={clickPaintTab}>
        <img
          src={require("../../../../images/color-bottle.png")}
          alt="color-bottle"
          className="color-bottle-image"
        />
        سفارش ساخت رنگ
      </button>
      <button className={penTabClass} onClick={clickPenTab}>
        <img
          src={require("../../../../images/color-pen.png")}
          alt="color-bottle"
          className="color-pen-image"
        />
        سفارش قلم خشگیر
      </button>
    </div>
  );
};
export default CarPaintTabs;
