// src/DashboardPage.tsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { DashboardContent } from './DashboardContent';
import { fetchDashboardData } from './api';
import type { DashboardData } from './types';
import './styles.css'; // Import our styles

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This function is called when the component mounts
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Call our API function
        const result = await fetchDashboardData();
        setData(result);
      } catch (err) {
        setError('Failed to fetch dashboard data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []); // The empty array [] means this effect runs only once

  return (
    <div className="dashboard-layout">
      {/* The sidebar only needs the profile data.
        We check if data exists before passing it.
      */}
      <Sidebar
        profile={data?.profile}
        isLoading={loading}
      />

      {/* The main content area gets all the other data.
        It will manage its own internal loading/error/data states.
      */}
      <main className="main-content">
        {loading && <div className="loading-spinner">Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        {data && <DashboardContent data={data} />}
      </main>
    </div>
  );
};