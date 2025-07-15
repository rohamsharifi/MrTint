import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ maincategory, children }) => {

    // STATES
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState(null);
    const [checkboxLabel, setCheckboxLabel] = useState(null);
    const [subcategoryId, setSubcategoryId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [limit] = useState(3);
    const [totalPages, setTotalPages] = useState();

    // FUNCTIONS
    const fetchSubCategories = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/main-category/${maincategory}`)
            setSubCategories(res.data);
        } catch (err) {
            console.error('Error fetching subcategories:', err);
        }
    };

    const fetchMainCategoryProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/main-category/${maincategory}/products`, {
                params: { currentPage, limit, checkboxLabel }
            });
            setProducts(res.data.products);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.error('Error fetching subcategories:', err);
        };
    }

    return (
        <ProductContext.Provider value={
            {
                subCategories,
                products,
                checkboxLabel,
                setCheckboxLabel,
                subcategoryId,
                setSubcategoryId,
                checkboxValue,
                setCheckboxValue,
                fetchSubCategories,
                fetchMainCategoryProducts,
                totalPages,
                setCurrentPage,
                currentPage
            }
        }>
            {children}
        </ProductContext.Provider>
    );
};
