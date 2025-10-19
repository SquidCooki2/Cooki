import React from "react";
import { Link, useLocation } from "react-router-dom";
import cookiLogo from "../assets/cooki_logo.png";
import profilePic from "../assets/profile_pic.png";

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
          <img 
            src={cookiLogo} 
            alt="Cooki GPU Services"
            style={{ 
              width: '160px',
              maxWidth: '100%',
              height: 'auto'
            }}
          />
        </div>

        {/* Navigation Links */}
        <div style={{ padding: '0 1rem' }}>
          <Link to="/" style={getLinkStyle('/')}>Home</Link>
          <Link to="/provider-dashboard" style={getLinkStyle('/provider-dashboard')}>Providers</Link>
          <Link to="/user-dashboard" style={getLinkStyle('/user-dashboard')}>Users</Link>
          <Link to="/wallet" style={getLinkStyle('/wallet')}>Wallet</Link>
        </div>
      </div>

      {/* Bottom Section: Profile + Logout */}
      <div style={{ padding: '0 1rem' }}>
        {/* Profile Section */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          marginBottom: '1rem',
          borderRadius: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }}>
          <img 
            src={profilePic}
            alt="Profile"
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(168, 85, 211, 0.5)'
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{
              color: '#fff',
              fontWeight: '600',
              fontSize: '1rem',
              marginBottom: '0.25rem'
            }}>John Doe</div>
            <div style={{
              color: '#a8a8b3',
              fontSize: '0.875rem'
            }}>$145.50</div>
          </div>
        </div>

        {/* Logout Button */}
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