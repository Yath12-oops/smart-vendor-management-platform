import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { getAllDocuments, verifyDocument, rejectDocument } from "../services/adminService";

function AdminDocuments() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDocuments = useCallback(async () => {
    try {
      const data = await getAllDocuments();
      setDocuments(data);
    } catch (error) {
      console.error("Failed to load documents:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleVerify = async (id) => {
    try {
      await verifyDocument(id);
      loadDocuments();
    } catch (error) {
      console.error("Failed to verify document:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectDocument(id);
      loadDocuments();
    } catch (error) {
      console.error("Failed to reject document:", error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "VERIFIED":
        return "badge badge-verified";
      case "PENDING":
        return "badge badge-pending";
      case "REJECTED":
        return "badge badge-rejected";
      default:
        return "badge";
    }
  };

  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case "PAN_CARD":
        return "PAN Card";
      case "GST_CERTIFICATE":
        return "GST Certificate";
      case "COMPANY_REGISTRATION":
        return "Company Registration";
      default:
        return type;
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
            Document Management
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Review and verify vendor documents
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📁</div>
            <h3>No documents submitted</h3>
            <p>Documents will appear here when vendors upload them</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Document Type</th>
                  <th>File Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id}>
                    <td style={{ fontWeight: "500" }}>
                      {doc.vendorName || "Unknown Vendor"}
                    </td>
                    <td>{getDocumentTypeLabel(doc.documentType)}</td>
                    <td>{doc.fileName}</td>
                    <td>
                      <span className={getStatusBadgeClass(doc.status)}>
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {doc.status !== "VERIFIED" && (
                          <button
                            onClick={() => handleVerify(doc.id)}
                            className="btn btn-secondary btn-sm"
                          >
                            Verify
                          </button>
                        )}
                        {doc.status !== "REJECTED" && (
                          <button
                            onClick={() => handleReject(doc.id)}
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

export default AdminDocuments;
