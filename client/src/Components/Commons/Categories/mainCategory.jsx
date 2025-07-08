import { useState } from "react";
import { useProduct } from "../../../Contexts/ProductContext";

import Products from '../Products/products';
import MCTopMenu from "./MCTopMenu";

import './mainCategory.css';

const MainCategory = ({ data }) => {
    const { subCategories, checkboxLabel, checkboxValue, setCheckboxLabel, setSubcategoryId, setCheckboxValue, filteredProducts } = useProduct();

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
    );
}
export default MainCategory;