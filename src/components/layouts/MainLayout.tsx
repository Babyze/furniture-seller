import { Outlet } from 'react-router';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout">
      <main className="layout__main">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
