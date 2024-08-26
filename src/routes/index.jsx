import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import ProtectedRoute from './ProtectedRoute';

// login option 3 routing
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));

// utilities routing
const UtilsTransactions = Loadable(lazy(() => import('views/utilities/Transactions')));
const UtilsCards = Loadable(lazy(() => import('views/utilities/MoneyCards')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsBeneficiaries = Loadable(lazy(() => import('views/utilities/Beneficiaries')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| ROUTING CONFIGURATION ||============================== //

const routes = [
  {
    path: '/',
    element: <MinimalLayout />,
    children: [
      {
        path: '/',
        element: <AuthLogin3 />, // Set login as default route
      },
      {
        path: 'pages/login/login3',
        element: <AuthLogin3 />
      },
      {
        path: 'pages/register/register3',
        element: <AuthRegister3 />
      }
    ]
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Wrap MainLayout with ProtectedRoute
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: 'dashboard',
            element: <DashboardDefault />
          },
          {
            path: 'utils/util-transactions',
            element: <UtilsTransactions />
          },
          {
            path: 'utils/util-cards',
            element: <UtilsCards />
          },
          {
            path: 'utils/util-shadow',
            element: <UtilsShadow />
          },
          {
            path: 'utils/util-beneficiary',
            element: <UtilsBeneficiaries />
          },
          {
            path: 'sample-page',
            element: <SamplePage />
          }
        ]
      }
    ]
  }
];

const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
