import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/adminService";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [stats, setStats] = useState({
    totalVendors: 0,
    approvedVendors: 0,
    pendingVendors: 0,
    rejectedVendors: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "700",
            marginBottom: "0.5rem"
          }}>
            Dashboard
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Overview of your vendor management system
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem"
            }}>
              <div className="stat-card blue">
                <div className="stat-icon">📊</div>
                <div className="stat-value">{stats.totalVendors || 0}</div>
                <div className="stat-label">Total Vendors</div>
              </div>

              <div className="stat-card green">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats.approvedVendors || 0}</div>
                <div className="stat-label">Approved</div>
              </div>

              <div className="stat-card orange">
                <div className="stat-icon">⏳</div>
                <div className="stat-value">{stats.pendingVendors || 0}</div>
                <div className="stat-label">Pending</div>
              </div>

              <div className="stat-card red">
                <div className="stat-icon">❌</div>
                <div className="stat-value">{stats.rejectedVendors || 0}</div>
                <div className="stat-label">Rejected</div>
              </div>
            </div>

            <div className="card" style={{ marginTop: "2rem" }}>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
                Quick Actions
              </h3>
              <div style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap"
              }}>
                <a href="/vendors" className="btn btn-primary">
                  View All Vendors
                </a>
                <a href="/admin-documents" className="btn btn-outline">
                  Review Documents
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
