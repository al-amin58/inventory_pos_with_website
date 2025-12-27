import React from "react";
import {Outlet} from "react-router-dom";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import CartDrawer from "@/components/website/CartDrawer";

const WebLayout: React.FC = () => {
    return(
        <>
            <Header/>
            <main className="min-h-screen">
                <Outlet/>
                <CartDrawer/>
            </main>
            
            <Footer/>
        </>
    )
};

export default WebLayout;