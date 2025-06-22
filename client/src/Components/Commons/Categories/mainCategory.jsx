import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from '../Navbar/navbar';
import Header from '../Header/header';
import Products from '../Products/products';

import './mainCategory.css';
import { FaChevronDown } from "react-icons/fa";

const MainCategory = () => {
    const { maincategory } = useParams();

    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    let [isCategoryActive, setIsCategoryActive] = useState(false);
    let [isOrderActive, setIsOrderActive] = useState(false);
    let [pagination, setPagination] = useState(1);
    const [paginationRate, setPaginationRate] = useState(6);
    const [firstButton, setFirstButton] = useState(2);

    const scMenuRef = useRef(null);
    const orderMenuRef = useRef(null);

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

    const orders = ['ارزان ترین', 'گران ترین', 'پرفروش ترین'];

    let iconClassname = `sc-dropdown-icon ${isCategoryActive ? 'active' : null}`;
    let subcategoryDivClassname = `subcategory-div ${isCategoryActive ? 'active' : null}`;
    let iconClassnameOrder = `sc-dropdown-icon-order ${isOrderActive ? 'active' : null}`;
    let ulClassname = `tools-subcategories-ul ${isCategoryActive ? 'active' : null}`;
    let orderUlClassname = `tools-subcategories-ul order ${isOrderActive ? 'active' : null}`;
    let byOrderDivClassname = `byorder-div ${isOrderActive ? 'active' : null}`;

    const decreasePagination = () => {
        const tempLastPage = newProducts.length % paginationRate === 0 ? newProducts.length / paginationRate : newProducts.length / paginationRate + 1;

        if (pagination > 1) {
            setPagination(pagination - 1);
        }
        if (pagination < tempLastPage - 1 && pagination > 3) {
            setFirstButton(firstButton - 1);
        }
    }

    const increasePagination = () => {
        const tempLastPage = newProducts.length % paginationRate === 0 ? newProducts.length / paginationRate : newProducts.length / paginationRate + 1;

        if (pagination < tempLastPage) {
            setPagination(pagination + 1);
        }
        if (pagination > 2 && pagination < tempLastPage - 2) {
            setFirstButton(firstButton + 1);
        }
    }

    const handleFirstButton = () => {
        setPagination(1);
        setFirstButton(2);
    }

    const handleSecondButton = () => {
        setPagination(firstButton);

        if (pagination > 4) {
            setFirstButton(firstButton - 1);
        }
    }

    const handleThirdButton = () => {
        const tempLastPage = newProducts.length % paginationRate === 0 ? newProducts.length / paginationRate : newProducts.length / paginationRate + 1;

        if (pagination < 3) {
            setPagination(3)
        }

        if (pagination > tempLastPage - 2) {
            setPagination(tempLastPage - 2)
        }
    }

    const handleFourthButton = () => {
        const tempLastPage = newProducts.length % paginationRate === 0 ? newProducts.length / paginationRate : newProducts.length / paginationRate + 1;

        setPagination(firstButton + 2);

        if (pagination < tempLastPage - 2) {
            setFirstButton(firstButton + 1);
        }
    }

    const handleLastButton = () => {
        const tempLastPage =
            newProducts.length % paginationRate === 0 ?
                newProducts.length / paginationRate :
                newProducts.length / paginationRate + 1;

        setPagination(tempLastPage);
        if (tempLastPage > 4) setFirstButton(tempLastPage - 3);
    }

    const lastPage = newProducts.length % paginationRate === 0 ? newProducts.length / paginationRate : newProducts.length / paginationRate + 1;

    let firstDotsClass = `pagination-dots-first ${firstButton < 3 ? 'none' : null}`
    let secondDotsClass = `pagination-dots-second ${firstButton > lastPage - 4 ? 'none' : null}`

    let firstButtonClass = `pagination-button first ${pagination === 1 ? 'active ' : ''}`;
    let secondButtonClass = `pagination-button second ${((pagination === firstButton) && (lastPage !== 2)) && ((pagination < lastPage - 2) || (lastPage < 5)) ? 'active' : ''}`;
    let thirdButtonClass = `pagination-button third ${pagination === firstButton + 1 ? 'active ' : ''}`;
    let fourthButtonClass = `pagination-button fourth ${pagination === firstButton + 2 ? 'active ' : ''}`;
    let lastButtonClass = `pagination-button last ${pagination === lastPage ? 'active ' : ''}`;

    let paginationSecClass = `pagination-sec ${newProducts.length <= paginationRate ? 'none' : ''}`

    if (lastPage < 3) {
        secondButtonClass = secondButtonClass + 'none';
        thirdButtonClass = thirdButtonClass + 'none';
        fourthButtonClass = fourthButtonClass + 'none';
    } else if (lastPage < 4) {
        thirdButtonClass = thirdButtonClass + 'none';
        fourthButtonClass = fourthButtonClass + 'none';
    } else if (lastPage < 5) {
        fourthButtonClass = fourthButtonClass + 'none';
    }

    return (
        <div>
            <Header />
            <Navbar />
            <div className="main-category-container">
                <div className='products-and-subcategories'>
                    <section className="main-category-top-menu">
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
                    <section className='subcategories-div'>
                        <div className='subcategory-list-head'>دسته‌بندی {data[1]}</div>
                        <ul className='subcategories-list'>
                            {data[0].map((s) => {
                                return (
                                    <li key={s.ScId} className="tools-subcategories-li">
                                        <div>{s.ScName}</div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                    <Products
                        products={newProducts}
                        pagination={pagination}
                        paginationRate={paginationRate}
                    />
                </div>
                <section className={paginationSecClass}>
                    <button className='pagination-button previous' onClick={decreasePagination}>{`<`}</button>
                    <button
                        className={firstButtonClass}
                        onClick={handleFirstButton}
                    >
                        1
                    </button>
                    <span className={firstDotsClass}>...</span>
                    <button
                        className={secondButtonClass}
                        onClick={handleSecondButton}
                    >
                        {firstButton}
                    </button>
                    <button
                        className={thirdButtonClass}
                        onClick={handleThirdButton}
                    >
                        {firstButton + 1}
                    </button>
                    <button
                        className={fourthButtonClass}
                        onClick={handleFourthButton}
                    >
                        {firstButton + 2}
                    </button>
                    <span className={secondDotsClass}>...</span>
                    <button
                        className={lastButtonClass}
                        onClick={handleLastButton}
                    >
                        {lastPage}
                    </button>
                    <button className='pagination-button next' onClick={increasePagination}>{`>`}</button>
                </section>
            </div>
        </div >

    );
}
export default MainCategory;