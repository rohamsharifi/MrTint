import React, { useEffect, useState } from "react";
import axios from "axios";

import "./carSpecifications.css";

const CarSpecifications = () => {
  let [companyListRight, setCompanyListRight] = useState("-200px");
  let [typeListRight, setTypeListRight] = useState("-200px");
  let [carInputValue, setCarInputValue] = useState("");
  let [carTypeInputValue, setCarTypeInputValue] = useState("");
  let [carCompanies, setCarCompanies] = useState([]);
  let [cars, setCars] = useState([]);
  let [isCompanyEmpty, setIsCompanyEmpty] = useState(false);
  let [brandListCounter, setBrandListCounter] = useState(0);
  let [typeListCounter, setTypeListCounter] = useState(0);
  let [persianCodes, setPersianCodes] = useState([
    1575, 1576, 1662, 1578, 1579, 1580, 1670, 1581, 1582, 1583, 1584, 1585,
    1586, 1688, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602,
    1705, 1711, 1604, 1605, 1606, 1607, 1608, 1740,
  ]);
  let [allowedCodes, setAllowedCodes] = useState([
    1575, 1576, 1662, 1578, 1579, 1580, 1670, 1581, 1582, 1583, 1584, 1585,
    1586, 1688, 1587, 1588, 1589, 1590, 1591, 1592, 1593, 1594, 1601, 1602,
    1705, 1711, 1604, 1605, 1606, 1607, 1608, 1740, 48, 49, 50, 51, 52, 53, 54,
    55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104,
    105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119,
    120, 121, 122,
  ]);
  let [isTypeEmpty, setIsTypeEmpty] = useState(false);
  let [amountInputValue, setAmountInputValue] = useState(100);

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
    setCompanyListRight("33px");
  };

  const handleBlurBrandInput = () => {
    setCompanyListRight("-200px");
  };

  const handleClickList = (car) => {
    setCarInputValue(car.company);
    setIsCompanyEmpty(false);
    setCompanyListRight("-200px");
  };

  const handleClickEmptyList = () => {
    setCarInputValue("");
    setCompanyListRight("-200px");
  };

  const handleChangeCarBrandInput = (value) => {
    setCompanyListRight("33px");
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
      setCompanyListRight("-200px");
    }
  };

  //  CAR TYPE INPUT HANDLERS

  const handleFocusTypeInput = () => {
    setTypeListRight("33px");
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
    setTypeListRight("-200px");
  };

  const handleClickTypeList = (car) => {
    setCarTypeInputValue(car.type);
    setTypeListRight("-200px");
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
    console.log(key.charCodeAt(0));
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
      setTypeListRight("-200px");
    }
  };

  const handleClickEmptyTypeList = () => {
    setCarTypeInputValue("");
    setTypeListRight("-200px");
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
          onClick={() => handleClickTypeList(car)}
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

  return (
    <section className="car-specifications-section">
      <header>
        <h2 className="car-specifications-title">ساخت رنگ ماشین شما</h2>
        <p className="car-specifications-description">
          با وارد کردن اطلاعات زیر، رنگ ماشین شما ساخته و برای شما ارسال می‌شود
        </p>
      </header>
      <form action="" className="car-specifications-form">
        <label htmlFor="" className="car-brand-label">
          برند ماشین:
        </label>
        <input
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
        <label htmlFor="" className="car-type-label">
          مدل ماشین:
        </label>
        <input
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
        <label htmlFor="" className="color-code-label">
          کد رنگ ماشین:
        </label>
        <input type="text" className="color-code-input" spellCheck="false" />
        <label htmlFor="" className="color-amount-label">
          مقدار رنگ:
        </label>
        <input
          type="number"
          className="color-amount-input"
          spellCheck="false"
          value={amountInputValue}
        />
      </form>
    </section>
  );
};
export default CarSpecifications;
