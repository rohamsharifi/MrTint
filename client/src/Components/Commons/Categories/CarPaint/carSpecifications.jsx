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

  const handleFocusBrandInput = () => {
    setCompanyListRight("33px");
  };

  const handleBlurBrandInput = () => {
    setCompanyListRight("-200px");
  };

  const handleClickList = (car) => {
    setCarInputValue(car.company);
    setCompanyListRight("-200px");
  };

  const handleClickEmptyList = () => {
    setCarInputValue("");
    setCompanyListRight("-200px");
  };

  const handleFocusTypeInput = () => {
    setTypeListRight("33px");
  };

  const handleBlurTypeInput = () => {
    setTypeListRight("-200px");
  };

  const handleClickTypeList = (car) => {
    setCarTypeInputValue(car.type);
    setTypeListRight("-200px");
  };

  const handleClickEmptyTypeList = () => {
    setCarInputValue("");
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

  const emptyTypeList = () => {
    const listArray = cars.filter((car) =>
      car.type.startsWith(carTypeInputValue)
    );
    if (listArray.length === 0) {
      return (
        <li className="car-brand" onClick={handleClickEmptyTypeList} key={0}>
          موردی یافت نشد!
        </li>
      );
    }
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
          onChange={(e) => setCarInputValue(e.target.value)}
        />
        <ul className="car-brands" style={{ right: companyListRight }}>
          {carCompanies.map((car) => {
            return car.company.startsWith(carInputValue) ? (
              <li
                className="car-brand"
                key={car._id}
                onClick={() => handleClickList(car)}
              >
                {car.company}
              </li>
            ) : null;
          })}
          {emptyCompanyList()}
        </ul>
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
          onChange={(e) => setCarTypeInputValue(e.target.value)}
        />
        <ul className="car-types" style={{ right: typeListRight }}>
          {cars.map((car) => {
            return car.company === carInputValue &&
              car.type.startsWith(carTypeInputValue) ? (
              <li
                key={car._id}
                className="car-brand"
                onClick={() => handleClickTypeList(car)}
              >
                {car.type}
              </li>
            ) : null;
          })}
          {emptyTypeList()}
        </ul>
        <label htmlFor="" className="color-code-label">
          کد رنگ ماشین:
        </label>
        <input type="text" className="color-code-input" spellCheck="false" />
      </form>
    </section>
  );
};
export default CarSpecifications;
