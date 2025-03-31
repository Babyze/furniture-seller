import { createBrowserRouter, Navigate } from 'react-router';
import { ROUTES } from '@src/constants/routes';

// Layouts
import AuthLayout from '@src/components/layouts/AuthLayout';
import DashboardLayout from '@src/components/layouts/DashboardLayout';

// Route protection
import PrivateRoute from '@src/routes/PrivateRoute';
import PublicRoute from '@src/routes/PublicRoute';

// Auth pages
import SignIn from '@src/pages/auth/SignIn';

// Dashboard pages
import Dashboard from '@src/pages/dashboard/Dashboard';

// Error pages
import NotFound from '@src/pages/error/NotFound';
import Product from '@src/pages/products/Product';
import CreateProduct from '@src/pages/products/create-product/CreateProduct';
import UpdateProduct from '@src/pages/products/update-product/UpdateProduct';
import AccountSetting from '@src/pages/settings/AccountSetting';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={ROUTES.DASHBOARD.ROOT} replace />,
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: ROUTES.AUTH.SIGN_IN,
        element: (
          <PublicRoute>
            <SignIn />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD.ROOT,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: ROUTES.DASHBOARD.PRODUCTS,
        element: <Product />,
      },
      {
        path: ROUTES.DASHBOARD.CREATE_PRODUCT,
        element: <CreateProduct />,
      },
      {
        path: ROUTES.DASHBOARD.UPDATE_PRODUCT,
        element: <UpdateProduct />,
      },
      {
        path: ROUTES.DASHBOARD.SETTINGS,
        element: <AccountSetting />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
]);
