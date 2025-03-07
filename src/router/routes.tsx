import { lazy } from 'react';
import CompanyRoute from './CompanyRoute';
import Settings from '../pages/company/settings/Settings';

// Auth Routes
const AdminLogin = lazy(() => import('../pages/Authentication/AdminLogin'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUP = lazy(() => import('../pages/Authentication/SignUp'));
const ForgetPassword = lazy(() => import('../pages/Authentication/ForgetPassword'));
const ResetPassword = lazy(() => import('../pages/Authentication/ResetPassword'));

// Company Routes
const Dashboard = lazy(() => import('../pages/company/dashbaord/Dashboard'));
const Parking = lazy(() => import('../pages/company/parking/Parking'));
const ParkingSection = lazy(() => import('../pages/company/parking-section/ParkingSection'));
const AccessRule = lazy(() => import('../pages/company/access-rule/AccessRule'));
const Finance = lazy(() => import('../pages/company/finance/Finance'));
const Team = lazy(() => import('../pages/company/team/Team'));

const routes = [
    {
        path: '/admin/login',
        element: <AdminLogin />,
        layout: 'blank',
    },
    {
        path: '/',
        element: <SignIn />,
        layout: 'blank',
    },
    {
        path: '/signin',
        element: <SignIn />,
        layout: 'blank',
    },
    {
        path: '/signup',
        element: <SignUP />,
        layout: 'blank',
    },
    {
        path: '/forget-password',
        element: <ForgetPassword />,
        layout: 'blank',
    },
    {
        path: '/reset-password/:id',
        element: <ResetPassword />,
        layout: 'blank',
    },
    {
        path: '/',
        element: <CompanyRoute />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />,
            },
            {
                path: '/parking',
                element: <Parking />,
            },
            {
                path: '/parking-section',
                element: <ParkingSection />,
            },
            {
                path: '/access-rule',
                element: <AccessRule />,
            },
            {
                path: '/finance',
                element: <Finance />,
            },
            {
                path: '/team',
                element: <Team />,
            },

            {
                path: '/settings',
                element: <Settings />,
            },
        ],
    },

    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },
];

export { routes };