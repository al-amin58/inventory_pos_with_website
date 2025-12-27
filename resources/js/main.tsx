import React from 'react';
import Home from './pages/welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebLayout from '@/pages/layouts/WebLayout';
import Shop from '@/pages/website/Shop';
import ViewCart from '@/pages/website/ViewCart';
import Checkout from '@/pages/website/Checkout';
import SingleProduct from '@/pages/website/SingleProduct';
import Login from '@/pages/auth/login';
import Register from '@/pages/auth/register';
import ForgotPassword from '@/pages/auth/forgot-password';
import CustomerDashboard from '@/pages/website/customer_dashboard/dashboard';
import CustomerRoute from '@/components/website/CustomerRoute ';
import ResetPassword from '@/pages/auth/reset-password';
import StaffLogin from '@/pages/pos/auth/Login';
import AdminDashboard from '@/pages/dashboard';
import AdminRoute from '@/components/pos/AdminRoute';





const App: React.FC = () => {
    return(
        
        <BrowserRouter>
            <Routes>
                {/* website route list*/}
                <Route element={<WebLayout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='/cart' element={<ViewCart/>}/>
                    <Route path='/checkout' element={<Checkout/>}/>
                    <Route path="/product/:id" element={<SingleProduct />} />
                    <Route path='/login' element={<Login canResetPassword={true} canRegister={true}/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route element={<CustomerRoute/>}>
                        <Route path="/dashboard" element={<CustomerDashboard/>} />
                    </Route>
                </Route>

                {/* pos route list*/}
                <Route path='admin'>
                       <Route path='login' element={<StaffLogin/>}/> 
                       
                       <Route element={<AdminRoute/>}>
                            <Route path='dashboard' element={<AdminDashboard/>}/>
                       </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );

};

export default App;