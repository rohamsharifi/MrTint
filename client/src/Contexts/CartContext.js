import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

    // STATES
    const [count, setCount] = useState(0);
    const [cartProducts, setCartProducts] = useState([]);
    const [productCounts, setProductCounts] = useState([]);
    const [totalPrice, setTotalPrice] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // FUNCTIONS
    const fetchCartCount = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const res = await axios.post('http://localhost:5000/api/cart/count', {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCount(res.data.count);
            } catch (err) {
                console.error('Error fetching cart count:', err);
            }
        } else {
            const products = JSON.parse(localStorage.getItem('guestCart')) || [];
            setCount(products.length);
        }
    };

    const fetchCartProducts = async () => {
        const token = localStorage.getItem('token');
        if (!!token) {
            try {
                const res = await axios.post('http://localhost:5000/api/cart/get-products', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setCartProducts(res.data.products);
                const newProductCounts = res.data.products.map(p => (p.customerproduct.productCount));
                setProductCounts(newProductCounts);

            } catch (err) {
                console.error('Error fetching products:', err);
            }
        } else {
            const products = JSON.parse(localStorage.getItem('guestCart')) || [];
            const productIds = products.map((p) => (p.product));
            try {
                const res = await axios.post('http://localhost:5000/api/cart/get-guest-products', {
                    productIds: productIds
                })
                setCartProducts(res.data.products);

            } catch (err) {
                console.error('Error fetching products:', err);
            }
        }
    }

    const calculateTotalPrice = () => {
        let price = 0;

        cartProducts.map((p) => {
            price += p.price;
        })

        setTotalPrice(price);
    }

    // RENDER
    useEffect(() => {
        const fetchAll = async () => {
            await fetchCartCount();
            await fetchCartProducts();
            setIsLoading(false);
        };

        fetchAll();
    }, [cartProducts]);

    useEffect(() => {
        if (cartProducts.length > 0) {
            calculateTotalPrice();
        }
    }, [cartProducts]);

    return (
        <CartContext.Provider value={
            {
                count,
                setCount,
                fetchCartCount,
                cartProducts,
                setCartProducts,
                productCounts,
                setProductCounts,
                fetchCartProducts,
                totalPrice,
                setTotalPrice,
                calculateTotalPrice,
                isLoading
            }
        }>
            {children}
        </CartContext.Provider>
    );
};
