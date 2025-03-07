import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Finance = lazy(() => import('../pages/Finance'));
const Tabs = lazy(() => import('../pages/Components/Tabs'));
const Modals = lazy(() => import('../pages/Components/Modals'));
const Notification = lazy(() => import('../pages/Components/Notification'));
const Advanced = lazy(() => import('../pages/DataTables/Advanced'));
const AccountSetting = lazy(() => import('../pages/Users/AccountSetting'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));

const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
    },
    // analytics page
    {
        path: '/analytics',
        element: <Analytics />,
    },
    // finance page
    {
        path: '/finance',
        element: <Finance />,
    },
    // components page
    {
        path: '/components/tabs',
        element: <Tabs />,
    },
    {
        path: '/components/modals',
        element: <Modals />,
    },
    {
        path: '/components/notifications',
        element: <Notification />,
    },
    // Data Tables
    {
        path: '/datatables/advanced',
        element: <Advanced />,
    },
    // Users page
    {
        path: '/users/user-account-settings',
        element: <AccountSetting />,
    },
    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    // {
    //     path: '*',
    //     element: <Error />,
    //     layout: 'blank',
    // },
];

export { routes };
