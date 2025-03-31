import { Navigate } from 'react-router';
import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD.ROOT} replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
