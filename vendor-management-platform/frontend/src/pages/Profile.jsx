import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { getVendorProfile, updateVendorProfile } from "../services/profileService";

function Profile() {
  const [vendor, setVendor] = useState({
    id: "",
    companyName: "",
    gstNumber: "",
    panNumber: "",
    status: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const userId = localStorage.getItem("userId");

  const fetchProfile = useCallback(async () => {
    try {
      const data = await getVendorProfile(userId);
      setVendor(data);
      localStorage.setItem("vendorId", data.id);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      await updateVendorProfile(vendor.id, {
        companyName: vendor.companyName,
        gstNumber: vendor.gstNumber,
        panNumber: vendor.panNumber
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to update profile"
      });
    } finally {
      setSaving(false);
    }
  };

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
            My Profile
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Update your company information
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading profile...</p>
          </div>
        ) : (
          <div className="card" style={{ maxWidth: "600px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              borderBottom: "1px solid var(--border)"
            }}>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.5rem"
              }}>
                👤
              </div>
              <div>
                <h3 style={{ fontSize: "1.25rem" }}>
                  {vendor.companyName || "Company Name Not Set"}
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  Status:{" "}
                  <span className={`badge badge-${vendor.status?.toLowerCase()}`}>
                    {vendor.status}
                  </span>
                </p>
              </div>
            </div>

            {message.text && (
              <div style={{
                padding: "1rem",
                backgroundColor: message.type === "success"
                  ? "rgba(16, 185, 129, 0.1)"
                  : "rgba(239, 68, 68, 0.1)",
                border: `1px solid ${message.type === "success" ? "var(--secondary)" : "var(--danger)"}`,
                borderRadius: "var(--radius-sm)",
                color: message.type === "success" ? "var(--secondary)" : "var(--danger)",
                marginBottom: "1.5rem"
              }}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  value={vendor.companyName}
                  onChange={(e) => setVendor({ ...vendor, companyName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>GST Number</label>
                <input
                  type="text"
                  placeholder="Enter GST number"
                  value={vendor.gstNumber}
                  onChange={(e) => setVendor({ ...vendor, gstNumber: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>PAN Number</label>
                <input
                  type="text"
                  placeholder="Enter PAN number"
                  value={vendor.panNumber}
                  onChange={(e) => setVendor({ ...vendor, panNumber: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                style={{ marginTop: "1rem" }}
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
