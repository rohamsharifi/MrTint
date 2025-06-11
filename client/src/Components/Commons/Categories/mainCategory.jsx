import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Navbar from '../Navbar/navbar';
import Header from '../Header/header';

import './paintingTools.css';
import { FaChevronDown } from "react-icons/fa";

const MainCategory = () => {
    const { maincategory } = useParams();
    console.log(maincategory);

    const [subCategories, setSubCategories] = useState([]);
    let [isCategoryActive, setIsCategoryActive] = useState(false);

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
        paintingTools: toolSubCategories,
        carPaint: carSubCategories,
        woodPaint: woodSubCategories,
        housePaint: houseSubCategories,
        industrialPaint: industrialSubCategories
    };

    const subCategory = mainCategories[maincategory];

    let iconClassname = `sc-dropdown-icon ${isCategoryActive ? 'active' : null}`;
    let iconClassnameOrder = `sc-dropdown-icon-order ${isCategoryActive ? 'active' : null}`;
    let ulClassname = `tools-subcategories-ul ${isCategoryActive ? 'active' : null}`;

    return (
        <div>
            <Header />
            <Navbar />
            <div className="tools-container">
                <div className="tools-top-menu">
                    <div onClick={() => setIsCategoryActive(!isCategoryActive)}>
                        <button
                            className="tools-subcategories-button"
                        >
                            دسته‌بندی ابزارها
                        </button>
                        <FaChevronDown className={iconClassname} />
                    </div>
                    <ul className={ulClassname}>
                        {subCategory.map((s) => {
                            return (
                                <li key={s.ScId} className="tools-subcategories-li">
                                    <div>{s.ScName}</div>
                                </li>
                            );
                        })}
                    </ul>
                    <button>فیلترها</button>
                    <div>
                        <button className="tools-byorder-button">ترتیب نمایش</button>
                        <FaChevronDown className={iconClassnameOrder} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MainCategory;