const SmartPenForm = (props) => {
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
export default SmartPenForm;
