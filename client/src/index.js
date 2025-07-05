import ReactDOM from 'react-dom/client';
import App from "./App";
import { CartProvider } from './Contexts/CartContext';

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <CartProvider >
        <App />
    </CartProvider>
);