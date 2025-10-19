// src/api.ts
import axios from "axios";
import type { DashboardData, Job, GpuInfo, DashboardStats, UserProfile, WalletData } from "./types";

// base URL from .env (Vite)
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Helper: map backend status → frontend status labels
function mapJobStatus(s: string | null | undefined): Job["status"] {
  switch (s) {
    case "RUNNING":
      return "Running";
    case "QUEUED":
      return "Queued";
    case "SUCCEEDED":
      return "Completed";
    case "FAILED":
      return "Failed";
    default:
      return "Queued";
  }
}

/**
 * Fetch and map the provider dashboard data for a given provider.
 * @param providerId numeric provider id (e.g., 1)
 */
export const fetchDashboardData = async (providerId: number = 1): Promise<DashboardData> => {
  const url = `${API_BASE}/api/providers/${providerId}/dashboard/`;
  console.log("fetchDashboardData →", { API_BASE, providerId, url });

  try {
    const { data: d } = await axios.get(url);

    // ---- Map backend → frontend types ----
    const profile: UserProfile = {
      name: d.provider?.name ?? `Provider #${d.provider?.id ?? providerId}`,
      credits: Number(d.provider?.total_earned ?? 0),
    };

    const stats: DashboardStats = {
      totalEarned: Number(d.provider?.total_earned ?? 0),
      jobsCompleted: Number(d.provider?.jobs_completed ?? 0),
      availableGpus: d.current_job ? 0 : 1,
      totalGpus: 1,
    };

    const gpuInfo: GpuInfo = {
      id: String(d.provider?.id ?? providerId),
      name: d.provider?.gpu_name ?? "Unknown GPU",
      status: "Online",
      utilization: Math.round(Number(d.provider?.gpu_usage ?? 0)),
      memoryUsed: 0,
      memoryTotal: Number(d.provider?.vram_gb ?? 0),
      temp: Math.round(Number(d.provider?.temperature_c ?? 0)),
    };

    const currentJob: Job | null = d.current_job
      ? {
          id: String(d.current_job.job_code ?? "job"),
          name: d.current_job.task_type ?? "Job",
          status: "Running",
          progress: Math.round(Number(d.current_job.progress_percent ?? 0)),
          startedAt: new Date().toISOString(),
        }
      : null;

    const recentJobs: Job[] = Array.isArray(d.recent_jobs)
      ? d.recent_jobs.map((j: any) => ({
          id: String(j.job_code ?? "job"),
          name: j.task_type ?? "Job",
          status: mapJobStatus(j.status),
          startedAt: new Date().toISOString(),
          duration: j.duration ?? undefined,
          cost: j.earnings_usd != null ? Number(j.earnings_usd) : undefined,
        }))
      : [];

    const wallet: WalletData = {
      availableBalance: 0,
      thisMonthSpending: 0,
      invoices: [],
      paymentMethods: []
    }  

    const dashboard: DashboardData = {
      profile,
      stats,
      wallet,
      gpuInfo,
      currentJob,
      recentJobs,
    };

    console.log("Dashboard data fetched successfully:", dashboard);
    return dashboard;
  } catch (err: any) {
    if (err.response) {
      console.error(
        "Dashboard fetch failed:",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("Dashboard fetch failed:", err.message || err);
    }
    throw new Error("Failed to fetch dashboard data. Please try again later.");
  }
};