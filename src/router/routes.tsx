import { lazy } from 'react';
import CompanyRoute from './CompanyRoute';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Finance = lazy(() => import('../pages/Finance'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const AdminLogin = lazy(() => import('../pages/Authentication/AdminLogin'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const Login = lazy(() => import('../pages/Authentication/Login'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));

const routes = [
    {
        path: '/admin-login',
        element: <AdminLogin />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/cover-password-reset',
        element: <RecoverIdCover />,
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
                path: '/analytics',
                element: <Analytics />,
            },
            {
                path: '/finance',
                element: <Finance />,
            },
            {
                path: '/components/tabs',
                element: <Tabs />,
            },
            {
                path: '/components/modals',
                element: <Modals />,
            },
            {
                path: '/datatables/advanced',
                element: <Advanced />,
            },
            {
                path: '/users/user-account-settings',
                element: <AccountSetting />,
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