// src/Sidebar.tsx
import React from 'react';
import type { UserProfile } from './types';
import { 
  LayoutDashboard, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Terminal, 
  HardDrive 
} from 'lucide-react'; // Using lucide-react for icons

interface SidebarProps {
  profile: UserProfile | undefined;
  isLoading: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ profile, isLoading }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        {/* Placeholder Logo */}
        <div className="logo">
          <img src="https://via.placeholder.com/150x50.png?text=LOGO" alt="Logo" />
        </div>

        <ul className="nav-links">
          <li className="active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </li>
          <li>
            <Terminal size={20} />
            <span>Jobs</span>
          </li>
          <li>
            <HardDrive size={20} />
            <span>Nodes</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-bottom">
        <div className="profile">
          {isLoading ? (
            <div className="profile-loading">Loading...</div>
          ) : profile ? (
            <>
              <div className="profile-name">{profile.name}</div>
              <div className="profile-credits">
                Credits: ${profile.credits.toFixed(2)}
              </div>
            </>
          ) : (
            <div className="profile-error">No User</div>
          )}
        </div>
        <ul className="nav-links">
          <li>
            <Settings size={20} />
            <span>Settings</span>
          </li>
          <li>
            <HelpCircle size={20} />
            <span>Support</span>
          </li>
          <li>
            <LogOut size={20} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};