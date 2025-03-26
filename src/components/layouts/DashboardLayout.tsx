import { Outlet } from 'react-router';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      {/* <Sidebar className="dashboard-layout__sidebar" /> */}
      <div className="dashboard-layout__main">
        {/* <Header className="dashboard-layout__header" /> */}
        <main className="dashboard-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
