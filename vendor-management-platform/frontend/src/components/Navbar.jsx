
import { Link } from "react-router-dom";

function Navbar() {
    return (

    <nav
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "15px 30px",
            backgroundColor: "#1e293b",
            color: "white"
        }}
    >

        <h2>Smart Vendor Management</h2>

        <div>

            <Link
                to="/dashboard"
                style={{
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none"
                }}
            >
                Dashboard
            </Link>

            <Link
                to="/vendors"
                style={{
                    color: "white",
                    marginRight: "20px",
                    textDecoration: "none"
                }}
            >
                Vendors
            </Link>

            <button
                onClick={() => {

                    localStorage.removeItem("token");

                    window.location.href = "/";
                }}
                style={{
                    padding: "8px 15px",
                    cursor: "pointer"
                }}
            >
                Logout
            </button>

        </div>

    </nav>
);
}

export default Navbar;