import { Outlet, Navigate } from 'react-router-dom';

const CustomerRoute  = () => {
     const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

  return <Outlet/>;
}

export default CustomerRoute 