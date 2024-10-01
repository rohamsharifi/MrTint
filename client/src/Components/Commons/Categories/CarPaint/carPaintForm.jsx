import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const CarPaintForm = (props) => {
  return (
    <form action="" className="car-specifications-form">
      <div className="input-container">
        <label htmlFor="brands" className="car-specifications-labels">
          برند ماشین:
        </label>
        <input
          id="brands"
          type="text"
          className="car-specifications-inputs car-brand-input"
          spellCheck="false"
          onFocus={props.handleFocusBrandInput}
          onBlur={props.handleBlurBrandInput}
          value={props.carInputValue}
          onChange={(e) => props.handleChangeCarBrandInput(e.target.value)}
          onKeyDown={(e) => props.handleKeyCarBrandInput(e.key)}
          autoComplete="off"
        />
        <ul className={props.brandListClassname}>
          {props.renderBrandList()}
          {props.emptyCompanyList()}
        </ul>
        {props.isCompanyEmpty && (
          <p className="error-text">لطفا برند ماشین خود را انتخاب کنید</p>
        )}
      </div>
      <div className="input-container">
        <label htmlFor="types" className="car-specifications-labels">
          مدل ماشین:
        </label>
        <input
          id="types"
          type="text"
          className="car-specifications-inputs car-type-input"
          spellCheck="false"
          value={props.carTypeInputValue}
          onFocus={props.handleFocusTypeInput}
          onBlur={props.handleBlurTypeInput}
          onChange={(e) => props.handleChangeCarTypeInput(e.target.value)}
          onKeyDown={(e) => props.handleKeyCarTypeInput(e.key)}
          autoComplete="off"
        />
        <ul className={props.typeListClassname}>
          {props.renderTypeList()}
          {props.isTypeEmpty && props.emptyTypeList()}
        </ul>
      </div>
      <div className="input-container">
        <label htmlFor="color-code" className="car-specifications-labels">
          کد رنگ ماشین:
        </label>
        <input
          id="color-code"
          type="text"
          className="car-specifications-inputs color-code-input"
          spellCheck="false"
        />
      </div>
      <div className="input-container">
        <label htmlFor="color-types" className="car-specifications-labels">
          نوع رنگ:
        </label>
        <input
          id="color-types"
          type="text"
          className="car-specifications-inputs color-types"
          spellCheck="false"
          value={props.colorTypeValue}
          onKeyDown={(e) => props.handleKeyColorType(e.key)}
          onFocus={props.handleFocusColorType}
          onBlur={props.handleBlurColorType}
        />
        <ul
          className="color-types-list"
          style={{ right: props.colorTypeListRight }}
        >
          {props.renderColorTypeList()}
        </ul>
      </div>
      <div className="input-container">
        <label htmlFor="color-amount" className="car-specifications-labels">
          مقدار رنگ (گرم):
        </label>
        <div className="color-amount-div">
          <input
            id="color-amount"
            type="tel"
            className="car-specifications-inputs color-amount-input"
            spellCheck="false"
            value={props.pAmountInputValue}
            onChange={(e) => props.handleChangeAmount(e.target.value)}
            onBlur={props.handleBlurAmount}
          />
          <div
            className="color-amount-btn increase-btn"
            onClick={props.handleIncreaseAmount}
          >
            <FontAwesomeIcon icon={faPlus} className="plus-icon" />
          </div>
          <div
            className="color-amount-btn decrease-btn"
            onClick={props.handleDecreaseAmount}
          >
            <FontAwesomeIcon icon={faMinus} className="minus-icon" />
          </div>
        </div>
      </div>
      <div className="input-container">
        <label
          htmlFor="car-painting-description"
          className="car-specifications-labels"
        >
          محل رنگ‌آمیزی و توضیحات:
        </label>
        <textarea
          className="car-specifications-inputs"
          name="car-painting-description"
          id="car-painting-description"
          rows={3}
        />
      </div>
    </form>
  );
};
export default CarPaintForm;
