import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAxiosInterceptors } from '../config/axios';

const AdminRoute = () => {
    useAxiosInterceptors();
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    const token = userInfo?.token;
    const role = userInfo?.user.role;

    return token && role == 'admin' ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;