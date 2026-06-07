import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

const navItems = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/ask-zero', label: 'Zero', icon: '✦' },
  { to: '/autopilot', label: 'Autopilot', icon: '➜' },
  { to: '/cart', label: 'Cart', icon: '🛒' },
  { to: '/profile', label: 'Profile', icon: '☺' },
];

const getActiveNav = (pathname: string) => {
  if (pathname === '/') return '/';
  if (['/ask-zero', '/conversation', '/craving-radar', '/recommendations'].includes(pathname)) return '/ask-zero';
  if (['/autopilot', '/group-ordering', '/budget-optimizer'].includes(pathname)) return '/autopilot';
  if (['/cart', '/confirmation'].includes(pathname)) return '/cart';
  return '/profile';
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const activeNav = getActiveNav(location.pathname);

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="status-bar">
          <span>9:41</span>
          <div className="status-icons">
            <span>5G</span>
            <span>•••</span>
            <span>100%</span>
          </div>
        </div>

        <main className="screen-content">{children}</main>

        <button className="floating-zero" onClick={() => navigate('/ask-zero')} aria-label="Open Zero assistant">
          <span>✦</span>
          <small>Zero</small>
        </button>

        <nav className="bottom-nav">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={`nav-item ${activeNav === item.to ? 'active' : ''}`}>
              <span className="nav-icon">{item.icon}</span>
              <small>{item.label}</small>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <header className="page-header fade-in">
    <p className="eyebrow">Zomato Zero</p>
    <h1>{title}</h1>
    {subtitle ? <p className="subtitle">{subtitle}</p> : null}
  </header>
);
