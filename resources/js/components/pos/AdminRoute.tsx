
import {Outlet, Navigate } from 'react-router-dom';



const AdminRoute = () => {

    const admin_token = localStorage.getItem("admin_token") || sessionStorage.getItem("admin_token");

    if(!admin_token){
        return <Navigate to="/admin/login" replace />;
    }
  return <Outlet/>;
}

export default AdminRoute