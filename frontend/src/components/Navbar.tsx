import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navStyle: React.CSSProperties = {
    width: '270px',
    backgroundColor: '#1a1625',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '2rem 0',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    borderRight: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const getLinkStyle = (path: string): React.CSSProperties => ({
    display: 'block',
    padding: '0.875rem 1.5rem',
    margin: '0.25rem 0',
    backgroundColor: isActive(path) ? (path === '/' ? 'white' : '#4a4458') : 'transparent',
    color: isActive(path) ? (path === '/' ? '#1a1625' : 'white') : '#a8a8b3',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.05rem',
    fontWeight: 500,
    transition: 'all 0.2s',
  });

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <div>
        <div style={{ padding: '0 2rem', marginBottom: '3rem' }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 700, 
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            c
            <span style={{ display: 'inline-flex', gap: '-2px', margin: '0 -4px' }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2"/>
                <circle cx="16" cy="16" r="4" fill="white"/>
                <rect x="15" y="6" width="2" height="6" fill="white" rx="1"/>
                <rect x="15" y="20" width="2" height="6" fill="white" rx="1"/>
                <rect x="6" y="15" width="6" height="2" fill="white" rx="1"/>
                <rect x="20" y="15" width="6" height="2" fill="white" rx="1"/>
              </svg>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2"/>
                <circle cx="16" cy="16" r="4" fill="white"/>
                <rect x="15" y="6" width="2" height="6" fill="white" rx="1"/>
                <rect x="15" y="20" width="2" height="6" fill="white" rx="1"/>
                <rect x="6" y="15" width="6" height="2" fill="white" rx="1"/>
                <rect x="20" y="15" width="6" height="2" fill="white" rx="1"/>
              </svg>
            </span>
            ki
          </div>
          <div style={{ 
            fontSize: '0.65rem', 
            fontWeight: 400, 
            letterSpacing: '3px', 
            marginTop: '-8px',
            color: '#a8a8b3'
          }}>
            GPU SERVICES
          </div>
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '0 1rem' }}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/provider-dashboard" style={getLinkStyle('/provider-dashboard')}>Providers</Link>
          <Link to="/user-dashboard" style={getLinkStyle('/user-dashboard')}>Users</Link>
          <Link to="/wallet" style={getLinkStyle('/wallet')}>Wallet</Link>
        </div>
      </div>

      {/* Logout Button */}
      <div style={{ padding: '0 1rem' }}>
        <button
          style={{
            width: '100%',
            padding: '0.875rem 1.5rem',
            backgroundColor: 'white',
            color: '#1a1625',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1.05rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => console.log('Logout clicked')}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;