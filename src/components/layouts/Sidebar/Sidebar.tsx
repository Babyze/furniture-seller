import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  RiDashboardLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiSettings3Line,
  RiShoppingBag3Line,
} from 'react-icons/ri';
import { ROUTES } from '@src/constants/routes';
import { useAuth } from '@src/hooks/useAuth';
import './Sidebar.css';

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    path: ROUTES.DASHBOARD.ROOT,
    label: 'Dashboard',
    icon: RiDashboardLine,
  },
  {
    path: ROUTES.DASHBOARD.PRODUCTS,
    label: 'Products',
    icon: RiShoppingBag3Line,
  },
  {
    path: ROUTES.DASHBOARD.SETTINGS,
    label: 'Account Settings',
    icon: RiSettings3Line,
  },
];

const Sidebar = ({ className = '' }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate(ROUTES.AUTH.SIGN_IN);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Desktop Sidebar
  const renderDesktopSidebar = () => (
    <aside className={`sidebar ${className}`}>
      <div className="sidebar__header">
        <Link to={ROUTES.DASHBOARD.ROOT} className="sidebar__logo">
          <h1>mart</h1>
        </Link>
      </div>

      <nav className="sidebar__menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'is-active' : ''}`}
                title={item.label}
              >
                <item.icon className="menu-item__icon" />
              </Link>
            </li>
          ))}
          <li>
            <button onClick={handleSignOut} className="menu-item" title="Sign Out">
              <RiLogoutBoxLine className="menu-item__icon" />
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );

  // Mobile Header & Menu
  const renderMobileMenu = () => (
    <div className="mobile-menu">
      <div className="mobile-menu__header">
        <button className="mobile-menu__toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <RiMenuLine />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="mobile-menu__overlay" onClick={closeMenu} />
          <nav className="mobile-menu__content">
            <ul>
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`mobile-menu__item ${location.pathname === item.path ? 'is-active' : ''}`}
                    onClick={closeMenu}
                  >
                    <item.icon className="mobile-menu__icon" />
                    <span className="mobile-menu__label">{item.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    handleSignOut();
                    closeMenu();
                  }}
                  className="mobile-menu__item"
                >
                  <RiLogoutBoxLine className="mobile-menu__icon" />
                  <span className="mobile-menu__label">Sign Out</span>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );

  return (
    <>
      {renderDesktopSidebar()}
      {renderMobileMenu()}
    </>
  );
};

export default Sidebar;
