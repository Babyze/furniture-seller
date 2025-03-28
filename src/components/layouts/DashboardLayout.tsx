import { Outlet } from 'react-router';
import Sidebar from './Sidebar/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="dashboard__main">
        <div className="dashboard__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
