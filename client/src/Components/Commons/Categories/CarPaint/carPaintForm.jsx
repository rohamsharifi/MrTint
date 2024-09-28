const CarPaintForm = ({
  handleFocusBrandInput,
  handleBlurBrandInput,
  carInputValue,
  handleChangeCarBrandInput,
  handleKeyCarBrandInput,
  companyListRight,
  emptyCompanyList,
  isCompanyEmpty,
  carTypeInputValue,
  handleFocusTypeInput,
  handleBlurTypeInput,
  handleChangeCarTypeInput,
  handleKeyCarTypeInput,
  typeListRight,
  renderTypeList,
  isTypeEmpty,
  emptyTypeList,
  pAmountInputValue,
  handleChangeAmount,
  handleBlurAmount,
  handleIncreaseAmount,
  handleDecreaseAmount,
  carCompanies,
  brandListCounter,
  handleClickList,
  handleKeyColorType,
  handleFocusColorType,
  handleBlurColorType,
  renderColorTypeList,
  colorTypeListRight,
  colorTypeValue,
}) => {
  const renderBrandList = () => {
    let classname = "";
    let newCarCompanies = carCompanies.filter((car) =>
      car.company.startsWith(carInputValue)
    );
    return newCarCompanies.map((car, i) => {
      if (i === brandListCounter) {
        classname = "car-brand-active";
      } else {
        classname = "car-brand";
      }
      return (
        <li
          className={classname}
          key={car._id}
          id={car._id}
          onClick={() => handleClickList(car)}
        >
          {car.company}
        </li>
      );
    });
  };

  return (
    <form action="" className="car-specifications-form">
      <label htmlFor="brands" className="car-brand-label">
        برند ماشین:
      </label>
      <input
        id="brands"
        type="text"
        className="car-brand-input"
        spellCheck="false"
        onFocus={handleFocusBrandInput}
        onBlur={handleBlurBrandInput}
        value={carInputValue}
        onChange={(e) => handleChangeCarBrandInput(e.target.value)}
        onKeyDown={(e) => handleKeyCarBrandInput(e.key)}
      />
      <ul className="car-brands" style={{ right: companyListRight }}>
        {renderBrandList()}
        {emptyCompanyList()}
      </ul>
      {isCompanyEmpty && (
        <p className="error-text">لطفا برند ماشین خود را انتخاب کنید</p>
      )}
      <label htmlFor="types" className="car-type-label">
        مدل ماشین:
      </label>
      <input
        id="types"
        type="text"
        className="car-type-input"
        spellCheck="false"
        value={carTypeInputValue}
        onFocus={handleFocusTypeInput}
        onBlur={handleBlurTypeInput}
        onChange={(e) => handleChangeCarTypeInput(e.target.value)}
        onKeyDown={(e) => handleKeyCarTypeInput(e.key)}
      />
      <ul className="car-types" style={{ right: typeListRight }}>
        {renderTypeList()}
        {isTypeEmpty && emptyTypeList()}
      </ul>
      <label htmlFor="color-code" className="color-code-label">
        کد رنگ ماشین:
      </label>
      <input
        id="color-code"
        type="text"
        className="color-code-input"
        spellCheck="false"
      />
      <label htmlFor="color-types" className="color-types-label">
        نوع رنگ:
      </label>
      <input
        id="color-types"
        type="text"
        className="color-types"
        spellCheck="false"
        value={colorTypeValue}
        onKeyDown={(e) => handleKeyColorType(e.key)}
        onFocus={handleFocusColorType}
        onBlur={handleBlurColorType}
      />
      <ul className="color-types-list" style={{ right: colorTypeListRight }}>
        {renderColorTypeList()}
      </ul>
      <label htmlFor="color-amount" className="color-amount-label">
        مقدار رنگ (گرم):
      </label>
      <div className="color-amount-div">
        <input
          id="color-amount"
          type="tel"
          className="color-amount-input"
          spellCheck="false"
          value={pAmountInputValue}
          onChange={(e) => handleChangeAmount(e.target.value)}
          onBlur={handleBlurAmount}
        />
        <div
          className="color-amount-btn increase-btn"
          onClick={handleIncreaseAmount}
        >
          <img
            src={require("../../../../images/plus.png")}
            alt="increase"
            className="plus-img"
            draggable="false"
          />
        </div>
        <div
          className="color-amount-btn decrease-btn"
          onClick={handleDecreaseAmount}
        >
          <img
            src={require("../../../../images/minus.png")}
            alt="decrease"
            className="minus-img"
            draggable="false"
          />
        </div>
      </div>
    </form>
  );
};
export default CarPaintForm;
