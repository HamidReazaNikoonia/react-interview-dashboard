import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from 'utils/ProtectedRoute';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const InterviewList = Loadable(lazy(() => import('views/interview-list')));
const InterviewResult = Loadable(lazy(() => import('views/interview-result')));
const CreateInterview = Loadable(lazy(() => import('views/create-interview')));
// const PaymentResult = Loadable(lazy(() => import('views/payment-result')));

// ==============================|| MAIN ROUTING ||============================== //

const DashboardAuthContainer = () => {
    return (
        <ProtectedRoute>
            <DashboardDefault />
        </ProtectedRoute>
    );
};

const InterviewListAuthContainer = () => {
    return (
        <ProtectedRoute>
            <InterviewList />
        </ProtectedRoute>
    );
};

const InterviewResultAuthContainer = () => {
    return (
        <ProtectedRoute>
            <InterviewResult />
        </ProtectedRoute>
    );
};

const CreateInterviewAuthContainer = () => {
    return (
        <ProtectedRoute>
            <CreateInterview />
        </ProtectedRoute>
    );
};

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardAuthContainer />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardAuthContainer />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'interview-list',
            element: <InterviewListAuthContainer />
        },
        {
            path: 'interview-result/:id',
            element: <InterviewResultAuthContainer />
        },
        {
            path: 'create-interview',
            element: <CreateInterviewAuthContainer />
        }
    ]
};

export default MainRoutes;
