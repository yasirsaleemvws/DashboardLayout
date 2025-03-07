import { lazy } from 'react';
import CompanyRoute from './CompanyRoute';
import Parking from '../pages/company/parking/Parking';
import AccessRule from '../pages/company/access-rule/AccessRule';
import Team from '../pages/company/team/Team';
import ParkingSection from '../pages/company/parking-section/ParkingSection';
import Settings from '../pages/company/settings/Settings';

const AdminLogin = lazy(() => import('../pages/Authentication/AdminLogin'));
const SignIn = lazy(() => import('../pages/Authentication/SignIn'));
const SignUP = lazy(() => import('../pages/Authentication/SignUp'));

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Analytics = lazy(() => import('../pages/Analytics'));
const Finance = lazy(() => import('../pages/Finance'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));

const routes = [
    {
        path: '/admin-login',
        element: <AdminLogin />,
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