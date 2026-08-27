import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import { getVendorDocuments, uploadDocument, downloadDocument } from "../services/documentService";

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("PAN_CARD");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const vendorId = localStorage.getItem("vendorId");

  const fetchDocuments = useCallback(async () => {
    try {
      const data = await getVendorDocuments(vendorId);
      setDocuments(data);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
    } finally {
      setLoading(false);
    }
  }, [vendorId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage({ type: "error", text: "Please select a file" });
      return;
    }

    setUploading(true);
    setMessage({ type: "", text: "" });

    try {
      await uploadDocument(file, documentType, vendorId);
      setMessage({ type: "success", text: "Document uploaded successfully!" });
      setFile(null);
      document.getElementById("file-input").value = "";
      fetchDocuments();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Failed to upload document"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (id, fileName) => {
    try {
      const blob = await downloadDocument(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download document:", error);
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
            My Documents
          </h1>
          <p style={{ color: "var(--text-secondary)" }}>
            Upload and manage your verification documents
          </p>
        </div>

        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem", fontSize: "1.25rem" }}>
            Upload New Document
          </h3>

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

          <form onSubmit={handleUpload}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem"
            }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Document Type</label>
                <select
                  value={documentType}
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <option value="PAN_CARD">PAN Card</option>
                  <option value="GST_CERTIFICATE">GST Certificate</option>
                  <option value="COMPANY_REGISTRATION">Company Registration</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label>Select File</label>
                <input
                  id="file-input"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ padding: "0.75rem" }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading || !file}
            >
              {uploading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ fontSize: "1.25rem" }}>
            Uploaded Documents
          </h3>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <p style={{ color: "var(--text-secondary)" }}>Loading documents...</p>
          </div>
        ) : documents.length === 0 ? (
          <div className="empty-state">
            <div className="icon">📁</div>
            <h3>No documents uploaded</h3>
            <p>Upload your first document to get started</p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
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
                      {getDocumentTypeLabel(doc.documentType)}
                    </td>
                    <td>{doc.fileName}</td>
                    <td>
                      <span className={getStatusBadgeClass(doc.status)}>
                        {doc.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDownload(doc.id, doc.fileName)}
                        className="btn btn-outline btn-sm"
                      >
                        Download
                      </button>
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

export default Documents;
