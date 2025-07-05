import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from '../Navbar/navbar';
import Header from '../Header/header';
import Products from '../Products/products';
import MCTopMenu from "./MCTopMenu";

import './mainCategory.css';

const MainCategory = () => {
    const { maincategory } = useParams();

    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState(null);
    const [checkboxLabel, setCheckboxLabel] = useState(null);
    const [subcategoryId, setSubcategoryId] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/subcategories/${maincategory}`)
            .then(res => {
                setSubCategories(res.data);
            })
            .catch(err => {
                console.error('Error fetching subcategories:', err);
            });
    }, []);

    const mainCategories = {
        painting_tools: 'ابزارها',
        car_paint: 'رنگ اتومبیلی',
        wood_paint: 'رنگ چوب',
        house_paint: 'رنگ ساختمانی',
        industrial_paint: 'رنگ صنعتی'
    };

    const data = mainCategories[maincategory];

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/subcategories/${maincategory}/products`)
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.error('Error fetching subcategories:', err);
            });
    }, []);

    let filteredProducts = [];

    if (checkboxLabel === null) {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter((p) => p.ScId === subcategoryId);
    }

    const clickCheckbox = (index, label, id) => {
        if (index === checkboxValue) {
            setCheckboxValue(null);
            setCheckboxLabel(null);
            setSubcategoryId(null);
        } else {
            setCheckboxLabel(label);
            setCheckboxValue(index);
            setSubcategoryId(id);
        }
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="main-category-container">
                <div className='products-and-subcategories'>
                    {checkboxLabel !== null &&
                        <h2 className='subcategory-label'>
                            جستجو در {checkboxLabel}
                        </h2>}
                    <MCTopMenu
                        data={data}
                        subCategories={subCategories}
                        value={checkboxValue}
                        clickCheckbox={clickCheckbox}
                    />
                    <section className='subcategories-div'>
                        <div className='subcategory-list-head'>دسته‌بندی {data}</div>
                        <ul className='subcategories-list'>
                            {subCategories.map((s, index) => {
                                const liClass = `tools-subcategories-li ${index === checkboxValue ? 'active' : ''}`;
                                return (
                                    <li
                                        key={s.ScId}
                                        className={liClass}
                                        onClick={() => clickCheckbox(index, s.ScName, s.ScId)}
                                    >
                                        <div>
                                            <input
                                                type='checkbox'
                                                className='mc-checkbox-input'
                                                checked={index === checkboxValue}
                                            />
                                            <label
                                                htmlFor=''
                                                className='mc-checkbox-label'
                                            >
                                                {s.ScName}
                                            </label>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    <Products
                        products={filteredProducts}
                        label={checkboxLabel}
                    />
                </div>
            </div>
        </div >

    );
}
export default MainCategory;