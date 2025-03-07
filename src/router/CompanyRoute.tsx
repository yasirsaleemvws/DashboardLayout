import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAxiosInterceptors } from '../config/axios';

const CompanyRoute = () => {
    useAxiosInterceptors();
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
    const token = userInfo?.token;

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default CompanyRoute;