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
  let [carBrands, setCarBrands] = useState([]);
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
  let [colorTypeListClassname, setColorTypeListClassname] =
    useState("color-types-list");
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
        setCarBrands(newCars);
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
    const newCarBrands = carBrands.filter((car) =>
      car.company.startsWith(carInputValue)
    );
    setBrandListCounter(0);
    if (newCarBrands.length > 0) {
      const element = document.getElementById(newCarBrands[0]._id);
      if (element) {
        element.parentNode.scrollTop = element.offsetTop;
      }
    }
    setBrandListClassname("car-brands car-brands-active");
  };

  const handleBlurBrandInput = () => {
    setTimeout(() => setBrandListClassname("car-brands"), 50);
    const carTypes = cars.filter(
      (car) =>
        car.company === carInputValue && car.type.startsWith(carTypeInputValue)
    );
    if (carTypes.length > 0) {
      setIsCompanyEmpty(false);
    }
  };

  const handleClickList = (car) => {
    setCarInputValue(car.company);
    setBrandListClassname("car-brands");
    setIsCompanyEmpty(false);
  };

  const handleChangeCarBrandInput = (value) => {
    setBrandListClassname("car-brands car-brands-active");
    setCarTypeInputValue("");
    if (!persianCodes.includes(value.charCodeAt(value.length - 1))) {
      value = value.substring(0, value.length - 1);
    } else {
      setBrandListCounter(0);
    }
    setCarInputValue(value);
  };

  const handleKeyCarBrandInput = (e) => {
    const key = e.key;
    const newCarBrands = carBrands.filter((car) =>
      car.company.startsWith(carInputValue)
    );
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
      e.preventDefault();
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
      } else {
        setCarInputValue("");
      }
      setBrandListClassname("car-brands");
      setIsCompanyEmpty(false);
    }
  };

  const renderBrandList = () => {
    let classname = "";
    const newBrands = carBrands.filter((car) =>
      car.company.startsWith(carInputValue)
    );
    if (newBrands.length > 0) {
      return newBrands.map((car, i) => {
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
    } else {
      return (
        <li
          className="car-brand"
          key="0"
          id="0"
          onClick={() => setCarInputValue("")}
        >
          موردی یافت نشد!
        </li>
      );
    }
  };

  //  CAR TYPE INPUT HANDLERS

  const handleFocusTypeInput = () => {
    setTypeListClassname("car-types car-types-active");
    const carTypes = cars.filter((car) => car.company === carInputValue);
    if (carTypes.length === 0) {
      setIsCompanyEmpty(true);
    } else {
      setIsCompanyEmpty(false);
    }
    setTypeListCounter(0);
    const element = document.getElementById(carTypes[0]._id + "t");
    if (element) {
      element.parentNode.scrollTop = element.offsetTop - 80;
    }
  };

  const handleBlurTypeInput = () => {
    setTimeout(() => setTypeListClassname("car-types"), 50);
  };

  const handleClickTypeList = (type) => {
    setCarTypeInputValue(type);
  };

  const handleChangeCarTypeInput = (value) => {
    if (!allowedCodes.includes(value.charCodeAt(value.length - 1))) {
      value = value.substring(0, value.length - 1);
    }
    setCarTypeInputValue(value);
    setTypeListClassname("car-types car-types-active");
  };

  const handleKeyCarTypeInput = (key) => {
    const carTypes = cars.filter(
      (car) =>
        car.company === carInputValue && car.type.startsWith(carTypeInputValue)
    );
    if (key === "ArrowDown") {
      if (typeListCounter < carTypes.length - 1) {
        setTypeListCounter(typeListCounter + 1);
        const element = document.getElementById(
          carTypes[typeListCounter + 1]._id + "t"
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
          carTypes[typeListCounter - 1]._id + "t"
        );
        if (element) {
          element.parentNode.scrollTop = element.offsetTop - 80;
        }
      }
    }
    if (key === "Enter") {
      if (carTypes.length > 0) {
        setTypeListCounter(0);
        setCarTypeInputValue(carTypes[typeListCounter].type);
      } else {
        setCarTypeInputValue("");
      }
      setTypeListClassname("car-types");
    }
  };

  const renderTypeList = () => {
    let classname = "";
    const carTypes = cars.filter(
      (car) =>
        car.company === carInputValue && car.type.startsWith(carTypeInputValue)
    );
    if (carTypes.length === 0) {
      return (
        <li
          key="0"
          id="0"
          className="car-brand"
          onClick={() => setCarTypeInputValue("")}
        >
          موردی یافت نشد!
        </li>
      );
    } else {
      return carTypes.map((car, i) => {
        if (i === typeListCounter) {
          classname = "car-brand-active";
        } else {
          classname = "car-brand";
        }
        return (
          <li
            key={car._id}
            id={car._id + "t"}
            className={classname}
            onClick={() => handleClickTypeList(car.type)}
          >
            {car.type}
          </li>
        );
      });
    }
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
    setColorTypeListClassname("color-types-list color-types-list-active");
  };

  const handleBlurColorType = () => {
    setColorTypeListClassname("color-types-list");
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
          isCompanyEmpty={isCompanyEmpty}
          carTypeInputValue={carTypeInputValue}
          handleFocusTypeInput={handleFocusTypeInput}
          handleBlurTypeInput={handleBlurTypeInput}
          handleChangeCarTypeInput={handleChangeCarTypeInput}
          handleKeyCarTypeInput={handleKeyCarTypeInput}
          typeListClassname={typeListClassname}
          renderTypeList={renderTypeList}
          isTypeEmpty={isTypeEmpty}
          pAmountInputValue={pAmountInputValue}
          handleChangeAmount={handleChangeAmount}
          handleBlurAmount={handleBlurAmount}
          handleIncreaseAmount={handleIncreaseAmount}
          handleDecreaseAmount={handleDecreaseAmount}
          handleClickList={handleClickList}
          handleKeyColorType={handleKeyColorType}
          handleFocusColorType={handleFocusColorType}
          handleBlurColorType={handleBlurColorType}
          renderColorTypeList={renderColorTypeList}
          colorTypeListClassname={colorTypeListClassname}
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
          isCompanyEmpty={isCompanyEmpty}
          carTypeInputValue={carTypeInputValue}
          handleFocusTypeInput={handleFocusTypeInput}
          handleBlurTypeInput={handleBlurTypeInput}
          handleChangeCarTypeInput={handleChangeCarTypeInput}
          handleKeyCarTypeInput={handleKeyCarTypeInput}
          typeListClassname={typeListClassname}
          renderTypeList={renderTypeList}
          isTypeEmpty={isTypeEmpty}
          pAmountInputValue={pAmountInputValue}
          handleChangeAmount={handleChangeAmount}
          handleBlurAmount={handleBlurAmount}
          handleIncreaseAmount={handleIncreaseAmount}
          handleDecreaseAmount={handleDecreaseAmount}
          handleClickList={handleClickList}
          handleKeyColorType={handleKeyColorType}
          handleFocusColorType={handleFocusColorType}
          handleBlurColorType={handleBlurColorType}
          renderColorTypeList={renderColorTypeList}
          colorTypeListClassname={colorTypeListClassname}
          colorTypeValue={colorTypeValue}
          renderBrandList={renderBrandList}
        />
      )}
    </section>
  );
};
export default CarSpecifications;
