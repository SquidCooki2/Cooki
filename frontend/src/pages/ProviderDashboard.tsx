import React, { useEffect, useState } from "react";
import { fetchDashboardData } from "../api"; // adjust path if different
import type { DashboardData, Job } from "../types";

const money = (n: number | undefined | null) =>
  `$${(Number(n ?? 0)).toFixed(2)}`;

const ProviderDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const d = await fetchDashboardData(1); // providerId = 1 (or pass actual)
        if (mounted) setData(d);
      } catch (e: any) {
        setErr(e?.message || "Failed to fetch dashboard");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ marginLeft: 270, padding: "2.5rem" }}>
        <div style={{ color: "#666" }}>Loading dashboard…</div>
      </div>
    );
  }

  if (err || !data) {
    return (
      <div style={{ marginLeft: 270, padding: "2.5rem" }}>
        <div style={{ color: "#d33" }}>{err || "No data"}</div>
      </div>
    );
  }

  const gpu = data.gpuInfo;
  const stats = data.stats;
  const current = data.currentJob;
  const recent = data.recentJobs ?? [];

  return (
    <div
      style={{
        marginLeft: "270px",
        minHeight: "100vh",
        background: "#fff",
        padding: "2.5rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingRight: "2.5rem",
      }}
    >
      {/* Top Section - Your GPU and Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr',
        gap: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        {/* Left Column - Your GPU */}
        <div>
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '.20rem',
            marginTop: 0
          }}>Your GPU</h2>

          <div
            style={{
              background: "linear-gradient(135deg, #7c5b93 0%, #9370a8 100%)",
              borderRadius: "16px",
              padding: "2.5rem",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(107, 77, 138, 0.3)",
            }}
          >
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                margin: "0 0 0.5rem 0",
              }}
            >
              {gpu?.name ?? "Unknown GPU"}
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                margin: "0 0 0.25rem 0",
                opacity: "0.95",
              }}
            >
              {`${gpu?.memoryTotal ?? 0}GB VRAM`}
            </p>
            <p style={{ fontSize: "1.05rem", margin: 0, opacity: 0.95 }}>
              {/* If you later add base/boost clocks to the API, render them here.
                  For now, hide that line. */}
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginTop: "2rem",
              }}
            >
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    opacity: "0.9",
                  }}
                >
                  Status
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {current ? "Running Job" : "Idle"}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    opacity: "0.9",
                  }}
                >
                  GPU Usage
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {`${gpu?.utilization ?? 0}%`}
                </div>
              </div>

              <div
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.875rem",
                    marginBottom: "0.5rem",
                    opacity: "0.9",
                  }}
                >
                  Temperature
                </div>
                <div style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {`${gpu?.temp ?? 0}°C`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats Cards (Top 4) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          paddingTop: '3.5rem'
        }}>
          {/* Total Earned */}
          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "1.75rem",
              color: "#fff",
            }}
          >
            <div
              style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}
            >
              Total Earned
            </div>
            <div
              style={{
                fontSize: "2.75rem",
                fontWeight: 700,
                marginBottom: "0.25rem",
                lineHeight: 1,
              }}
            >
              {money(stats?.totalEarned)}
            </div>
            <div style={{ color: "#4ade80", fontSize: "0.875rem", fontWeight: 500 }}>
              {/* Optional trend text; remove or compute later */}
            </div>
          </div>

          {/* Jobs Completed */}
          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "1.75rem",
              color: "#fff",
            }}
          >
            <div
              style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}
            >
              Jobs Completed
            </div>
            <div style={{ fontSize: "2.75rem", fontWeight: 700, lineHeight: 1 }}>
              {stats?.jobsCompleted ?? 0}
            </div>
          </div>

          {/* Uptime (optional—only if you add it to API) */}
          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "1.75rem",
              color: "#fff",
            }}
          >
            <div
              style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}
            >
              Uptime
            </div>
            <div style={{ fontSize: "2.75rem", fontWeight: 700, lineHeight: 1 }}>
              {/* If you expose provider.uptime_percent in api.ts, render it here: */}
              {gpu?.uptime != null ? `${gpu.uptime} hours` : "--"}
            </div>
          </div>

          {/* Rating (optional—only if you add it to API) */}
          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "1.75rem",
              color: "#fff",
            }}
          >
            <div
              style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}
            >
              Rating
            </div>
            <div
              style={{
                fontSize: "2.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                lineHeight: 1,
              }}
            >
              {gpu.rating} <span style={{ fontSize: "2rem" }}>⭐</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Current Job and Recent Jobs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1fr',
        gap: '1.5rem'
      }}>
        {/* Left Column - Current Job and Recent Jobs */}
        <div>
          {/* Current Job */}
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '.20rem',
            marginTop: '-17rem'
          }}>Current Job</h2>

          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "2rem",
              marginBottom: "2.5rem",
              color: "#fff",
            }}
          >
            {current ? (
              <>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "2rem",
                    marginBottom: "1.75rem",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>
                      Job ID
                    </div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      {current.id}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>
                      Type
                    </div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      {current.name}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>
                      Time Elapsed
                    </div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 500 }}>
                      {current.time_elapsed}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.7, marginBottom: "0.5rem" }}>
                      Earnings
                    </div>
                    <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#4ade80" }}>
                      {money(current.earnings)}
                    </div>
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>Progress</span>
                    <span style={{ fontSize: "0.875rem", opacity: 0.7 }}>
                      {current.progress ?? 0}%
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "10px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${current.progress ?? 0}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div style={{ opacity: 0.8 }}>No current job.</div>
            )}
          </div>

          {/* Recent Jobs */}
          <h2 style={{
            fontSize: '2.25rem',
            color: '#2d2d3a',
            fontWeight: '700',
            marginBottom: '.20rem',
            marginTop: 0
          }}>Recent Jobs</h2>

          <div
            style={{
              background: "#2d2d3a",
              borderRadius: "16px",
              padding: "2rem",
            }}
          >
            {recent.length === 0 ? (
              <div style={{ color: "#fff", opacity: 0.8 }}>No recent jobs.</div>
            ) : (
              recent.map((job: Job, i: number) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1.5fr 1fr 1fr 140px",
                    alignItems: "center",
                    gap: "1.5rem",
                    padding: "1.5rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "12px",
                    marginBottom: i < recent.length - 1 ? "1rem" : "0",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "linear-gradient(135deg, #6b4d8a, #8b5da8)",
                      borderRadius: "8px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: "0.25rem", fontSize: "1.05rem" }}>
                      {job.name}
                    </div>
                    <div style={{ fontSize: "0.875rem", opacity: 0.6 }}>{job.id}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.25rem" }}>
                      Duration
                    </div>
                    <div style={{ fontSize: "0.95rem" }}>
                      {job.duration ?? "--"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.8rem", opacity: 0.6, marginBottom: "0.25rem" }}>
                      Earned
                    </div>
                    <div style={{ color: "#4ade80", fontWeight: 600, fontSize: "0.95rem" }}>
                      {job.cost != null ? money(job.cost) : "--"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "0.95rem", letterSpacing: 0.5 }}>
                    {job.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column spacer (aligns layout) */}
        <div />
      </div>
    </div>
  );
};

export default ProviderDashboard;
