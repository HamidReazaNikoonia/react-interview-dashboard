import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
const PaymentResult = Loadable(lazy(() => import('views/payment-result')));

// ==============================|| ROUTING RENDER ||============================== //

const route = {
    path: 'payment-result/',
    element: <PaymentResult />
};

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes, route]);
}
