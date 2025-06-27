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
        axios.get('http://localhost:5000/api/subcategories')
            .then(res => {
                setSubCategories(res.data);
            })
            .catch(err => {
                console.error('Error fetching subcategories:', err);
            });
    }, []);

    const toolSubCategories = [];
    const carSubCategories = [];
    const woodSubCategories = [];
    const houseSubCategories = [];
    const industrialSubCategories = [];

    subCategories.map((s) => {
        switch (s.McId) {
            case 1:
                toolSubCategories.push(s);
                break;
            case 2:
                carSubCategories.push(s);
                break;
            case 3:
                woodSubCategories.push(s);
                break;
            case 4:
                houseSubCategories.push(s);
                break;
            default:
                industrialSubCategories.push(s);
        }
    });

    const mainCategories = {
        paintingTools: [toolSubCategories, 'ابزارها'],
        carPaint: [carSubCategories, 'رنگ اتومبیلی'],
        woodPaint: [woodSubCategories, 'رنگ چوب'],
        housePaint: [houseSubCategories, 'رنگ ساختمانی'],
        industrialPaint: [industrialSubCategories, 'رنگ صنعتی']
    };

    const data = mainCategories[maincategory];

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/subcategory/products')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.error('Error fetching subcategories:', err);
            });
    }, []);

    const newProducts = [];
    const newSubCategories = data[0];
    for (let i = 0; i < data[0].length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (products[j].ScId === newSubCategories[i].ScId) {
                newProducts.push(products[j]);
            }
        }
    }

    let filteredProducts = [];

    if (checkboxLabel === null) {
        filteredProducts = newProducts;
    } else {
        filteredProducts = newProducts.filter((p) => p.ScId === subcategoryId);
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
                    <MCTopMenu data={data} value={checkboxValue} clickCheckbox={clickCheckbox} />
                    <section className='subcategories-div'>
                        <div className='subcategory-list-head'>دسته‌بندی {data[1]}</div>
                        <ul className='subcategories-list'>
                            {data[0].map((s, index) => {
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