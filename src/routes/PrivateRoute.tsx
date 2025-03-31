import { Navigate, useLocation } from 'react-router';
import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
