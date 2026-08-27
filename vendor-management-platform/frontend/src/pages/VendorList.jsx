import { useEffect, useState, useCallback } from "react";
import { getAllVendors } from "../services/vendorService";
import { approveVendor, rejectVendor } from "../services/adminService";
import Navbar from "../components/Navbar";

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchVendors = useCallback(async () => {
    try {
      const data = await getAllVendors();
      setVendors(data);
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  const handleApprove = async (id) => {
    try {
      await approveVendor(id);
      await fetchVendors();
    } catch (error) {
      console.error("Failed to approve vendor:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectVendor(id);
      await fetchVendors();
    } catch (error) {
      console.error("Failed to reject vendor:", error);
    }
  };

  const filteredVendors = vendors.filter((vendor) =>
    vendor.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.gstNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.panNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "badge badge-approved";
      case "PENDING":
        return "badge badge-pending";
      case "REJECTED":
        return "badge badge-rejected";
      default:
        return "badge";
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
            Vendor Management
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Review and manage vendor applications
          </p>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search by company name, GST, or PAN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading vendors...</p>
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📋</div>
            <h3>No vendors found</h3>
            <p>{searchTerm ? "Try a different search term" : "No vendors have registered yet"}</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>GST Number</th>
                  <th>PAN Number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id}>
                    <td style={{ fontWeight: "500" }}>
                      {vendor.companyName || "Not provided"}
                    </td>
                    <td>
                      <code style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "var(--bg-input)",
                        borderRadius: "4px",
                        fontSize: "0.9rem"
                      }}>
                        {vendor.gstNumber || "Not provided"}
                      </code>
                    </td>
                    <td>
                      <code style={{
                        padding: "0.25rem 0.5rem",
                        backgroundColor: "var(--bg-input)",
                        borderRadius: "4px",
                        fontSize: "0.9rem"
                      }}>
                        {vendor.panNumber || "Not provided"}
                      </code>
                    </td>
                    <td>
                      <span className={getStatusBadgeClass(vendor.status)}>
                        {vendor.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {vendor.status !== "APPROVED" && (
                          <button
                            onClick={() => handleApprove(vendor.id)}
                            className="btn btn-secondary btn-sm"
                          >
                            Approve
                          </button>
                        )}
                        {vendor.status !== "REJECTED" && (
                          <button
                            onClick={() => handleReject(vendor.id)}
                            className="btn btn-danger btn-sm"
                          >
                            Reject
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default VendorList;
