import { Outlet } from 'react-router';
import './AuthLayout.css';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-layout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
