import '../css/app.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import App from './main';
import { CartProvider } from '@/components/website/CartContext';
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById("app")!).render(
    <React.StrictMode>
        <CartProvider>
            <App/>
            <Toaster position="top-right" reverseOrder={false} />
        </CartProvider>
    </React.StrictMode>
);