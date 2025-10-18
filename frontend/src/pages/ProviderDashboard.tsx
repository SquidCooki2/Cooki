import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../api";
import type { DashboardData } from "../types";

const ProviderDashboard: React.FC = () => {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData(1)
      .then((data) => {
        setDashboard(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading provider dashboard...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!dashboard) return <div>No dashboard data available.</div>;

  return (
    <div className="provider-dashboard">
      <h1>Provider Dashboard</h1>
      <section>
        <h2>Profile</h2>
        <p>Name: {dashboard.profile.name}</p>
        <p>Credits: ${dashboard.profile.credits}</p>
      </section>
      <section>
        <h2>Stats</h2>
        <p>Total Earned: ${dashboard.stats.totalEarned}</p>
        <p>Jobs Completed: {dashboard.stats.jobsCompleted}</p>
        <p>
          Available GPUs: {dashboard.stats.availableGpus} /{" "}
          {dashboard.stats.totalGpus}
        </p>
      </section>
      <section>
        <h2>GPU Info</h2>
        <p>Name: {dashboard.gpuInfo.name}</p>
        <p>Status: {dashboard.gpuInfo.status}</p>
        <p>Utilization: {dashboard.gpuInfo.utilization}%</p>
        <p>
          VRAM: {dashboard.gpuInfo.memoryUsed} / {dashboard.gpuInfo.memoryTotal}{" "}
          GB
        </p>
        <p>Temperature: {dashboard.gpuInfo.temp}°C</p>
      </section>
      <section>
        <h2>Current Job</h2>
        {dashboard.currentJob ? (
          <div>
            <p>Name: {dashboard.currentJob.name}</p>
            <p>Status: {dashboard.currentJob.status}</p>
            <p>Progress: {dashboard.currentJob.progress}%</p>
          </div>
        ) : (
          <p>No job running.</p>
        )}
      </section>
      <section>
        <h2>Recent Jobs</h2>
        {dashboard.recentJobs.length > 0 ? (
          <ul>
            {dashboard.recentJobs.map((job) => (
              <li key={job.id}>
                {job.name} - {job.status} - Started: {job.startedAt}
                {job.duration && <> - Duration: {job.duration}</>}
                {job.cost !== undefined && <> - Earned: ${job.cost}</>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent jobs.</p>
        )}
      </section>
    </div>
  );
};

export default ProviderDashboard;
