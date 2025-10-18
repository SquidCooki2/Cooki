// src/types.ts

export interface UserProfile {
  name: string;
  credits: number;
}

export interface DashboardStats {
  totalEarned: number;
  jobsCompleted: number;
  availableGpus: number;
  totalGpus: number;
}

export interface GpuInfo {
  id: string;
  name: string;
  status: 'Online' | 'Offline' | 'Busy';
  utilization: number; // Percentage
  memoryUsed: number; // in GB
  memoryTotal: number; // in GB
  temp: number; // in Celsius
}

export interface Job {
  id: string;
  name: string;
  status: 'Running' | 'Completed' | 'Failed' | 'Queued';
  progress?: number; // Percentage, optional
  startedAt: string; // ISO 8601 date string
  duration?: string; // e.g., "2h 15m"
  cost?: number; // e.g., 0.45
}

// This will be the shape of the combined data from all backend calls
export interface DashboardData {
  profile: UserProfile;
  stats: DashboardStats;
  gpuInfo: GpuInfo;
  currentJob: Job | null; // A job might not always be running
  recentJobs: Job[];
}