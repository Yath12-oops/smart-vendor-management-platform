import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("vendorId");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      backgroundColor: "var(--bg-card)",
      borderBottom: "1px solid var(--border)",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to={role === "ADMIN" ? "/dashboard" : "/vendor-dashboard"} style={{
        fontSize: "1.25rem",
        fontWeight: "700",
        textDecoration: "none",
        background: "linear-gradient(135deg, var(--primary), var(--secondary))",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      }}>
        VendorHub
      </Link>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "1.5rem"
      }}>
        {role === "ADMIN" && (
          <>
            <NavLink to="/dashboard" active={isActive("/dashboard")}>
              Dashboard
            </NavLink>
            <NavLink to="/vendors" active={isActive("/vendors")}>
              Vendors
            </NavLink>
            <NavLink to="/admin-documents" active={isActive("/admin-documents")}>
              Documents
            </NavLink>
          </>
        )}

        {role === "VENDOR" && (
          <>
            <NavLink to="/vendor-dashboard" active={isActive("/vendor-dashboard")}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" active={isActive("/profile")}>
              Profile
            </NavLink>
            <NavLink to="/documents" active={isActive("/documents")}>
              Documents
            </NavLink>
          </>
        )}

        <button
          onClick={handleLogout}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            borderRadius: "var(--radius-sm)",
            fontWeight: "500",
            fontSize: "0.9rem"
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      style={{
        color: active ? "var(--primary)" : "var(--text-secondary)",
        textDecoration: "none",
        fontWeight: active ? "600" : "500",
        fontSize: "0.95rem",
        transition: "var(--transition)",
        padding: "0.5rem 0",
        borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent"
      }}
    >
      {children}
    </Link>
  );
}

export default Navbar;
