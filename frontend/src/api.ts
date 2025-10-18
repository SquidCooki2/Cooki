// src/api.ts
import type { DashboardData, Job, GpuInfo, DashboardStats, UserProfile } from './types';

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- MOCK DATA ---
const mockProfile: UserProfile = {
  name: 'John Doe',
  credits: 125.50,
};

const mockStats: DashboardStats = {
  totalEarned: 245.67,
  jobsCompleted: 14,
  availableGpus: 8,
  totalGpus: 10,
};

const mockGpu: GpuInfo = {
  id: 'gpu-001',
  name: 'NVIDIA GeForce RTX 4090',
  status: 'Online',
  utilization: 45,
  memoryUsed: 8.2,
  memoryTotal: 24.0,
  temp: 68,
};

const mockCurrentJob: Job = {
  id: 'job-123',
  name: 'Large Model Training',
  status: 'Running',
  progress: 72,
  startedAt: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2 hours ago
};

const mockRecentJobs: Job[] = [
  {
    id: 'job-122',
    name: 'Data Preprocessing',
    status: 'Completed',
    startedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    duration: '1h 30m',
    cost: 0.25,
  },
  {
    id: 'job-121',
    name: 'Image Generation Batch',
    status: 'Completed',
    startedAt: new Date(Date.now() - 3600 * 1000 * 8).toISOString(),
    duration: '2h 15m',
    cost: 0.45,
  },
  {
    id: 'job-120',
    name: 'API Endpoint Test',
    status: 'Failed',
    startedAt: new Date(Date.now() - 3600 * 1000 * 9).toISOString(),
    duration: '0h 5m',
    cost: 0.02,
  },
];
// --- END MOCK DATA ---

/**
 * Fetches all dashboard data from the backend.
 * In a real app, this might be multiple separate API calls.
 * You would replace this with actual fetch/axios calls to your backend,
 * which queries your PostgreSQL database.
 */
export const fetchDashboardData = async (): Promise<DashboardData> => {
  console.log('Fetching data from backend...');
  // Simulate API call delay
  await delay(1000);

  // In a real app:
  // const profile = await axios.get('/api/profile');
  // const stats = await axios.get('/api/stats');
  // const gpu = await axios.get('/api/gpu/my-gpu');
  // ... etc.
  // const data = await Promise.all([profile, stats, gpu, ...]);
  // return { ... }

  // For now, we return the combined mock data
  const data: DashboardData = {
    profile: mockProfile,
    stats: mockStats,
    gpuInfo: mockGpu,
    currentJob: mockCurrentJob,
    recentJobs: mockRecentJobs,
  };

  console.log('Data fetched!', data);
  return data;
};

// Once backend is setup get this figured out
// src/api.ts (Example of real API calls)
// import axios from 'axios';
// import { DashboardData, Job, GpuInfo, DashboardStats, UserProfile } from './types';

// const API_BASE_URL = 'https://your-backend-api.com/api/v1';

// export const fetchDashboardData = async (): Promise<DashboardData> => {
//   try {
//     // These endpoints would query your PostgreSQL database
//     const profilePromise = axios.get<UserProfile>(`${API_BASE_URL}/users/me`);
//     const statsPromise = axios.get<DashboardStats>(`${API_BASE_URL}/dashboard/stats`);
//     const gpuPromise = axios.get<GpuInfo>(`${API_BASE_URL}/gpu/my-gpu`);
//     const currentJobPromise = axios.get<Job | null>(`${API_BASE_URL}/jobs/current`);
//     const recentJobsPromise = axios.get<Job[]>(`${API_BASE_URL}/jobs/recent`);

//     // Wait for all requests to finish
//     const [
//       profileResponse,
//       statsResponse,
//       gpuResponse,
//       currentJobResponse,
//       recentJobsResponse,
//     ] = await Promise.all([
//       profilePromise,
//       statsPromise,
//       gpuPromise,
//       currentJobPromise,
//       recentJobsPromise,
//     ]);

//     // Combine all data into one object
//     return {
//       profile: profileResponse.data,
//       stats: statsResponse.data,
//       gpuInfo: gpuResponse.data,
//       currentJob: currentJobResponse.data,
//       recentJobs: recentJobsResponse.data,
//     };
//   } catch (error) {
//     console.error('Error fetching dashboard data:', error);
//     // Re-throw the error to be caught by the component
//     throw new Error('Failed to fetch data from backend.');
//   }
// };