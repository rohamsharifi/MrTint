import { useParams } from "react-router-dom";

import Navbar from '../Navbar/navbar';
import Header from '../Header/header';
import MainCategory from "./mainCategory";

import './mainCategory.css';
import { ProductProvider } from "../../../Contexts/ProductContext";

const MainCategoryPage = () => {
    const { maincategory } = useParams();

    const mainCategories = {
        painting_tools: 'ابزارها',
        car_paint: 'رنگ اتومبیلی',
        wood_paint: 'رنگ چوب',
        house_paint: 'رنگ ساختمانی',
        industrial_paint: 'رنگ صنعتی'
    };

    const data = mainCategories[maincategory];

    return (
        <div>
            <Header />
            <Navbar />

            <ProductProvider maincategory={maincategory}>
                <MainCategory data={data} />
            </ProductProvider>
        </div>

    );
}
export default MainCategoryPage;