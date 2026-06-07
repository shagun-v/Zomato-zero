import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

const navItems = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/ask-zero', label: 'Zero', icon: '✦' },
  { to: '/autopilot', label: 'Autopilot', icon: '➜' },
  { to: '/cart', label: 'Cart', icon: '🛒' },
  { to: '/profile', label: 'Profile', icon: '☺' },
];

export const Layout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <div className="gradient-orb orb-one" />
        <div className="gradient-orb orb-two" />
        <main className="screen-content">{children}</main>
        <button className="floating-zero" onClick={() => navigate('/ask-zero')} aria-label="Open Zero assistant">✦</button>
        <nav className="bottom-nav">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className={`nav-item ${location.pathname === item.to ? 'active' : ''}`}>
              <span>{item.icon}</span>
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
    <div>
      <p className="eyebrow">Zomato Zero</p>
      <h1>{title}</h1>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </div>
  </header>
);
