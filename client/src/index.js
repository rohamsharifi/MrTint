import ReactDOM from 'react-dom/client';
import App from "./App";
import { CartProvider } from './Contexts/CartContext';

import "./index.css";
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HelmetProvider>
        <CartProvider >
            <App />
        </CartProvider>
    </HelmetProvider>
);