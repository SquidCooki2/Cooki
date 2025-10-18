// src/DashboardContent.tsx
import React from 'react';
import type { DashboardData, GpuInfo, Job } from '../types';
import { DollarSign, CheckCircle, Cpu, Server } from 'lucide-react';

// --- Reusable StatCard Component ---
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
  <div className="card stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-info">
      <span className="stat-title">{title}</span>
      <span className="stat-value">{value}</span>
    </div>
  </div>
);

// --- GPU Info Component ---
const GpuInfoCard: React.FC<{ gpu: GpuInfo }> = ({ gpu }) => (
  <div className="card">
    <h3>Your GPU</h3>
    <div className="gpu-info">
      <strong>{gpu.name}</strong>
      <span className={`status-badge status-${gpu.status.toLowerCase()}`}>
        {gpu.status}
      </span>
    </div>
    <div className="gpu-stats">
      <div>GPU Utilization: {gpu.utilization}%</div>
      <div>Memory: {gpu.memoryUsed}GB / {gpu.memoryTotal}GB</div>
      <div>Temp: {gpu.temp}°C</div>
    </div>
  </div>
);

// --- Current Job Component ---
const CurrentJobCard: React.FC<{ job: Job | null }> = ({ job }) => (
  <div className="card">
    <h3>Current Job</h3>
    {job ? (
      <div className="current-job">
        <strong>{job.name}</strong>
        <span className={`status-badge status-${job.status.toLowerCase()}`}>
          {job.status}
        </span>
        <div className="job-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${job.progress || 0}%` }}
          ></div>
          <span>{job.progress || 0}%</span>
        </div>
      </div>
    ) : (
      <p>No active job.</p>
    )}
  </div>
);

// --- Recent Jobs Table Component ---
const RecentJobsTable: React.FC<{ jobs: Job[] }> = ({ jobs }) => (
  <div className="card recent-jobs">
    <h3>Recent Jobs</h3>
    <table>
      <thead>
        <tr>
          <th>Job ID</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>
                <span className={`status-badge status-${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
              </td>
              <td>{job.duration || 'N/A'}</td>
              <td>${job.cost?.toFixed(2) || 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No recent jobs.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// --- Main Content Component ---
interface DashboardContentProps {
  data: DashboardData;
}

export const DashboardContent: React.FC<DashboardContentProps> = ({ data }) => {
  const { stats, gpuInfo, currentJob, recentJobs } = data;

  return (
    <div className="dashboard-content">
      <header>
        <h1>Dashboard</h1>
      </header>

      {/* Stats Cards Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Earned"
          value={`$${stats.totalEarned.toFixed(2)}`}
          icon={<DollarSign />}
        />
        <StatCard
          title="Jobs Completed"
          value={stats.jobsCompleted}
          icon={<CheckCircle />}
        />
        <StatCard
          title="Available GPUs"
          value={stats.availableGpus}
          icon={<Cpu />}
        />
        <StatCard
          title="Total GPUs"
          value={stats.totalGpus}
          icon={<Server />}
        />
      </div>

      {/* Main Content Sections */}
      <div className="content-grid">
        <div className="content-left">
          <GpuInfoCard gpu={gpuInfo} />
          <CurrentJobCard job={currentJob} />
        </div>
        <div className="content-right">
          <RecentJobsTable jobs={recentJobs} />
        </div>
      </div>
    </div>
  );
};