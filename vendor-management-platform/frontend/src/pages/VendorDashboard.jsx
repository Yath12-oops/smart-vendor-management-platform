import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVendorProfile } from "../services/profileService";
import Navbar from "../components/Navbar";

function VendorDashboard() {
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getVendorProfile(userId);
        setVendor(data);
        localStorage.setItem("vendorId", data.id);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

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
            Welcome back!
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Manage your profile and documents from here
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading your profile...</p>
          </div>
        ) : (
          <>
            {vendor && (
              <div className="card" style={{ marginBottom: "2rem" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem"
                }}>
                  <div>
                    <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
                      {vendor.companyName || "Company Name Not Set"}
                    </h3>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Status:{" "}
                      <span className={`badge badge-${vendor.status?.toLowerCase()}`}>
                        {vendor.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "1.5rem"
            }}>
              <div
                className="card"
                style={{
                  cursor: "pointer",
                  transition: "var(--transition)",
                  textAlign: "center",
                  padding: "3rem"
                }}
                onClick={() => navigate("/profile")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>👤</div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>My Profile</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Update your company information and details
                </p>
              </div>

              <div
                className="card"
                style={{
                  cursor: "pointer",
                  transition: "var(--transition)",
                  textAlign: "center",
                  padding: "3rem"
                }}
                onClick={() => navigate("/documents")}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                }}
              >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📄</div>
                <h3 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>My Documents</h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  Upload and manage your verification documents
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default VendorDashboard;
