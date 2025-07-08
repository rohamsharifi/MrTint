import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProduct = () => useContext(ProductContext);

export const ProductProvider = ({ maincategory, children }) => {

    // STATES
    const [subCategories, setSubCategories] = useState([]);
    const [products, setProducts] = useState([]);
    let [filteredProducts, setFilteredProducts] = useState([]);
    const [checkboxValue, setCheckboxValue] = useState(null);
    const [checkboxLabel, setCheckboxLabel] = useState(null);
    const [subcategoryId, setSubcategoryId] = useState(null);

    // FUNCTIONS
    const fetchSubCategories = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/subcategories/${maincategory}`)
            setSubCategories(res.data);
        } catch (err) {
            console.error('Error fetching subcategories:', err);
        }
    };

    const fetchMainCategoryProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/subcategories/${maincategory}/products`)
            setProducts(res.data.products);
        } catch (err) {
            console.error('Error fetching subcategories:', err);
        };
    }

    const handleFilterProducts = () => {
        let filtered = [];

        if (checkboxLabel === null) {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter((p) => p.ScId === subcategoryId);
        }

        setFilteredProducts(filtered);
    }

    // RENDER
    useEffect(() => {
        fetchSubCategories();
    }, [maincategory]);

    useEffect(() => {
        const fetchAll = async () => {
            await fetchMainCategoryProducts();
            handleFilterProducts();
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
                setCheckboxValue,
                filteredProducts
            }
        }>
            {children}
        </ProductContext.Provider>
    );
};
