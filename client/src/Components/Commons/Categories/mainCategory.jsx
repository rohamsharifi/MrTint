import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from '../Navbar/navbar';
import Header from '../Header/header';
import FilterMenu from "./filterMenu";

import './paintingTools.css';
import { FaChevronDown } from "react-icons/fa";

const MainCategory = () => {
    const { maincategory } = useParams();

    const [subCategories, setSubCategories] = useState([]);
    let [isCategoryActive, setIsCategoryActive] = useState(false);
    let [isOrderActive, setIsOrderActive] = useState(false);
    let [isMenuOpen, setIsMenuOpen] = useState(false);

    const scMenuRef = useRef(null);
    const orderMenuRef = useRef(null);
    const filterMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (scMenuRef.current && !scMenuRef.current.contains(event.target)) {
                setIsCategoryActive(false);
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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const orders = ['ارزان ترین', 'گران ترین', 'پرفروش ترین'];

    let iconClassname = `sc-dropdown-icon ${isCategoryActive ? 'active' : null}`;
    let subcategoryDivClassname = `subcategory-div ${isCategoryActive ? 'active' : null}`;
    let iconClassnameOrder = `sc-dropdown-icon-order ${isOrderActive ? 'active' : null}`;
    let ulClassname = `tools-subcategories-ul ${isCategoryActive ? 'active' : null}`;
    let orderUlClassname = `tools-subcategories-ul order ${isOrderActive ? 'active' : null}`;
    let byOrderDivClassname = `byorder-div ${isOrderActive ? 'active' : null}`;
    let filterMenuClass = `filter-menu-aside ${isMenuOpen ? 'open' : null}`;
    let opacity = isMenuOpen ? '0.2' : '1';

    return (
        <main>
            <FilterMenu filterMenuClass={filterMenuClass} />
            <div style={{ opacity: opacity }}>
                <Header />
                <Navbar />
                <div className="tools-container">
                    <div className="tools-top-menu">
                        <div
                            onClick={() => setIsCategoryActive(!isCategoryActive)}
                            ref={scMenuRef}
                            className={subcategoryDivClassname}
                        >
                            <button className="tools-subcategories-button">
                                دسته‌بندی {data[1]}
                            </button>
                            <FaChevronDown className={iconClassname} />
                        </div>
                        <ul className={ulClassname}>
                            {data[0].map((s) => {
                                return (
                                    <li key={s.ScId} className="tools-subcategories-li">
                                        <div>{s.ScName}</div>
                                    </li>
                                );
                            })}
                        </ul>
                        <button
                            className="maincategory-filters"
                            onClick={() => setIsMenuOpen(true)}
                            ref={filterMenuRef}
                        >فیلترها</button>
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
                    </div>
                </div>
            </div>
        </main>
    );
}
export default MainCategory;