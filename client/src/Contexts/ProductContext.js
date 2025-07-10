import { createContext, useContext, useState, useEffect } from 'react';
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
        if (checkboxLabel === null) {
            try {
                const res = await axios.get(`http://localhost:5000/api/main-category/${maincategory}/all-products`);
                setProducts(res.data.products);
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            };
        } else {
            try {
                const res = await axios.get(`http://localhost:5000/api/main-category/${maincategory}/${checkboxLabel}`);
                setProducts(res.data.products);
            } catch (err) {
                console.error('Error fetching subcategories:', err);
            };
        }
    }

    // RENDER
    useEffect(() => {
        fetchSubCategories();
    }, [maincategory]);

    useEffect(() => {
        const fetchAll = async () => {
            await fetchMainCategoryProducts();
        };

        fetchAll();
    }, [checkboxLabel]);

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
                setCheckboxValue
            }
        }>
            {children}
        </ProductContext.Provider>
    );
};
