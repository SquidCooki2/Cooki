import axios from "axios";
import type {
  DashboardData,
  Job,
  GpuInfo,
  DashboardStats,
  UserProfile,
  WalletData,
  Invoice,
  PaymentMethod,
} from "./types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function mapJobStatus(s: string | null | undefined): Job["status"] {
  switch (s) {
    case "RUNNING": return "Running";
    case "QUEUED": return "Queued";
    case "SUCCEEDED": return "Completed";
    case "FAILED": return "Failed";
    default: return "Queued";
  }
}

/** Fetch ONLY wallet */
export const fetchWalletData = async (providerId: number): Promise<WalletData> => {
  const url = `${API_BASE}/api/providers/${providerId}/wallet/`;
  const { data: w } = await axios.get(url);

  // Backend shape:
  // {
  //   availableBalance: number | string,
  //   thisMonthSpending: number | string,
  //   invoices: [{ month, amount }...],
  //   paymentMethods: [{ id, type: 'Visa'|'Mastercard', lastFour, expiry: 'MM/YY', isDefault }]
  // }

  const invoices: Invoice[] = Array.isArray(w.invoices)
    ? w.invoices.map((inv: any) => ({
        month: String(inv.month),
        amount: Number(inv.amount ?? 0),
      }))
    : [];

  const paymentMethods: PaymentMethod[] = Array.isArray(w.paymentMethods)
    ? w.paymentMethods.map((pm: any) => ({
        id: String(pm.id),
        type: pm.type === "Visa" || pm.type === "Mastercard" ? pm.type : "Visa",
        lastFour: String(pm.lastFour ?? pm.last_four ?? ""),
        expiry: String(pm.expiry ?? ""),
        isDefault: Boolean(pm.isDefault ?? pm.is_default ?? false),
      }))
    : [];

  return {
    availableBalance: Number(w.availableBalance ?? 0),
    thisMonthSpending: Number(w.thisMonthSpending ?? 0),
    invoices,
    paymentMethods,
  };
};

/** Fetch dashboard + wallet together and map to your UI types */
export const fetchDashboardData = async (providerId: number = 1): Promise<DashboardData> => {
  const dashUrl = `${API_BASE}/api/providers/${providerId}/dashboard/`;
  const walletUrl = `${API_BASE}/api/providers/${providerId}/wallet/`;
  console.log("fetchDashboardData →", { API_BASE, providerId, dashUrl, walletUrl });

  try {
    // Fetch both in parallel
    const [{ data: d }, wallet] = await Promise.all([
      axios.get(dashUrl),
      fetchWalletData(providerId),
    ]);

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
      uptime: d.provider?.uptime_percent,
      rating: d.provider?.rating
    };

    const currentJob: Job | null = d.current_job
      ? {
          id: String(d.current_job.job_code ?? "job"),
          name: d.current_job.task_type ?? "Job",
          status: "Running",
          progress: Math.round(Number(d.current_job.progress_percent ?? 0)),
          startedAt: new Date().toISOString(),
          time_elapsed: d.current_job.time_elapsed,
          earnings: d.current_job.earnings_usd
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

    const dashboard: DashboardData = {
      profile,
      stats,
      wallet,      // <-- now real data
      gpuInfo,
      currentJob,
      recentJobs,
    };

    console.log("Dashboard data fetched successfully:", dashboard);
    return dashboard;
  } catch (err: any) {
    if (err.response) {
      console.error("Dashboard fetch failed:", err.response.status, err.response.data);
    } else {
      console.error("Dashboard fetch failed:", err.message || err);
    }
    throw new Error("Failed to fetch dashboard data. Please try again later.");
  }
};
