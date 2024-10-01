import React, { useEffect, useState } from "react";
import axios from "axios";

import "./carSpecifications.css";
import CarPaintForm from "./carPaintForm";
import CarPaintHeader from "./carPaintHeader";
import CarPaintTabs from "./carPaintTabs";
import SmartPenForm from "./smartPenForm";

const CarSpecifications = () => {
  let [brandListClassname, setBrandListClassname] = useState("car-brands");
  let [typeListClassname, setTypeListClassname] = useState("car-types");
  let [carInputValue, setCarInputValue] = useState("");
  let [carTypeInputValue, setCarTypeInputValue] = useState("");
  let [carCompanies, setCarCompanies] = useState([]);
  let [cars, setCars] = useState([]);
  let [isCompanyEmpty, setIsCompanyEmpty] = useState(false);
  let [brandListCounter, setBrandListCounter] = useState(0);
  let [typeListCounter, setTypeListCounter] = useState(0);
  const persianCodes = [
    1575, 1576, 1662, 1578, 1579, 1580, 1670, 1581, 1582, 1583, 1584, 1585,
    1586, 1688, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602,
    1705, 1711, 1604, 1605, 1606, 1607, 1608, 1740, 32,
  ];
  const allowedCodes = [
    1575, 1576, 1662, 1578, 1579, 1580, 1670, 1581, 1582, 1583, 1584, 1585,
    1586, 1688, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602,
    1705, 1711, 1604, 1605, 1606, 1607, 1608, 1740, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122, 32,
  ];
  let [isTypeEmpty, setIsTypeEmpty] = useState(false);
  let [eAmountInputValue, setEAmountInputValue] = useState(50);
  let [pAmountInputValue, setPAmountInputValue] = useState("۵۰");
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  let [paintTabClass, setPaintTabClass] = useState(
    "tab-btn tab-make-paint active-tab"
  );
  let [penTabClass, setPenTabClass] = useState("tab-btn tab-smart-pen");
  const colorTypes = ["فوری", "روغنی", "۲۱"];
  let [colorTypeListCounter, setColorTypeListCounter] = useState(0);
  let [colorTypeListRight, setColorTypeListRight] = useState("-200px");
  let [colorTypeValue, setColorTypeValue] = useState("فوری");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/carlist")
      .then((response) => {
        let testCars = response.data.cars;
        let newCars = [response.data.cars[0]];
        let previousCar = newCars[0].company;
        testCars.map((car) => {
          if (car.company !== previousCar) {
            newCars = [...newCars, car];
            previousCar = car.company;
          }
        });
        setCarCompanies(newCars);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/carlist")
      .then((response) => {
        setCars(response.data.cars);
      })
      .catch((e) => console.log(e));
  }, []);

  //  CAR BRAND INPUT HANDLERS

  const handleFocusBrandInput = () => {
    let newCarBrands = [];
    setBrandListClassname("car-brands car-brands-active");
    if (carInputValue === "") {
      newCarBrands = carCompanies;
    } else {
      newCarBrands = carCompanies.filter((car) =>
        car.company.startsWith(carInputValue)
      );
    }
    const element = document.getElementById(newCarBrands[0]._id);
    if (element) {
      element.parentNode.scrollTop = element.offsetTop;
    }
  };

  const handleBlurBrandInput = () => {
    setBrandListClassname("car-brands");
    setBrandListCounter(0);
  };

  const handleClickList = (car) => {
    setCarInputValue(car.company);
    setIsCompanyEmpty(false);
    setBrandListClassname("car-brands");
  };

  const handleClickEmptyList = () => {
    setCarInputValue("");
    setBrandListClassname("car-brands");
  };

  const handleChangeCarBrandInput = (value) => {
    setBrandListClassname("car-brands car-brands-active");
    setCarTypeInputValue("");
    if (!persianCodes.includes(value.charCodeAt(value.length - 1))) {
      value = value.substring(0, value.length - 1);
    }
    setCarInputValue(value);
    const listArray = carCompanies.filter((car) => car.company === value);
    if (listArray.length !== 0 && value !== "") {
      setIsCompanyEmpty(false);
    }
  };

  const handleKeyCarBrandInput = (key) => {
    let newInputValue = carInputValue;
    let newCarBrands = [];
    if (persianCodes.includes(key.charCodeAt(0))) {
      newInputValue = newInputValue + key;
      setBrandListCounter(0);
    }
    if (key === "Backspace") {
      newInputValue = newInputValue.substring(0, newInputValue.length - 1);
      setBrandListCounter(0);
    }
    if (newInputValue === "") {
      newCarBrands = carCompanies;
    } else {
      newCarBrands = carCompanies.filter((car) =>
        car.company.startsWith(newInputValue)
      );
    }
    if (key === "ArrowDown") {
      if (brandListCounter < newCarBrands.length - 1) {
        setBrandListCounter(brandListCounter + 1);
        const element = document.getElementById(
          newCarBrands[brandListCounter + 1]._id
        );
        if (element) {
          element.parentNode.scrollTop = element.offsetTop - 80;
        }
      }
    }
    if (key === "ArrowUp") {
      if (brandListCounter > 0) {
        setBrandListCounter(brandListCounter - 1);
        const element = document.getElementById(
          newCarBrands[brandListCounter - 1]._id
        );
        if (element) {
          element.parentNode.scrollTop = element.offsetTop - 80;
        }
      }
    }
    if (key === "Enter") {
      if (newCarBrands.length > 0) {
        setCarInputValue(newCarBrands[brandListCounter].company);
        setIsCompanyEmpty(false);
      } else {
        setIsCompanyEmpty(true);
        setCarInputValue("");
      }
      setBrandListClassname("car-brands");
    }
  };

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

  //  CAR TYPE INPUT HANDLERS

  const handleFocusTypeInput = () => {
    setTypeListClassname("car-types car-types-active");
    const carTypes = cars.filter((car) => car.company === carInputValue);
    const exactCarTypes = carTypes.filter(
      (car) => car.type === carTypeInputValue
    );
    if (carTypes.length === 0 || carInputValue === "") {
      setIsCompanyEmpty(true);
      setIsTypeEmpty(true);
    } else if (carTypeInputValue !== "" && exactCarTypes.length === 0) {
      setIsTypeEmpty(true);
    } else {
      setIsTypeEmpty(false);
    }
  };

  const handleBlurTypeInput = () => {
    setTypeListClassname("car-types");
    setTypeListCounter(0);
  };

  const handleClickTypeList = (type) => {
    console.log("salam");
    setCarTypeInputValue(type);
    setTypeListClassname("car-types");
  };

  const handleChangeCarTypeInput = (value) => {
    if (!allowedCodes.includes(value.charCodeAt(value.length - 1))) {
      value = value.substring(0, value.length - 1);
    }
    setCarTypeInputValue(value);
    const carTypes = carCompanies.filter((car) => car.type.startsWith(value));
    if (carTypes.length === 0) {
      setIsTypeEmpty(true);
    } else {
      setIsTypeEmpty(false);
    }
  };

  const handleKeyCarTypeInput = (key) => {
    let newInputValue = carTypeInputValue;
    let newCarTypes = [];
    if (
      key !== "ArrowDown" &&
      key !== "ArrowUp" &&
      key !== "Enter" &&
      key !== "Backspace"
    ) {
      if (allowedCodes.includes(key.charCodeAt(0))) {
        newInputValue = newInputValue + key;
        setTypeListCounter(0);
      }
    }
    if (key === "Backspace") {
      newInputValue = newInputValue.substring(0, newInputValue.length - 1);
      setTypeListCounter(0);
    }
    if (newInputValue === "") {
      newCarTypes = cars.filter((car) => car.company === carInputValue);
    } else {
      newCarTypes = cars.filter(
        (car) =>
          car.company === carInputValue && car.type.startsWith(newInputValue)
      );
    }
    if (key === "ArrowDown") {
      if (typeListCounter < newCarTypes.length - 1) {
        setTypeListCounter(typeListCounter + 1);
        const element = document.getElementById(
          newCarTypes[typeListCounter + 1]._id
        );
        if (element) {
          element.parentNode.scrollTop = element.offsetTop - 80;
        }
      }
    }
    if (key === "ArrowUp") {
      if (typeListCounter > 0) {
        setTypeListCounter(typeListCounter - 1);
        const element = document.getElementById(
          newCarTypes[typeListCounter - 1]._id
        );
        if (element) {
          element.parentNode.scrollTop = element.offsetTop - 80;
        }
      }
    }
    if (key === "Enter") {
      if (newCarTypes.length > 0) {
        setTypeListCounter(0);
        setCarTypeInputValue(newCarTypes[typeListCounter].type);
        setIsTypeEmpty(false);
      } else {
        setIsTypeEmpty(true);
        setCarTypeInputValue("");
      }
      setTypeListClassname("car-types");
    }
  };

  const handleClickEmptyTypeList = () => {
    setCarTypeInputValue("");
    setTypeListClassname("car-types");
  };

  const emptyCompanyList = () => {
    const listArray = carCompanies.filter((car) =>
      car.company.startsWith(carInputValue)
    );
    if (listArray.length === 0) {
      return (
        <li className="car-brand" onClick={handleClickEmptyList} key={0}>
          موردی یافت نشد!
        </li>
      );
    }
  };

  const renderTypeList = () => {
    let classname = "";
    const carTypes = cars.filter(
      (car) =>
        car.company === carInputValue && car.type.startsWith(carTypeInputValue)
    );
    return carTypes.map((car, i) => {
      if (i === typeListCounter) {
        classname = "car-brand-active";
      } else {
        classname = "car-brand";
      }
      return (
        <li
          key={car._id}
          id={car._id}
          className={classname}
          onClick={(car) => handleClickTypeList(car.type)}
        >
          {car.type}
        </li>
      );
    });
  };

  const emptyTypeList = () => {
    return (
      <li className="car-brand" onClick={handleClickEmptyTypeList} key={0}>
        موردی یافت نشد!
      </li>
    );
  };

  const handleIncreaseAmount = () => {
    setEAmountInputValue(eAmountInputValue + 50);
    handleAmountToPersian(eAmountInputValue + 50);
  };

  const handleDecreaseAmount = () => {
    if (eAmountInputValue >= 100) {
      setEAmountInputValue(eAmountInputValue - 50);
      handleAmountToPersian(eAmountInputValue - 50);
    }
  };

  const handleAmountToPersian = (amount) => {
    let persianAmount = "";
    let strAmount = amount.toString();
    let arrAmount = strAmount.split("");
    arrAmount.map((str) => {
      let int = Number(str);
      persianAmount = persianAmount + persianNumbers[int];
    });
    setPAmountInputValue(persianAmount);
  };

  const handleChangeAmount = (value) => {
    let key = value.charCodeAt(value.length - 1);
    if ((key < 48 || key > 57) && (key < 1776 || key > 1785)) {
      value = value.substring(0, value.length - 1);
    }
    switchToPersian(value);
  };

  const switchToPersian = (number) => {
    let englishNumber = "";
    const arrNumber = number.split("");
    arrNumber.map((n) => {
      const key = n.charCodeAt(0);
      if (key >= 48 && key <= 57) {
        englishNumber = englishNumber + n;
      } else {
        englishNumber = englishNumber + persianNumbers.indexOf(n).toString();
      }
    });
    setEAmountInputValue(Number(englishNumber));
    setPAmountInputValue(switchEngNumberToPersian(Number(englishNumber)));
  };

  const handleBlurAmount = () => {
    if (eAmountInputValue % 50 !== 0) {
      const surplus = eAmountInputValue % 50;
      setEAmountInputValue(eAmountInputValue - surplus + 50);
      setPAmountInputValue(
        switchEngNumberToPersian(eAmountInputValue - surplus + 50)
      );
    }
    if (eAmountInputValue < 50) {
      setEAmountInputValue(50);
      setPAmountInputValue("۵۰");
    }
  };

  const switchEngNumberToPersian = (eng) => {
    let strEng = eng.toString();
    let arrEng = strEng.split("");
    let strPer = "";
    arrEng.map((n) => {
      strPer += persianNumbers[Number(n)];
    });
    return strPer;
  };

  const clickPaintTab = () => {
    setPaintTabClass("tab-btn tab-make-paint active-tab");
    setPenTabClass("tab-btn tab-smart-pen");
  };

  const clickPenTab = () => {
    setPaintTabClass("tab-btn tab-make-paint");
    setPenTabClass("tab-btn tab-smart-pen active-tab");
  };

  const handleKeyColorType = (key) => {
    if (key === "ArrowUp" && colorTypeListCounter > 0) {
      setColorTypeListCounter(colorTypeListCounter - 1);
    }
    if (key === "ArrowDown" && colorTypeListCounter < colorTypes.length - 1) {
      setColorTypeListCounter(colorTypeListCounter + 1);
    }
    if (key === "Enter") {
      setColorTypeValue(colorTypes[colorTypeListCounter]);
    }
  };

  const handleFocusColorType = () => {
    setColorTypeListRight("33px");
  };

  const handleBlurColorType = () => {
    setColorTypeListRight("-200px");
  };

  const renderColorTypeList = () => {
    let classname = "";
    return colorTypes.map((type, i) => {
      if (i === colorTypeListCounter) {
        classname = "color-type-active";
      } else {
        classname = "color-type";
      }
      return (
        <li key={i} id={i} className={classname}>
          {type}
        </li>
      );
    });
  };

  return (
    <section className="car-specifications-section">
      {/* CAR PAINT HEADER */}
      <CarPaintHeader />

      {/* CAR PAINT TABS */}
      <CarPaintTabs
        paintTabClass={paintTabClass}
        penTabClass={penTabClass}
        clickPaintTab={clickPaintTab}
        clickPenTab={clickPenTab}
      />

      {/* CAR PAINT FORM */}

      {paintTabClass.includes("active-tab") && (
        <CarPaintForm
          handleFocusBrandInput={handleFocusBrandInput}
          handleBlurBrandInput={handleBlurBrandInput}
          carInputValue={carInputValue}
          handleChangeCarBrandInput={handleChangeCarBrandInput}
          handleKeyCarBrandInput={handleKeyCarBrandInput}
          brandListClassname={brandListClassname}
          emptyCompanyList={emptyCompanyList}
          isCompanyEmpty={isCompanyEmpty}
          carTypeInputValue={carTypeInputValue}
          handleFocusTypeInput={handleFocusTypeInput}
          handleBlurTypeInput={handleBlurTypeInput}
          handleChangeCarTypeInput={handleChangeCarTypeInput}
          handleKeyCarTypeInput={handleKeyCarTypeInput}
          typeListClassname={typeListClassname}
          renderTypeList={renderTypeList}
          isTypeEmpty={isTypeEmpty}
          emptyTypeList={emptyTypeList}
          pAmountInputValue={pAmountInputValue}
          handleChangeAmount={handleChangeAmount}
          handleBlurAmount={handleBlurAmount}
          handleIncreaseAmount={handleIncreaseAmount}
          handleDecreaseAmount={handleDecreaseAmount}
          carCompanies={carCompanies}
          brandListCounter={brandListCounter}
          handleClickList={handleClickList}
          handleKeyColorType={handleKeyColorType}
          handleFocusColorType={handleFocusColorType}
          handleBlurColorType={handleBlurColorType}
          renderColorTypeList={renderColorTypeList}
          colorTypeListRight={colorTypeListRight}
          colorTypeValue={colorTypeValue}
          renderBrandList={renderBrandList}
        />
      )}

      {/* SMART PEN FORM */}

      {penTabClass.includes("active-tab") && (
        <SmartPenForm
          handleFocusBrandInput={handleFocusBrandInput}
          handleBlurBrandInput={handleBlurBrandInput}
          carInputValue={carInputValue}
          handleChangeCarBrandInput={handleChangeCarBrandInput}
          handleKeyCarBrandInput={handleKeyCarBrandInput}
          brandListClassname={brandListClassname}
          emptyCompanyList={emptyCompanyList}
          isCompanyEmpty={isCompanyEmpty}
          carTypeInputValue={carTypeInputValue}
          handleFocusTypeInput={handleFocusTypeInput}
          handleBlurTypeInput={handleBlurTypeInput}
          handleChangeCarTypeInput={handleChangeCarTypeInput}
          handleKeyCarTypeInput={handleKeyCarTypeInput}
          typeListClassname={typeListClassname}
          renderTypeList={renderTypeList}
          isTypeEmpty={isTypeEmpty}
          emptyTypeList={emptyTypeList}
          pAmountInputValue={pAmountInputValue}
          handleChangeAmount={handleChangeAmount}
          handleBlurAmount={handleBlurAmount}
          handleIncreaseAmount={handleIncreaseAmount}
          handleDecreaseAmount={handleDecreaseAmount}
          carCompanies={carCompanies}
          brandListCounter={brandListCounter}
          handleClickList={handleClickList}
          handleKeyColorType={handleKeyColorType}
          handleFocusColorType={handleFocusColorType}
          handleBlurColorType={handleBlurColorType}
          renderColorTypeList={renderColorTypeList}
          colorTypeListRight={colorTypeListRight}
          colorTypeValue={colorTypeValue}
          renderBrandList={renderBrandList}
        />
      )}
    </section>
  );
};
export default CarSpecifications;
