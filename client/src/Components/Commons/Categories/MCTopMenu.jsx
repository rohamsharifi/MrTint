import { useState, useRef, useEffect } from 'react';

import { FaChevronDown } from "react-icons/fa";

import './MCTopMenu.css';

const MCTopMenu = ({ data, value, clickCheckbox }) => {
    let [isCategoryActive, setIsCategoryActive] = useState(false);
    let [isOrderActive, setIsOrderActive] = useState(false);
    let [SCListHeight, setSCListHeight] = useState('0');

    const scMenuRef = useRef(null);
    const orderMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (scMenuRef.current && !scMenuRef.current.contains(event.target)) {
                setTimeout(() => setSCListHeight('0'), 500);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (orderMenuRef.current && !orderMenuRef.current.contains(event.target)) {
                setIsOrderActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const changeListHeight = () => {
        if (SCListHeight === '0') {
            setSCListHeight('23rem');
        } else {
            setSCListHeight('0');
        }
    }

    const orders = ['مرتبط ترین', 'ارزان ترین', 'گران ترین', 'پرفروش ترین'];

    let iconClassname = `sc-dropdown-icon ${SCListHeight === '23rem' ? 'active' : null}`;
    let subcategoryDivClassname = `subcategory-div ${SCListHeight === '23rem' ? 'active' : null}`;
    let iconClassnameOrder = `sc-dropdown-icon-order ${isOrderActive ? 'active' : null}`;
    let ulClassname = ` ${isCategoryActive ? 'active' : 'active'}`;
    let orderUlClassname = `tools-subcategories-ul order ${isOrderActive ? 'active' : null}`;
    let byOrderDivClassname = `byorder-div ${isOrderActive ? 'active' : null}`;

    return (
        <section className="main-category-top-menu">
            <div
                onClick={changeListHeight}
                ref={scMenuRef}
                className={subcategoryDivClassname}
            >
                <button className="tools-subcategories-button">
                    دسته‌بندی {data[1]}
                </button>
                <FaChevronDown className={iconClassname} />
            </div>
            <ul className='tools-subcategories-ul' style={{ maxHeight: SCListHeight }}>
                {data[0].map((s, index) => {
                    return (
                        <li
                            key={s.ScId}
                            className="tools-subcategories-li"
                            onClick={() => clickCheckbox(index, s.ScName, s.ScId)}
                        >
                            <div>
                                <input
                                    type='checkbox'
                                    className='mc-checkbox-input'
                                    checked={index === value}
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
            <div>
                <div
                    className={byOrderDivClassname}
                    onClick={() => setIsOrderActive(!isOrderActive)}
                    ref={orderMenuRef}
                >
                    <button className="tools-byorder-button">ترتیب نمایش</button>
                    <FaChevronDown className={iconClassnameOrder} />
                </div>
                <ul className={orderUlClassname}>
                    {orders.map((order, index) => {
                        return (
                            <li key={index} className="tools-subcategories-li">
                                <div>{order}</div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
}
export default MCTopMenu;